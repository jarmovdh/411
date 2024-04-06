import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"

export interface AlbumProps {
  alt: string
  appleMusicUrl?: string
  artist: string
  coverImageUrl: string
  date?: string
  excerpt?: string
  releaseDate?: string
  siteUrl?: string
  slug?: string
  spotifyUrl?: string
  title: string
}

export const Album = ({
  alt,
  appleMusicUrl,
  artist,
  coverImageUrl,
  date,
  excerpt,
  releaseDate,
  siteUrl,
  slug,
  spotifyUrl,
  title,
}: AlbumProps) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/albums/${slug}`)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-auto">
      <Link href={`/albums/${slug}`}>
        <div onClick={handleClick}>
          <Image
            src={coverImageUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "25px",
              objectFit: "cover",
            }}
            alt={alt}
            priority
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABjElEQVRIS+2Uz0oDQRSGz9"
          />
        </div>
      </Link>
      <h1 className="text-lg font-medium mt-2">
        {artist} - {title}
      </h1>
      <p>{date}</p>
      <p className="text-sm mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {excerpt}
      </p>
      <p>{releaseDate}</p>
      <p>{spotifyUrl}</p>
      <p>{appleMusicUrl}</p>
      <p>{siteUrl}</p>
    </div>
  )
}
