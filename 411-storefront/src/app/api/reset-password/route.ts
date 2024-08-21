import { NextResponse } from "next/server"
import { medusaClient } from "@lib/config"

export async function POST(request: Request) {
  const body = await request.json()
  const { email } = body

  try {
    await medusaClient.customers.generatePasswordToken({
      email: email,
    })

    // Return a 200 status even if the email doesn't exist (for security reasons)
    return NextResponse.json(
      {
        message:
          "If an account exists with this email, a reset link has been sent.",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error generating password token:", error)
    return NextResponse.json(
      { message: "An error occurred while processing your request." },
      { status: 500 }
    )
  }
}
