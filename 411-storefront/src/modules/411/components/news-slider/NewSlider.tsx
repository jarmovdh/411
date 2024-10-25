"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import Image from "next/image"

import "swiper/css"
import "swiper/css/pagination"

export type CarouselImage = {
  imageSrc: string
  alt: string
  _id: string
}

type NewsSliderProps = {
  carouselImages: CarouselImage[]
}

export const NewsSlider: React.FC<NewsSliderProps> = ({ carouselImages }) => {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {carouselImages.map((image) => (
          <SwiperSlide key={image._id}>
            <div className="w-full h-[500px] object-cover rounded-[25px] cursor-pointer md:h-[700px]">
              <Image
                src={image.imageSrc}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "25px",
                  objectFit: "cover",
                }}
                alt={image.alt}
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
