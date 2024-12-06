import InteractiveLink from "@modules/common/components/interactive-link"
import { Resend } from "resend"

async function getSubscriptionByToken(token: string) {
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
  if (!backendUrl) {
    throw new Error("MEDUSA_BACKEND_URL is not set")
  }

  const response = await fetch(
    `${backendUrl}/store/subscription-requests/confirm`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    }
  )

  if (!response.ok) {
    throw new Error("Failed to confirm subscription")
  }

  return response.json()
}

async function addToAudience(email: string) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (!audienceId) {
    throw new Error("RESEND_AUDIENCE_ID is not set")
  }

  await resend.contacts.create({
    email,
    unsubscribed: false,
    audienceId,
  })
}

export default async function ConfirmSubscription({
  searchParams,
}: {
  searchParams: { token: string }
}) {
  const { token } = searchParams
  let isSuccess = false
  let message = ""

  try {
    const { email } = await getSubscriptionByToken(token)
    await addToAudience(email)
    isSuccess = true
    message =
      "Your subscription to our list has been confirmed. Thank you for subscribing! Look out for news and updates."
  } catch (error) {
    console.error("Error confirming subscription:", error)
    message =
      "Something went wrong while confirming your subscription. Please try again or contact support."
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md w-full rounded-lg p-8 items-center">
        <h1
          className={`text-xl font-bold mb-4 ${isSuccess ? "text-green-600" : "text-red-600"}`}
        >
          {isSuccess ? "Subscription Confirmed" : "Subscription Error"}
        </h1>
        <p className="text-base-small mb-8">{message}</p>
        <InteractiveLink href="/">Go to frontpage</InteractiveLink>
      </div>
    </div>
  )
}
