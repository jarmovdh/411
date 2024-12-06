"use client"
import { useState } from "react"
import RequestPasswordForm from "@modules/411/components/request-password-form/RequestPasswordForm"

export default function ForgotPassword() {
  const [message, setMessage] = useState("")

  const handleSuccess = (msg: string) => {
    setMessage(msg)
  }

  const handleError = (msg: string) => {
    setMessage(msg)
  }

  return (
    <>
      <div className="content-container max-w-sm w-full flex flex-col items-center  pt-20">
        <h1 className="text-large-semi uppercase mb-6 pt-30">
          Forgot Password
        </h1>
        <p className="text-center text-base-regular mb-8">
          Enter the email used for your account and we will send you a link to
          reset your password.
        </p>
        <RequestPasswordForm onSuccess={handleSuccess} onError={handleError} />
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
      </div>
    </>
  )
}
