"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// import required modules
import { Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"
import Image from "next/image"
// import "./styles.css"

export const HeroSlider = () => {
  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        spaceBetween={5}
        loop={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://via.placeholder.com/800x500"
            alt="Slide 1"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "25px",
              objectFit: "cover",
            }}
            priority
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://via.placeholder.com/800x500"
            alt="Slide 1"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "25px",
              objectFit: "cover",
            }}
            priority
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://via.placeholder.com/800x500"
            alt="Slide 1"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "25px",
              objectFit: "cover",
            }}
            priority="true"
          />
        </SwiperSlide>
      </Swiper>
    </>
  )
}
