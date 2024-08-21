import Medusa from "@medusajs/medusa-js"

const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL!,
  maxRetries: 3,
})

export async function generatePasswordToken(email: string) {
  console.log("Attempting to generate password reset token for email:", email)

  try {
    const response = await medusa.customers.generatePasswordToken({ email })

    if (response.status === 204 && response.data?.token) {
      console.log("Password reset token generated successfully for:", email)
      return response.data.token // Return the token
    } else {
      console.error(
        "Unexpected response or missing token while generating token:",
        response.status
      )
      return null
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error generating password reset token:", error.message)
    } else {
      console.error("Unexpected error:", error)
    }
    throw error // Re-throw to be caught by the outer catch block
  }
}
