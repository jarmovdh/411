import { generatePasswordToken } from "@lib/util/generate-passwordtoken"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
      })
    }

    // const token = await generatePasswordToken(email)

    // const resetPasswordLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}&email=${encodeURIComponent(email)}`

    await resend.emails.send({
      from: "info@411.radio",
      to: [email],
      subject: "Reset Your Password",
      text: `Click the following link to reset your password:`,
    })

    return new Response(
      JSON.stringify({ message: "Password reset email sent" }),
      { status: 200 }
    )
  } catch (error) {
    console.error("Error in password reset process:", error)
    return new Response(
      JSON.stringify({ error: "Failed to process password reset" }),
      { status: 500 }
    )
  }
}
