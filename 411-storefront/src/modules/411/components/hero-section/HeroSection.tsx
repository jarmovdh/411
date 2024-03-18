import { HeroSlider } from "../hero-slider/HeroSlider"
import { ProductSlider } from "../product-slider/product-slider"

export const HeroSection = () => {
  return (
    <div className="content-container rounded-full grid grid-cols-1 gap-1 md:grid-cols-2 ">
      <div className="flex w-full rounded-full md:w-full">
        <HeroSlider />
      </div>
      <div className="md:grid md:grid-cols-2 gap-1">
        <div className="h-full">
          <ProductSlider />
        </div>
        <div className="grid  grid-rows-2 h-full gap-1 ">
          <div className="bg-blue-200 flex items-center justify-center rounded">
            Child 1
          </div>
          <div className="bg-red-200 flex items-center justify-center rounded">
            Child 2
          </div>
        </div>
      </div>
    </div>
  )
}
