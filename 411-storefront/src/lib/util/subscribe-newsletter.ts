"use client"

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string
  const consent = formData.get("consent") as string

  if (!email || !consent) {
    return { success: false, message: "Email and consent are required." }
  }

  try {
    const response = await fetch("/api/subscribe-newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, consent }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error response:", errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Subscription error:", error)
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    }
  }
}
