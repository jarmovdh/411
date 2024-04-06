"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"

export interface AlbumListProps {
  artist?: string
  alt: string
  coverImageUrl: string
  title?: string
  releaseDate?: string
  slug?: string
}

export const AlbumListItem = ({
  title,
  artist,
  coverImageUrl,
  alt,
  releaseDate,
  slug,
}: AlbumListProps) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/albums/${slug}`)
  }
  return (
    <div className="grid grid-cols-1 gap-x-1">
      {" "}
      <Link href={`/albums/${slug}`}>
        <div
          className="w-auto h-auto relative cursor-pointer"
          onClick={handleClick}
        >
          <Image
            src={coverImageUrl}
            width={600}
            height={300}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "25px",
              objectFit: "cover",
            }}
            alt={alt}
          />
        </div>
      </Link>
      <div className="flex flex-col gap-2 justify-start">
        {artist && (
          <Link href={`/albums/${slug}`}>
            <h1
              className="text-2xs font-medium mt-2 cursor-pointer md:text-sm"
              onClick={handleClick}
            >
              {artist} - {title}
            </h1>
          </Link>
        )}

        {releaseDate && (
          <p className="text-2xs md:text-xs m-0">
            Released:{" "}
            {new Date(releaseDate).toLocaleDateString("en-GB", {
              year: "numeric",
            })}
          </p>
        )}
      </div>
    </div>
  )
}
