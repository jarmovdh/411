"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"

export interface FeaturedAlbumProps {
  artist?: string
  alt: string
  coverImageUrl: string
  slug?: string
  title?: string
}

export const FeaturedAlbum = ({
  alt,
  coverImageUrl,
  slug,
}: FeaturedAlbumProps) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/albums/${slug}`)
  }

  return (
    <div className="grid grid-flow-col">
      <Link href={`/albums/${slug}`}>
        <div
          className="rounded-lg relative w-full cursor-pointer"
          onClick={handleClick}
        >
          <Image
            src={coverImageUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "20px",
              objectFit: "cover",
            }}
            alt={alt}
            priority
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABjElEQVRIS+2Uz0oDQRSGz9"
          />
        </div>
      </Link>
    </div>
  )
}
