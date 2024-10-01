"use client"
import React, { useState } from "react"
import Input from "@modules/common/components/input"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import ErrorMessage from "@modules/checkout/components/error-message"
import { subscribeToNewsletter } from "@lib/util/subscribe-newsletter"

const NewsletterForm = () => {
  const [state, setState] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    const result = await subscribeToNewsletter(formData)
    setState(result)
    setIsSubmitting(false)
  }

  return (
    <div className="w-full flex flex-col items-center mt-4">
      <h1 className="text-large-semi uppercase mb-6">
        Subscribe to Our Newsletter
      </h1>
      <p className="text-base-regular mb-8">
        Sign up to the 411 newsletter for updates from 411 every other week:
        expect radio highlights, event announcements, the latest goods and much
        more…
      </p>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email Address"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
          />
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              required
              className="form-checkbox"
            />
            <label htmlFor="consent" className="text-small-regular mt-3">
              I want to receive updates from 411 via email.
            </label>
          </div>
          <p className="text-small-regular mt-2">
            I understand and agree to share my information in accordance with
            411's privacy policy.
          </p>
        </div>
        <ErrorMessage
          error={state?.success === false ? state.message : undefined}
        />
        <SubmitButton
          className="w-full mt-6 bg-[var(--theme-background)] border text-[var(--theme-color)] hover:bg-[var(--theme-color)] hover:text-[var(--theme-background)]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </SubmitButton>
      </form>
      {state?.success && (
        <p className="text-center text-small-regular mt-4 text-green-600">
          {state.message}
        </p>
      )}
    </div>
  )
}

export default NewsletterForm
