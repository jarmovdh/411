"use client"
import { useState } from "react"
import Input from "@modules/common/components/input"
import { SubmitButton } from "@modules/checkout/components/submit-button"

const sendResetPasswordEmail = async (email: string) => {
  const response = await fetch("/api/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    throw new Error("Failed to send reset password email")
  }

  return await response.json()
}

interface PasswordResetFormProps {
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

const RequestPasswordForm = ({
  onSuccess,
  onError,
}: PasswordResetFormProps) => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsLoading(true)
    console.log("Submitted email:", email)

    try {
      await sendResetPasswordEmail(email)
      onSuccess(
        "If an account exists with this email, a reset link has been sent."
      )
    } catch (error) {
      console.error("Error:", error)
      onError(
        "If an account exists with this email, a reset link has been sent."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col w-full gap-y-2">
        <Input
          label="Email"
          name="email"
          type="email"
          title="Enter your email address."
          autoComplete="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <SubmitButton
        className="w-full mt-6 bg-[var(--theme-background)] border text-[var(--theme-color)] hover:bg-[var(--theme-color)] hover:text-[var(--theme-background)]"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Submit"}
      </SubmitButton>
    </form>
  )
}

export default RequestPasswordForm