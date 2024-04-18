"use client"
import React from "react"
import Image from "next/image"
import { PlayerButton } from "../player-button/PlayerButton"
import { ShowType } from "../../../../../sanity/schemas/types"
import { SocialShare } from "../social-share/SocialShare"
import SaveShowButton from "../save-show-button/SaveShowButton"
import { Customer } from "@medusajs/medusa"
import { useRouter } from "next/navigation"
import Tracklist from "../tracklist/TrackList"

export default function ShowPageContent({
  show,
  customer,
}: {
  customer: Omit<Customer, "password_hash"> | null
  show: ShowType
}) {
  const router = useRouter()

  if (!show) {
    router.push(`/not-found`)
  }

  const initialIsBookmarked =
    customer &&
    customer.metadata &&
    Array.isArray(customer.metadata.shows) &&
    customer.metadata.shows.includes(show._id)
      ? true
      : false

  return (
    <>
      <div className="content-container text-[color] my-[30px] rounded-[35px]">
        <div className="flex flex-row items-center">
          <PlayerButton show={show} onClick={() => {}} />
          <h1 className="text-2xl font-bold">
            {show.title} - {show.artist}
          </h1>
        </div>

        <p className="text-2sm mb-4">
          {new Date(show.date)
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .replace(/\//g, ".")}
        </p>
        <div className="w-full h-[500px] object-cover rounded-[25px] md:h-[700px]">
          <Image
            alt={show.title}
            src={show.imageUrl}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-cover rounded-base"
            priority
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABjElEQVRIS+2Uz0oDQRSGz9"
          />
        </div>

        <div className="grid md:grid-cols-2 pt-5">
          <p>{show.excerpt}</p>
          <Tracklist tracklist={show.tracklist} />
        </div>

        <div className="flex gap-2 items-center">
          <SaveShowButton
            show={show}
            initialIsBookmarked={initialIsBookmarked}
            customer={customer}
          />
          <SocialShare title={show.title} url={show.slug.current} />
        </div>
      </div>
    </>
  )
}
