import crypto from "crypto"

export function generateUniqueToken(): string {
  // Generate 32 random bytes
  const randomBytes = crypto.randomBytes(32)

  // Convert the random bytes to a hexadecimal string
  const token = randomBytes.toString("hex")

  return token
}
