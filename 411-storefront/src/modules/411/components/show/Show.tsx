"use client;"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
// import PlayIconSVG from "../../public/assets/icons/play.svg" // Update the import path according to your project structure
// import PauseIconSVG from "../../public/assets/icons/pause.svg" // Update the import path according to your project structure
// import { usePlayerContext } from "../contexts/PlayerContext" // Adjust the import path as needed

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
  //   const { activePlayer, setActivePlayer } = usePlayerContext()
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    router.push(`/listen/${slug}`)
  }

  //   const togglePlayer = () => {
  //     setIsVisible(!isVisible)
  //     setActivePlayer((prevPlayer) => {
  //       if (prevPlayer && prevPlayer.id === id) {
  //         return null
  //       }
  //       return {
  //         id,
  //         artist: artist || "",
  //         date,
  //         excerpt: excerpt || "",
  //         title,
  //         slug: slug || "",
  //         tags,
  //         imageUrl,
  //         cloudUrl: cloudUrl || "",
  //         tracklist: [],
  //         isFeatured,
  //       }
  //     })
  //   }

  //   useEffect(() => {
  //     const handlePopState = () => {
  //       setIsVisible(false)
  //     //   setActivePlayer(null)
  //     }

  //     window.addEventListener("popstate", handlePopState)

  //     return () => {
  //       window.removeEventListener("popstate", handlePopState)
  //     }
  //   }, [setActivePlayer])

  return (
    <div
      className={`relative flex flex-col ${
        large ? "h-[555px]" : "h-[400px]"
      } w-full bg-black text-white rounded-3xl transition-transform duration-300 ease-in-out hover:scale-105`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative w-full h-full cursor-pointer"
        // onClick={togglePlayer}
      >
        <Image
          alt={title}
          src={imageUrl}
          layout="fill"
          className="rounded-3xl object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABjElEQVRIS+2Uz0oDQRSGz9"
        />
        {/* {activePlayer && activePlayer.id === id ? (
          <PauseIconSVG className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-current text-white z-10" />
        ) : (
          <PlayIconSVG className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-current text-white z-10" />
        )} */}
      </div>
      <div
        className={`absolute bottom-0 right-0 left-0 bg-black bg-opacity-90 p-2 flex flex-col justify-evenly rounded-b-3xl ${
          large ? "p-5" : "p-2"
        }`}
        style={{
          height: isHovered ? "125px" : "90px",
          transition: "height 0.5s",
        }}
      >
        <p
          className={`${large ? "text-base" : "text-xs"} text-white opacity-90`}
        >
          {new Date(date)
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
            .replace(/\//g, ".")}
        </p>
        <h1
          className={`${
            large ? "text-xl" : "text-lg"
          } font-medium cursor-pointer`}
          onClick={handleClick}
        >
          {title} - {artist}
        </h1>
        <p
          className={`transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          } ${large ? "text-base" : "text-xs"}`}
        >
          {excerpt}
        </p>
        <div className="flex gap-2 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-200 text-black rounded-full px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
