"use client"

import { Button } from "@medusajs/ui"
import React from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
  children,
  variant = "primary",
  className,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | null
  className?: string
  disabled?: boolean
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      size="large"
      className={className}
      type="submit"
      isLoading={pending}
      variant={variant}
      disabled={pending}
    >
      {children}
    </Button>
  )
}
