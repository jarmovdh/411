"use client"

import React, { useState } from "react"
import { Alert } from "@medusajs/ui"

import ShareIcon from "../../../../../public/assets/icons/ShareIcon"
import FacebookIcon from "../../../../../public/assets/icons/FacebookIcon"
import Xicon from "../../../../../public/assets/icons/Xicon"
import LinkIcon from "../../../../../public/assets/icons/LinkIcon"
import WhatsappIcon from "../../../../../public/assets/icons/WhatsappIcon"

interface SocialShareProps {
  url: string
  title: string
  prefix?: "news" | "listen" | "albums"
}

export const SocialShare = ({ url, title, prefix }: SocialShareProps) => {
  const [alertState, setAlertState] = useState<{
    show: boolean
    message: string
    variant: "success" | "error"
  }>({
    show: false,
    message: "",
    variant: "success",
  })

  const getFullUrl = () => {
    const baseUrl =
      process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:8000"
    const urlPrefix = prefix ? `/${prefix}/` : "/"
    return `${baseUrl}${urlPrefix}${url}`
  }

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getFullUrl())}`
    window.open(facebookUrl, "_blank")
  }

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(getFullUrl())}&text=${encodeURIComponent(title)}`
    window.open(twitterUrl, "_blank")
  }

  const shareOnWhatsapp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(title + " " + getFullUrl())}`
    window.open(whatsappUrl, "_blank")
  }

  const copyLinkToClipboard = () => {
    navigator.clipboard
      .writeText(getFullUrl())
      .then(() => {
        showAlert("Link copied to clipboard!", "success")
      })
      .catch((error) => {
        console.error("Unable to copy link to clipboard:", error)
        showAlert(
          "Copy to clipboard failed. Please manually copy the link.",
          "error"
        )
      })
  }

  const showAlert = (message: string, variant: "success" | "error") => {
    setAlertState({ show: true, message, variant })
    setTimeout(
      () => setAlertState({ show: false, message: "", variant: "success" }),
      3000
    )
  }

  return (
    <div className="relative">
      {alertState.show && (
        <div className="absolute bottom-full mb-2">
          <Alert
            className="bg-[var(--theme-background)] text-[var(--theme-color)] text-small-regular p-2"
            title={alertState.variant === "success" ? "Success" : "Error"}
            variant={alertState.variant}
          >
            {alertState.message}
          </Alert>
        </div>
      )}
      <div className="flex items-center gap-2">
        <p>share:</p>
        <button
          className="bg-transparent border-none cursor-pointer"
          onClick={shareOnFacebook}
        >
          <FacebookIcon className="h-4 md:h-5" />
        </button>

        <button
          className="bg-transparent border-none cursor-pointer"
          onClick={shareOnTwitter}
        >
          <Xicon className="h-4 md:h-5" />
        </button>
        <button
          className="bg-transparent border-none cursor-pointer"
          onClick={shareOnWhatsapp}
        >
          <WhatsappIcon className="h-4 md:h-5" />
        </button>
        <button
          className="bg-transparent border-none cursor-pointer"
          onClick={copyLinkToClipboard}
        >
          <LinkIcon className="h-4 md:h-5" />
        </button>
      </div>
    </div>
  )
}
