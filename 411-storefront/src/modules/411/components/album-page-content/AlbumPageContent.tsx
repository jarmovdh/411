"use client"

import Image from "next/image"
import { PortableText } from "@portabletext/react"

import { AlbumType } from "../../../../../sanity/schemas/types"
import GlobeIcon from "../../../../../public/assets/icons/GlobeIcon"
import AppleIcon from "../../../../../public/assets/icons/ApplieIcon"
import SpotifyIcon from "../../../../../public/assets/icons/SpotifyIcon"
import { SocialShare } from "../social-share/SocialShare"

export default function AlbumPageContent({ album }: { album: AlbumType }) {
  return (
    <div className="content-container flex flex-col-reverse lg:grid lg:grid-cols-2 mt-12">
      <div>
        <h1 className="text-2xl font-bold">
          {album.artist} - {album.title}
        </h1>
        <p className="mb-4">
          release date:{" "}
          {new Date(album.releaseDate)
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .replace(/\//g, ".")}
        </p>
        <PortableText value={album.body} />
        <div className="text-[12px] my-[20px] px-8">
          {album.tracklist?.map((track, index) => (
            <span key={track._key}>
              {index + 1}. {track.title}
              <br />
              <hr className="border-b-1" />
              <br />
            </span>
          ))}
        </div>
        <div className="py-5 grid mb-12 gap-0.5">
          <a
            className="text-[12px] flex items-center cursor-pointer gap-1"
            href={album.spotifyUrl}
            target="_blank"
          >
            <SpotifyIcon className="h-4" /> Listen on Spotify
          </a>
          <a
            className="text-[12px] flex items-center cursor-pointer gap-1"
            href={album.appleMusicUrl}
            target="_blank"
          >
            <AppleIcon className="h-4" /> Listen on Apple Music
          </a>
          <a
            href={album.siteUrl}
            target="_blank"
            className="text-[12px] flex items-center cursor-pointer gap-1"
          >
            <GlobeIcon className="h-4" /> Website
          </a>
          <div className="mt-5">
            <SocialShare title={album.title} url={album.slug.current} />
          </div>
        </div>
      </div>
      <div className="w-full h-full md:h-[700px] object-cover relative rounded-[20px] cursor-pointer mt-[5px] mb-[5px]">
        <Image
          priority
          src={album.coverImageUrl}
          width={0}
          height={500}
          sizes="100vw"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "25px",
            objectFit: "cover",
          }}
          alt={album.alt}
        />
      </div>
    </div>
  )
}
