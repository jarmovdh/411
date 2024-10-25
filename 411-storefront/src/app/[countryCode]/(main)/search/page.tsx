"use client"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  getAlbums,
  getNewsItems,
  getShows,
} from "../../../../../sanity/lib/queries"
import {
  ShowType,
  NewsItemType,
  AlbumType,
} from "../../../../../sanity/schemas/types"
import { ProductPreviewType } from "types/global"
import Image from "next/image"
import { medusaClient } from "@lib/config"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const q = searchParams?.get("q")
  const searchQuery = q as string
  const [shows, setShows] = useState<ShowType[]>([])
  const [newsItems, setNewsItems] = useState<NewsItemType[]>([])
  const [albums, setAlbums] = useState<AlbumType[]>([])
  const [products, setProducts] = useState<ProductPreviewType[]>([])
  const [activeTab, setActiveTab] = useState("All")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch Sanity data
        const [showsData, newsData, albumsData] = await Promise.all([
          getShows(),
          getNewsItems(),
          getAlbums(),
        ])

        setShows(showsData)
        setNewsItems(newsData)
        setAlbums(albumsData)

        // Fetch products using Medusa client directly
        if (searchQuery) {
          const { products: productsData } = await medusaClient.products.list({
            q: searchQuery,
            limit: 12,
          })
          setProducts(productsData)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [searchQuery])

  const filterData = (data: any[], query: string) =>
    data.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        (item.artist &&
          item.artist.name &&
          item.artist.name.toLowerCase().includes(query.toLowerCase()))
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
          ...products.map((item) => ({
            ...item,
            type: "product",
          })),
        ]
      case "Shows":
        return filterData(shows, searchQuery).map((item) => ({
          ...item,
          type: "show",
        }))
      case "Products":
        return products.map((item) => ({
          ...item,
          type: "product",
        }))
      case "News":
        return filterData(newsItems, searchQuery).map((item) => ({
          ...item,
          type: "news",
        }))
      case "Albums":
        return filterData(albums, searchQuery).map((item) => ({
          ...item,
          type: "album",
        }))
      default:
        return []
    }
  }

  const renderProductItem = (item: any) => {
    return (
      <div className="flex flex-col">
        <div className="flex items-center gap-x-4">
          <div className="w-[200px]">
            <img
              src={item.thumbnail || ""}
              alt={item.title}
              className="w-[200px] h-[300px] object-cover rounded"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="content-container">
        <h1 className="p-5 text-center text-base-regular uppercase">
          Search results for: <strong className="italic">{searchQuery}</strong>
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
          {loading ? (
            <div className="text-center py-12">Searching...</div>
          ) : getContent().length === 0 ? (
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
                      renderProductItem(item)
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
                    <h2>{item.artist}</h2>
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
