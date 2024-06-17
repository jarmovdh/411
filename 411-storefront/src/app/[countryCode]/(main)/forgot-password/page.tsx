"use client"
import Input from "@modules/common/components/input"
import UnderlineLink from "@modules/common/components/interactive-link"
import { SubmitButton } from "@modules/checkout/components/submit-button"

export default function ForgotPassword() {
  return (
    <>
      <div className="content-container max-w-sm w-full flex flex-col items-center h-full">
        <h1 className="text-large-semi uppercase mb-6">Forgot Password</h1>
        <p className="text-center text-base-regular  mb-8">
          Enter the email used for your 411 account and we will send you a link
          to reset your password.{" "}
        </p>
        <form className="w-full">
          <div className="flex flex-col w-full gap-y-2">
            <Input
              label="Email"
              name="email"
              type="email"
              title="Enter your email address."
              autoComplete="email"
              required
            />
          </div>
          <SubmitButton className="w-full mt-6 bg-[var(--theme-background)] border text-[var(--theme-color)]  hover:bg-[var(--theme-color)] hover:text-[var(--theme-background)]">
            Submit
          </SubmitButton>
        </form>
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
