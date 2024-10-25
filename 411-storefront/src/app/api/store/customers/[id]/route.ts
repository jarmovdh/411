// src/app/api/store/customers/[id]/route.ts
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const cookieStore = cookies()

  try {
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL

    if (!backendUrl) {
      throw new Error("Backend URL not configured")
    }

    // Get the session cookie
    const sessionCookie = cookieStore.get("connect.sid")

    if (!sessionCookie) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      )
    }

    // Forward the request to Medusa backend
    const response = await fetch(`${backendUrl}/store/customers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Forward the session cookie
        Cookie: `connect.sid=${sessionCookie.value}`,
      },
      credentials: "include",
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("Delete customer error response:", errorData)

      return NextResponse.json(
        { message: errorData.message || "Error deleting customer" },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Delete customer error:", error)
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      { message: "Internal server error", error: errorMessage },
      { status: 500 }
    )
  }
}
