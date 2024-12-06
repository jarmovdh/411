"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// import required modules
import { Autoplay, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface Product {
  id: string
  handle: string
  thumbnail: string
  title: string
}

interface Collection {
  products: Product[]
}

interface ProductSliderProps {
  collections: Collection[]
}

export const ProductSlider = ({ collections }: ProductSliderProps) => {
  return (
    <Swiper
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination, Autoplay]}
      spaceBetween={5}
      loop={true}
      className="mySwiper"
      style={{ width: "100%", height: "100%" }}
    >
      {collections.map((collection: { products: any[] }) =>
        collection.products.map((product) => (
          <SwiperSlide key={product.id}>
            <LocalizedClientLink
              href={`/products/${product.handle}`}
              className="group"
            >
              <Image
                src={product.thumbnail}
                alt={product.title}
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
            </LocalizedClientLink>
          </SwiperSlide>
        ))
      )}
    </Swiper>
  )
}
