import { Metadata } from "next"

import { getCustomer, listRegions } from "@lib/data"
import { notFound } from "next/navigation"
import { FavoriteShowsList } from "@modules/411/components/favorite-shows/FavoriteShows"

export const metadata: Metadata = {
  title: "Favorite shows",
  description: "Listen to your saved shows.",
}

export default async function FavoriteShows() {
  const customer = await getCustomer()

  if (!customer) {
    notFound()
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Favorite Shows</h1>
        <p className="text-base-regular">
          Listen to your saved shows. You can favorite shows by clicking the
          save icon on the show page.
        </p>
        <FavoriteShowsList customer={customer} />
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className="w-full h-px bg-gray-200" />
}
