import { Metadata } from "next"

import { getCustomer, listRegions } from "@lib/data"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Favorite shows",
  description: "Listen to your saved shows.",
}

export default async function FavoriteShows() {
  const customer = await getCustomer()
  const regions = await listRegions()

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Favorite Shows</h1>
        <p className="text-base-regular">
          Listen to your saved shows. You can favorite shows by clicking the
          heart icon on the show page.
        </p>
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className="w-full h-px bg-gray-200" />
}
