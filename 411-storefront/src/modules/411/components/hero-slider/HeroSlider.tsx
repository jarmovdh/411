import React from "react"

import { getShows } from "../../../../../sanity/lib/queries"
import { ShowType } from "../../../../../sanity/schemas/types"
import HeroSliderContent from "../hero-slider-content/HeroSliderContent"

export default async function HeroSlider() {
  const data = await getShows()

  const featuredShows = data.filter((show: ShowType) => show.isFeatured)

  return (
    <>
      <HeroSliderContent featuredShows={featuredShows} />
    </>
  )
}
