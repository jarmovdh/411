import FeaturedAlbums from "../featured-albums/FeaturedAlbums"
import HeroSlider from "../hero-slider/HeroSlider"
import { ProductSlider } from "../product-slider/ProductSlider"

export const HeroSection = ({ collections }) => {
  return (
    <div className="content-container grid grid-cols-1 gap-1 small:grid-cols-2 ">
      <div className="flex w-full rounded-full md:w-full">
        <HeroSlider />
      </div>
      <div className="grid grid-cols-2 gap-1">
        <div className="h-full">
          <ProductSlider collections={collections} />
        </div>
        <div className="grid gap-1 ">
          <FeaturedAlbums />
        </div>
      </div>
    </div>
  )
}
