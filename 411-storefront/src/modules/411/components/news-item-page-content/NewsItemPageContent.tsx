"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

import { PortableText } from "@portabletext/react"
import imageUrlBuilder from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

import { NewsItemType } from "../../../../../sanity/schemas/types"
import client from "../../../../../sanity/lib/client"
import { NewsSlider } from "../news-slider/NewSlider"
import { SocialShare } from "../social-share/SocialShare"
import ArrowLeftIcon from "../../../../../public/assets/icons/ArrowLeftIcon"

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
          <figure className="my-4">
            <Image
              src={imageUrl}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt={value.alt || " "}
            />

            {value.caption && (
              <figcaption className="text-2xs">{value.caption}</figcaption>
            )}
          </figure>
        )
      },
    },
    block: {
      // Custom serializer for <p> tags based on 'normal' style
      normal: ({ children }) => {
        if (children.length === 1 && children[0] === "") {
          return <br />
        }
        return <p>{children}</p>
      },
    },
  }

  return (
    <div className="content-container text-[var(--text-color)] my-20 pb-24">
      <h1 className="text-2xl font-bold">{newsItem.title}</h1>
      <p className="mb-4">
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
      <div className="p-[20px] md:px-[100px] lg:px-[200px]">
        <PortableText value={newsItem.body} components={components} />
        <div className="mt-5">
          <SocialShare
            title={newsItem.title}
            url={newsItem.slug.current}
            prefix="news"
          />
        </div>

        <div className="flex items-center justify-end cursor-pointer">
          <button
            className="bg-[var(--theme-background-hover)] border-none cursor-pointer rounded-full p-2 w-10 h-10 flex items-center justify-center"
            onClick={() => router.push("/news")}
          >
            <ArrowLeftIcon className="h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
