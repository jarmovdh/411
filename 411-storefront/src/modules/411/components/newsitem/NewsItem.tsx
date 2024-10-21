"use client"

import React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export interface NewsProps {
  date: string
  imageUrl: string
  slug: string
  title: string
}

export const NewsItem = ({ date, title, slug, imageUrl }: NewsProps) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/news/${slug}`)
  }

  return (
    <>
      <div className="relative flex flex-col items-stretch h-full rounded-base transition-transform duration-300 ease-in-out">
        <div className="relative grid grid-cols-auto gap-1.5">
          <div className="relative w-full h-[300px]  rounded-base cursor-pointer overflow-hidden md:h-[400px]">
            <Image
              src={imageUrl}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full object-cover rounded-base"
              alt={title}
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABjElEQVRIS+2Uz0oDQRSGz9"
            />
          </div>
          <div className="absolute rounded-b-base bottom-0 flex flex-1 flex-col justify-between w-full p-2.5 bg-black/50">
            <p className="text-xs mb-0 mt-0 text-[var(--theme-colorcontrary)]">
              {new Date(date)
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .replace(/\//g, ".")}
            </p>
            <div className="flex flex-col cursor-pointer h-14 mb-1.5">
              <h1
                className="text-sm md:text-xl sm:text-lg text-[var(--theme-colorcontrary)] font-medium hover:text-tertiary-500"
                onClick={handleClick}
              >
                {title}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
