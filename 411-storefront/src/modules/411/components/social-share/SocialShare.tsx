"use client"

import React, { useState } from "react"
import ShareIcon from "../../../../../public/assets/icons/ShareIcon"
import FacebookIcon from "../../../../../public/assets/icons/FacebookIcon"
import Xicon from "../../../../../public/assets/icons/Xicon"
import LinkIcon from "../../../../../public/assets/icons/LinkIcon"
import WhatsappIcon from "../../../../../public/assets/icons/WhatsappIcon"

interface SocialShareProps {
  url: string
  title: string
}

export const SocialShare = ({ url, title }: SocialShareProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const openShareDiv = () => {
    setIsOpen(!isOpen)
  }

  //TODO update share functionalities
  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`
    window.open(facebookUrl, "_blank")
  }

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`
    window.open(twitterUrl, "_blank")
  }

  const copyLinkToClipboard = () => {
    // Use the Clipboard API to copy the link to the clipboard
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Link copied to clipboard!")
      })
      .catch((error) => {
        console.error("Unable to copy link to clipboard:", error)
        alert("Copy to clipboard failed. Please manually copy the link.")
      })
  }

  return (
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
        onClick={shareOnTwitter}
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
  )
}
