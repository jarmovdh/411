"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

import { PortableText } from "@portabletext/react"
import imageUrlBuilder from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
// import { SocialShare } from "@/components/social-share"

// import ArrowLeftIcon from "../../public/assets/icons/arrow-left.svg"
import { NewsItemType } from "../../../../../sanity/schemas/types"
import client from "../../../../../sanity/lib/client"
import { NewsSlider } from "../news-slider/NewSlider"

interface ImageValue {
  blogImage: {
    _key: string
    _type: string
    asset: {
      _ref: string
      _type: string
    }
  }
  alt?: string
  caption?: string
}

export default function NewsItemPageContent({
  newsItem,
}: {
  newsItem: NewsItemType
}) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/news`)
  }

  const builder = imageUrlBuilder(client)

  function urlFor(source: SanityImageSource) {
    return builder.image(source)
  }

  const components = {
    types: {
      image: ({ value }: { value: ImageValue }) => {
        if (!value || !value.blogImage) {
          return null
        }
        const imageUrl = urlFor(value.blogImage).url()
        return (
          <figure className="m-0">
            <Image
              src={imageUrl}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt={value.alt || " "}
            />

            {value.caption && <figcaption>{value.caption}</figcaption>}
          </figure>
        )
      },
    },
  }

  return (
    <div className="content-container text-[var(--text-color)]">
      <h1>{newsItem.title}</h1>
      <p>
        {new Date(newsItem.date)
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, ".")}
      </p>
      {newsItem.carouselImages && newsItem.carouselImages.length > 0 ? (
        <NewsSlider carouselImages={newsItem.carouselImages} />
      ) : (
        <div className="w-full h-[500px] object-cover rounded-[25px] md:h-[700px]">
          <Image
            src={newsItem.imageUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "25px",
              objectFit: "cover",
            }}
            alt={newsItem.alt}
            priority
          />
        </div>
      )}
      <div className="p-[20px] md:p-0">
        <PortableText value={newsItem.body} components={components} />
        TODO - Add SocialShare component
        {/* <SocialShare title={newsItem.title} url={newsItem.slug.current} /> */}
        <div className="flex items-center justify-end cursor-pointer">
          {/* <ArrowLeftIcon /> */}
          <h2> Return to news</h2>
        </div>
      </div>
    </div>
  )
}
