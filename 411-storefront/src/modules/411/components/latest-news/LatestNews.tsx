"use client"

import React, { useEffect, useState } from "react"
import { FreeMode, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useRouter } from "next/navigation"

// import ArrowRightIcon from "../../public/assets/icons/arrow-right.svg"
// // Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { NewsItemType } from "../../../../../sanity/schemas/types"
import { NewsItem } from "../newsitem/NewsItem"
import { getNewsItems } from "../../../../../sanity/lib/queries"

export const LatestNews = () => {
  const router = useRouter()
  const [newsItems, setNewsItems] = useState<NewsItemType[]>([])

  const handleClick = () => {
    router.push("/news")
  }

  useEffect(() => {
    async function fetchNews() {
      const data = await getNewsItems()
      setNewsItems(data)
    }
    fetchNews()
  }, [])

  return (
    <>
      <div className="-z-1 content-container mt-1">
        <div className="overflow-hidden">
          <Swiper
            slidesPerView={3}
            spaceBetween={5}
            breakpoints={{
              360: {
                slidesPerView: 1.5,
                spaceBetween: 5,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 5,
              },
            }}
            freeMode
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            {newsItems.slice(0, 6).map((news) => (
              <SwiperSlide key={news._id}>
                <NewsItem
                  date={news.date}
                  imageUrl={news.imageUrl}
                  key={news._id}
                  slug={news.slug.current}
                  title={news.title}
                />
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <div className="flex flex-col justify-end items-start underline leading-6 self-end relative">
                <button
                  onClick={handleClick}
                  className="grid grid-flow-col auto-cols-max gap-4 bg-transparent border-none cursor-pointer p-0"
                >
                  <h1>More News</h1>
                  {/* <ArrowRightIcon className="text-current h-10" /> */}
                </button>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  )
}
