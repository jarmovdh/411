"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { usePlayerContext } from "@lib/context/player-context"
import PauseIcon from "../../../../../public/assets/icons/PauseIcon"
import PlayIcon from "../../../../../public/assets/icons/PlayIcon"

export interface ShowProps {
  artist?: string
  cloudUrl?: string
  date: string
  excerpt?: string
  id: number
  imageUrl: string
  isFeatured?: boolean
  large?: boolean
  slug?: string
  tags: string[]
  title: string
}

export const Show = ({
  artist,
  cloudUrl,
  date,
  excerpt,
  id,
  imageUrl,
  isFeatured,
  large,
  slug,
  tags,
  title,
}: ShowProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()
  const { activePlayer, setActivePlayer } = usePlayerContext()
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    router.push(`/listen/${slug}`)
  }

  const togglePlayer = () => {
    setIsVisible((prev) => !prev)
    setActivePlayer((prevPlayer) => {
      if (prevPlayer && prevPlayer.id === id) {
        return null
      }
      return {
        id,
        artist: artist || "",
        date,
        excerpt: excerpt || "",
        title,
        slug: slug || "",
        tags,
        imageUrl,
        cloudUrl: cloudUrl || "",
        tracklist: [],
        isFeatured,
      }
    })
  }

  useEffect(() => {
    const handlePopState = () => {
      setIsVisible(false)
      //   setActivePlayer(null)
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [setActivePlayer])

  return (
    <div
      className={`relative flex flex-col ${
        large ? "h-[350px] md:h-[525px]" : "h-[250px] md:h-[350px]"
      } 
  
    w-full bg-black text-white rounded-base`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative w-full h-full cursor-pointer"
        onClick={togglePlayer}
      >
        <Image
          alt={title}
          src={imageUrl}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full object-cover rounded-base"
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABjElEQVRIS+2Uz0oDQRSGz9"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          {activePlayer && activePlayer.id === id ? (
            <PauseIcon className="h-10 md:h-12" />
          ) : (
            <PlayIcon className="h-10 md:h-12" />
          )}
        </div>
      </div>
      <div
        className={`absolute bottom-0 right-0 left-0 bg-black bg-opacity-40 p-2 flex flex-col justify-evenly rounded-b-base ${
          large ? "p-5" : "p-2"
        }`}
        style={{
          height: isHovered ? "125px" : "90px",
          transition: "height 0.5s",
        }}
      >
        <p
          className={`${large ? "text-xs" : "text-2xs"} text-white opacity-90`}
        >
          {new Date(date)
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .replace(/\//g, ".")}
        </p>
        <h1
          className={`${
            large ? "text-xl" : "text-md"
          } font-medium cursor-pointer`}
          onClick={handleClick}
        >
          {title} - {artist}
        </h1>
        <p
          className={`transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          } ${large ? "text-base" : "text-xs"} line-clamp-2`}
        >
          {excerpt}
        </p>
        <div
          className={`transition-opacity duration-500 flex gap-1 mt-2 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-black text-white rounded-full px-1 bg-opacity-70 border border-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
