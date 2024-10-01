import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    const { email, consent } = await request.json()
    console.log("Received request:", { email, consent })

    if (!email || !consent) {
      return NextResponse.json(
        { success: false, message: "Email and consent are required." },
        { status: 400 }
      )
    }

    // Call Medusa backend to create subscription request
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
    if (!backendUrl) {
      throw new Error("MEDUSA_BACKEND_URL is not set in environment variables")
    }
    console.log("Calling Medusa backend:", backendUrl)

    const subscriptionResponse = await fetch(
      `${backendUrl}/store/subscription-requests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    )

    if (!subscriptionResponse.ok) {
      const errorText = await subscriptionResponse.text()
      console.error("Medusa backend error:", errorText)
      throw new Error(
        `Failed to store subscription request: ${subscriptionResponse.statusText}`
      )
    }

    const { token } = await subscriptionResponse.json()
    console.log("Received token from Medusa:", token)

    // Send confirmation email
    const resend = new Resend(process.env.RESEND_API_KEY)
    const fromEmail = process.env.SES_FROM
    if (!fromEmail) {
      throw new Error("SES_FROM is not set in environment variables")
    }

    const frontendUrl = process.env.NEXT_PUBLIC_BASE_URL
    if (!frontendUrl) {
      throw new Error(
        "NEXT_PUBLIC_BASE_URL is not set in environment variables"
      )
    }

    console.log("Sending email with Resend")
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Please Confirm Subscription",
      html: `
        <h1>Confirm Your Subscription</h1>
        <p>Click the button below to confirm your subscription to our newsletter:</p>
        <a href="${frontendUrl}/confirm-subscription?token=${token}" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">
          Yes, subscribe me to this list
        </a>
        <p>If you received this email by mistake, simply delete it. You won't be subscribed if you don't click the confirmation link above.</p>
      `,
    })

    console.log("Email sent successfully")
    return NextResponse.json({
      success: true,
      message: "Please check your email to confirm your subscription.",
    })
  } catch (error) {
    console.error("Detailed subscription error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred. Please try again later." },
      { status: 500 }
    )
  }
}
