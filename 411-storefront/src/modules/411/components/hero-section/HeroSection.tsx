import { HeroSlider } from "../hero-slider/HeroSlider"
import { LatestNews } from "../latest-news/LatestNews"
import { ProductSlider } from "../product-slider/ProductSlider"
;("../product-slider/ProductSlider")

export const HeroSection = ({ collections }) => {
  return (
    <div className="content-container grid grid-cols-1 gap-1 small:grid-cols-2 ">
      <div className="flex w-full rounded-full md:w-full">
        <HeroSlider />
      </div>
      <div className="md:grid md:grid-cols-2 gap-1">
        <div className="h-full">
          <ProductSlider collections={collections} />
        </div>
        <div className="grid grid-rows-2 h-full gap-1 ">
          <div className="bg-blue-200 flex items-center justify-center rounded-base">
            Child 1
          </div>
          <div className="bg-red-200 flex items-center justify-center rounded-base">
            Child 2
          </div>
        </div>
      </div>
    </div>
  )
}
