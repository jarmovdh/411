"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ShowType,
  NewsItemType,
  AlbumType,
} from "../../../../../sanity/schemas/types"
import Image from "next/image"
import ProductPreview from "@modules/products/components/product-preview"
import { ProductPreviewType } from "types/global"

type SearchPageProps = {
  initialShows: ShowType[]
  initialNews: NewsItemType[]
  initialAlbums: AlbumType[]
  initialProducts: ProductPreviewType[]
  initialRegion?: any
  searchQuery: string
}

export default function SearchPage({
  initialShows,
  initialNews,
  initialAlbums,
  initialProducts,
  initialRegion,
  searchQuery,
}: SearchPageProps) {
  const [shows] = useState<ShowType[]>(initialShows)
  const [newsItems] = useState<NewsItemType[]>(initialNews)
  const [albums] = useState<AlbumType[]>(initialAlbums)
  const [products] = useState<ProductPreviewType[]>(initialProducts)
  const [activeTab, setActiveTab] = useState("All")
  const [region] = useState<any>(initialRegion)
  const router = useRouter()

  const filterData = (data: any[], query: string) =>
    data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    )

  const navigateToItem = (item: {
    type: string
    slug?: { current: string }
    handle?: string
  }) => {
    console.log("Navigating to item:", item)
    if (item.type === "show") {
      router.push(`/listen/${item.slug?.current || "404"}`)
    } else if (item.type === "album") {
      router.push(`/albums/${item.slug?.current || "404"}`)
    } else if (item.type === "news") {
      router.push(`/news/${item.slug?.current || "404"}`)
    } else if (item.type === "product") {
      router.push(`/products/${item.handle || "404"}`)
    } else {
      console.error("Unknown item type:", item.type)
    }
  }

  const getContent = () => {
    switch (activeTab) {
      case "All":
        return [
          ...filterData(shows, searchQuery).map((item) => ({
            ...item,
            type: "show",
          })),
          ...filterData(newsItems, searchQuery).map((item) => ({
            ...item,
            type: "news",
          })),
          ...filterData(albums, searchQuery).map((item) => ({
            ...item,
            type: "album",
          })),
          ...filterData(products, searchQuery).map((item) => ({
            ...item,
            type: "product",
          })),
        ]
      case "Shows":
        return filterData(shows, searchQuery).map((item) => ({
          ...item,
          type: "show",
        }))
      case "Albums":
        return filterData(albums, searchQuery).map((item) => ({
          ...item,
          type: "album",
        }))
      case "News":
        return filterData(newsItems, searchQuery).map((item) => ({
          ...item,
          type: "news",
        }))
      case "Products":
        return filterData(products, searchQuery).map((item) => ({
          ...item,
          type: "product",
        }))
      default:
        return []
    }
  }

  return (
    <>
      <div className="content-container">
        <h1 className="p-5">
          Search results for: <strong>{searchQuery}</strong>
        </h1>
        <div className="tab-container w-full justify-between flex gap-4 p-5 border-b-2 lg:px-[500px]">
          <button
            className={`button ${
              activeTab === "All"
                ? "font-bold underline underline-offset-4"
                : ""
            }`}
            onClick={() => setActiveTab("All")}
          >
            All
          </button>
          <button
            className={`button ${
              activeTab === "Shows"
                ? "font-bold underline underline-offset-4"
                : ""
            }`}
            onClick={() => setActiveTab("Shows")}
          >
            Shows
          </button>
          <button
            className={`button ${
              activeTab === "Products"
                ? "font-bold underline underline-offset-4"
                : ""
            }`}
            onClick={() => setActiveTab("Products")}
          >
            Products
          </button>
          <button
            className={`button ${
              activeTab === "News"
                ? "font-bold underline underline-offset-4"
                : ""
            }`}
            onClick={() => setActiveTab("News")}
          >
            News
          </button>
          <button
            className={`button ${
              activeTab === "Albums"
                ? "font-bold underline underline-offset-4"
                : ""
            }`}
            onClick={() => setActiveTab("Albums")}
          >
            Albums
          </button>
        </div>
        <div className="results lg:px-[200px] md:py-10">
          {getContent().length === 0 ? (
            <h2>No results found</h2>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 pt-2">
              {getContent().map((item, index) => (
                <div
                  key={item.id || index}
                  className="grid grid-cols-5 gap-1"
                  onClick={() => {
                    console.log("Item clicked:", item)
                    navigateToItem(item)
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="col-span-2 md:col-span-2">
                    {item.type === "product" ? (
                      <ProductPreview productPreview={item} region={region} />
                    ) : (
                      <Image
                        alt={item.title}
                        src={item.imageUrl || item.coverImageUrl}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-[130px] w-[200px] md:w-[350px] md:h-[250px] object-cover rounded-base"
                        priority
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABjElEQVRIS+2Uz0oDQRSGz9"
                      />
                    )}
                  </div>
                  <div className="col-span-3 md:col-span-3">
                    <h2>{item.title}</h2>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
