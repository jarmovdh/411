"use client"
//TODO add components
import React from "react"
import Image from "next/image"
// import { PlayerButton } from "@/components/player-button/PlayerButton"
// import AddShowButton from "@/components/add-show-button/AddShowButton"
// import { SocialShare } from "@/components/social-share"
import { ShowType } from "@/schemas/types"
// import Tracklist from "../tracklist/TrackList"

export default function ShowPageContent({ show }: { show: ShowType }) {
  return (
    <>
      <div className="content-container text-[color] mb-30 rounded-[35px]">
        <div className="flex flex-row items-center">
          {/* <button
            className="border-none cursor-pointer bg-transparent"
            show={show}
            onClick={() => {}}
          > */}
          {/* <PlayerButton  /> */}
          {/* </button> */}
          <h1>
            {show.title} - {show.artist}
          </h1>
        </div>

        <p>
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
            priority
            src={show.imageUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "25px",
              objectFit: "cover",
            }}
            alt={show.title}
          />
        </div>

        <div className="flex flex-1 flex-row gap-2.5 md:flex-col">
          <div>
            <p>{show.excerpt}</p>
            <div className="flex-basis[calc(50%-10px)]">
              {/* <AddShowButton show={show} initialIsBookmarked={false} />
              <SocialShare url="" title="" /> */}
            </div>
          </div>

          {/* <Tracklist tracklist={show.tracklist} /> */}
        </div>
      </div>
    </>
  )
}
