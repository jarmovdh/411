"use client"

import { useState } from "react"
import Medusa from "@medusajs/medusa-js"
import Input from "@modules/common/components/input"
import { Button } from "@medusajs/ui"

interface ResetPasswordFormProps {
  token: string
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  token,
  onSuccess,
  onError,
}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const medusa = new Medusa({
    baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "",
    maxRetries: 3,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      onError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const { customer } = await medusa.customers.resetPassword({
        email,
        password,
        token,
      })
      console.log("Password reset for customer:", customer.id)
      onSuccess("Password reset successfully")
    } catch (error) {
      console.error("Password reset error:", error)
      onError(
        error instanceof Error
          ? error.message
          : "An error occurred while resetting the password"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col">
      <div className="flex flex-col w-full gap-y-2">
        <Input
          label="Email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="New Password"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button
        className="btn-primary mt-6 w-full"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  )
}

export default ResetPasswordForm
