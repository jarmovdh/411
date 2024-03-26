import { Product } from "@medusajs/medusa"
import { Metadata } from "next"

import { getCollectionsList, getProductsList, getRegion } from "@lib/data"
import FeaturedProducts from "@modules/home/components/featured-products"
import { ProductCollectionWithPreviews } from "types/global"
import { cache } from "react"
import { HeroSection } from "@modules/411/components/hero-section/HeroSection"
import { LatestShows } from "@modules/411/components/latest-shows/LatestShows"
import { LatestNews } from "@modules/411/components/latest-news/LatestNews"
import Loader from "@modules/411/components/loader/Loader"
import { Slogan } from "@modules/411/components/slogan/Slogan"

export const metadata: Metadata = {
  title: "411 Radio",
  description:
    "The best in underground music. Tune in to hear the latest shows, news, and more.",
}

const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 3)

    if (!collections) {
      return null
    }

    const collectionIds = collections.map((collection) => collection.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { collection_id: [id] },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let collection

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          )
        }

        if (!collection) {
          return
        }

        collection.products = response.products as unknown as Product[]
      })
    )

    return collections as unknown as ProductCollectionWithPreviews[]
  }
)

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <div className="pt-12 pb-24">
        <Slogan />
        <HeroSection collections={collections} />
        <LatestShows />
        <LatestNews />
      </div>
    </>
  )
}
