import Medusa from "@medusajs/medusa-js"

const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL!,
  maxRetries: 3,
})

export async function generatePasswordToken(email: string) {
  try {
    const { token } = await medusa.customers.generatePasswordToken({ email })
    if (!token) {
      throw new Error("Failed to generate a token.")
    }
    return token
  } catch (error) {
    console.error("Error generating token:", error)
    throw error
  }
}
