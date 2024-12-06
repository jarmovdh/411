"use client"

import ResetPasswordForm from "@modules/411/components/reset-password-form/ResetPasswordForm"
import { useRouter, useSearchParams } from "next/navigation"
import { SetStateAction, useEffect, useState } from "react"

export default function ResetPassword() {
  const [message, setMessage] = useState("")
  const [token, setToken] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token")
    if (tokenFromUrl) {
      setToken(tokenFromUrl)
    } else {
      setMessage(
        "No reset token found. Please request a new password reset link."
      )
    }
  }, [searchParams])

  const handleSuccess = (msg: SetStateAction<string>) => {
    setMessage(msg)
    // Redirect to login page after successful reset
    setTimeout(() => router.push("/account"), 3000)
  }

  const handleError = (msg: SetStateAction<string>) => {
    setMessage(msg)
  }

  return (
    <>
      <div className="content-container max-w-sm w-full flex flex-col items-center pt-20">
        <h1 className="text-large-semi uppercase mb-6 pt-30">Reset Password</h1>
        <p className="text-center text-base-regular mb-8">
          Enter your new password below to reset your account password.
        </p>
        {token ? (
          <ResetPasswordForm
            token={token}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        ) : (
          <p className="text-center text-red-500 mb-4">
            No reset token found. Please request a new password reset link.
          </p>
        )}
        {message && (
          <p className="text-center text-red-500 mb-4 mt-4">{message}</p>
        )}
      </div>
    </>
  )
}
