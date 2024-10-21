"use client"

import React, { useEffect, useState } from "react"
import { FreeMode, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useRouter } from "next/navigation"

// // Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { NewsItemType } from "../../../../../sanity/schemas/types"
import { NewsItem } from "../newsitem/NewsItem"
import { getNewsItems } from "../../../../../sanity/lib/queries"
import ArrowRightIcon from "../../../../../public/assets/icons/ArrowRightIcon"

export const LatestNews = () => {
  const router = useRouter()
  const [newsItems, setNewsItems] = useState<NewsItemType[]>([])

  useEffect(() => {
    async function fetchNews() {
      const data = await getNewsItems()
      setNewsItems(data)
    }
    fetchNews()
  }, [])

  return (
    <>
      <div className="content-container mt-1.5">
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
                slidesPerView: 1.5,
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
                  className="bg-[var(--theme-background-hover)] border-none cursor-pointer rounded-full p-2 w-10 h-10 flex items-center justify-center"
                  onClick={() => router.push("/news")}
                >
                  <ArrowRightIcon className="h-6" />
                </button>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  )
}
