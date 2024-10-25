"use client"
import React, { useState } from "react"
import { Alert, Button, Prompt } from "@medusajs/ui"
import { useRouter } from "next/navigation"
import { signOut } from "@modules/account/actions"
import { Customer } from "@medusajs/medusa"

const DeleteAccount = ({
  customer,
}: {
  customer: Omit<Customer, "password_hash"> | null
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const router = useRouter()

  const handleDeleteAccount = async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (!customer?.id) {
        throw new Error("No customer ID found")
      }

      const response = await fetch(`/api/store/customers/${customer.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete account")
      }

      const data = await response.json()

      // Show appropriate success message
      if (data.type === "anonymized") {
        setSuccess("Your account has been succesfully deactivated.")
      } else {
        setSuccess("Your account has been permanently deleted.")
      }

      // Logout the user
      await signOut()

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while deleting your account"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-8">
      {error && (
        <Alert variant="error" className="mb-4 bg-[var(--theme-background)]">
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success" className="mb-4 bg-[var(--theme-background)]">
          {success}
        </Alert>
      )}

      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <h2 className="text-small-regular uppercase mb-4">Delete Account</h2>
          <p className="font-semibold">
            Once you delete your account, there is no going back. Your data will
            be Completely deleted.
          </p>
        </div>
        <Prompt>
          <Prompt.Trigger asChild>
            <Button
              variant="secondary"
              className="w-[100px] min-h-[25px] py-1 bg-[var(--theme-background)] 
                border border-red-500 text-red-500
                hover:bg-red-500 hover:text-[var(--theme-background)]"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Delete"}
            </Button>
          </Prompt.Trigger>
          <Prompt.Content>
            <Prompt.Header>
              <Prompt.Title>Delete Account</Prompt.Title>
              <Prompt.Description>
                Are you absolutely sure? This action cannot be undone. This will
                either delete or anonymize your account depending on your order
                history.
              </Prompt.Description>
            </Prompt.Header>
            <Prompt.Footer>
              <Prompt.Cancel>Cancel</Prompt.Cancel>
              <Prompt.Action
                onClick={handleDeleteAccount}
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600"
              >
                {isLoading ? "Processing..." : "Delete Account"}
              </Prompt.Action>
            </Prompt.Footer>
          </Prompt.Content>
        </Prompt>
      </div>
    </div>
  )
}

export default DeleteAccount
