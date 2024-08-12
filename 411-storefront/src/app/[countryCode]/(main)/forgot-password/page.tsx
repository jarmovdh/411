"use client"
import { useState } from "react"
import UnderlineLink from "@modules/common/components/interactive-link"
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
      <div className="content-container max-w-sm w-full flex flex-col items-center h-full">
        <h1 className="text-large-semi uppercase mb-6">Forgot Password</h1>
        <p className="text-center text-base-regular mb-8">
          Enter the email used for your account and we will send you a link to
          reset your password.
        </p>
        <RequestPasswordForm onSuccess={handleSuccess} onError={handleError} />
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
      </div>
      <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-gray-200 py-12 gap-8">
        <div>
          <h3 className="text-xl-semi mb-4">Got questions?</h3>
          <span className="txt-medium">
            You can find frequently asked questions and answers on our customer
            service page.
          </span>
        </div>
        <div>
          <UnderlineLink href="/customer-service">
            Customer Service
          </UnderlineLink>
        </div>
      </div>
    </>
  )
}
