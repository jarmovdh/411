"use client"
import React from "react"
import { Button, Prompt } from "@medusajs/ui"

const DeleteAccount = () => {
  const handleDeleteAccount = async () => {
    // Implement the account deletion logic here
    // This could involve calling an API endpoint to delete the user's account
    console.log("Account deletion initiated")
    // After successful deletion, you might want to redirect the user or show a confirmation message
  }

  return (
    <div className="mt-8">
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <h2 className="text-small-regular uppercase mb-4">Delete Account</h2>
          <p className="font-semibold">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
        </div>
        <Prompt>
          <Prompt.Trigger asChild>
            <Button
              variant="secondary"
              className="w-[100px] min-h-[25px] py-1 bg-[var(--theme-background)] 
             border border-red-500 text-red-500
             hover:bg-red-500 hover:text-[var(--theme-background)]"
            >
              Delete
            </Button>
          </Prompt.Trigger>
          <Prompt.Content>
            <Prompt.Header>
              <Prompt.Title>Delete Account</Prompt.Title>
              <Prompt.Description>
                Are you absolutely sure? This action cannot be undone. This will
                permanently delete your account and remove your data from our
                servers.
              </Prompt.Description>
            </Prompt.Header>
            <Prompt.Footer>
              <Prompt.Cancel>Cancel</Prompt.Cancel>
              <Prompt.Action onClick={handleDeleteAccount}>
                Delete Account
              </Prompt.Action>
            </Prompt.Footer>
          </Prompt.Content>
        </Prompt>
      </div>
    </div>
  )
}

export default DeleteAccount
