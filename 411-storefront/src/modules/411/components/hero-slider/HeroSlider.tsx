"use client"

import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// import required modules
import { Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"
import Image from "next/image"
import { Show } from "../show/Show"
import { getShows } from "../../../../../sanity/lib/queries"
import { ShowType } from "../../../../../sanity/schemas/types"
// import "./styles.css"

export const HeroSlider = () => {
  const [featuredShows, setFeaturedShows] = useState<ShowType[]>([])

  useEffect(() => {
    async function fetchShows() {
      const data = await getShows()
      setFeaturedShows(data)

      const featured = data.filter((show: ShowType) => show.isFeatured)
      setFeaturedShows(featured)
    }

    fetchShows()
  }, [])

  console.log(featuredShows)
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        spaceBetween={5}
        loop={true}
        className="mySwiper"
      >
        {featuredShows.map((show) => (
          <SwiperSlide key={show._id}>
            <div className="flex flex-col items-center justify-center h-full rounded-[30px] bg-[var(--backgroundPrimary)] text-[var(--textColor)]">
              <Show
                artist={show.artist}
                cloudUrl={show.cloudUrl}
                date={show.date}
                excerpt={show.excerpt}
                id={show._id}
                imageUrl={show.imageUrl}
                isFeatured
                key={show._id}
                large
                slug={show.slug.current}
                tags={show.tags}
                title={show.title}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
