"use client"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  getAlbums,
  getNewsItems,
  getShows,
} from "../../../../../sanity/lib/queries"
import { Show } from "@modules/411/components/show/Show"
import {
  ShowType,
  NewsItemType,
  AlbumType,
} from "../../../../../sanity/schemas/types"
import Image from "next/image"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const q = searchParams?.get("q")
  const searchQuery = q as string
  const [shows, setShows] = useState<ShowType[]>([])
  const [newsItems, setNewsItems] = useState<NewsItemType[]>([])
  const [albums, setAlbums] = useState<AlbumType[]>([])
  const [activeTab, setActiveTab] = useState("All")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const showsData = await getShows()
        setShows(showsData)
        const newsData = await getNewsItems()
        setNewsItems(newsData)
        const albumsData = await getAlbums()
        setAlbums(albumsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  // Filter function placeholder, ensure you implement actual filtering logic
  const filterData = (data: any[], query: string) =>
    data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    )

  const navigateToItem = (item: { type: string; slug: { current: any } }) => {
    console.log("Navigating to item:", item.slug.current)
    if (item.type === "show") {
      router.push(`/listen/${item.slug.current || "404"}`)
    } else if (item.type === "album") {
      router.push(`/albums/${item.slug.current || "404"}`)
    } else if (item.type === "news") {
      router.push(`/news/${item.slug.current || "404"}`)
    }
  }

  const getContent = () => {
    switch (activeTab) {
      case "All":
        return [
          ...filterData(shows, searchQuery),
          ...filterData(newsItems, searchQuery),
          ...filterData(albums, searchQuery),
        ]
      case "Shows":
        return filterData(shows, searchQuery)
      case "Albums":
        return filterData(albums, searchQuery)
      case "News":
        return filterData(newsItems, searchQuery)
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
        <div className="tab-container w-full justify-between flex gap-4 p-5 border-b-2 ">
          <button
            className={`button ${activeTab === "All" ? "font-bold" : ""}`}
            onClick={() => setActiveTab("All")}
          >
            All
          </button>
          <button
            className={`button ${activeTab === "Shows" ? "font-bold" : ""}`}
            onClick={() => setActiveTab("Shows")}
          >
            Shows
          </button>
          <button
            className={`button ${activeTab === "Products" ? "font-bold" : ""}`}
            onClick={() => setActiveTab("Products")}
          >
            Products
          </button>
          <button
            className={`button ${activeTab === "News" ? "font-bold" : ""}`}
            onClick={() => setActiveTab("News")}
          >
            News
          </button>
          <button
            className={`button ${activeTab === "Albums" ? "font-bold" : ""}`}
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
                  onClick={() => navigateToItem(item)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="col-span-2 md:col-span-2">
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
