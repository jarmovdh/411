"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import ProductPreview from "@modules/products/components/product-preview"

// import required modules
import { Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import "./styles.css"

export const ProductSlider = ({ collections }) => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
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
