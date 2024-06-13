"use client"
import { Customer } from "@medusajs/medusa"
import Image from "next/image"
import { useRouter } from "next/navigation"
import BinIcon from "../../../../../public/assets/icons/BinIcon"
import { deleteCustomerShowById } from "@modules/account/actions"

type FavoriteShowsProps = {
  customer: Omit<Customer, "password_hash">
}

type Show = {
  _id: string | number | null | undefined
  title: string
  artist: string
  imageUrl: string
  excerpt?: string
  slug: string
}

export const FavoriteShowsList: React.FC<FavoriteShowsProps> = ({
  customer,
}) => {
  const shows = (customer?.metadata?.shows || []) as Show[]

  const router = useRouter()

  const handleClick = (slug: string | undefined) => {
    console.log("Clicked on slug:", slug)
    if (slug) {
      router.push(`/listen/${slug}`)
    }
  }

  const handleDelete = async (showId: string | number | null | undefined) => {
    if (!showId) return
    await deleteCustomerShowById({}, showId.toString())
  }

  console.log("shows", shows)

  return (
    <div className="w-full">
      <div className="grid grid-flow-row gap-4 mt-4">
        {shows.length === 0 ? (
          <p>No shows added to your favorites yet!</p>
        ) : (
          shows.map(
            (show: {
              _id: string | number | null | undefined
              title: string
              excerpt?: string
              imageUrl: string
              artist: string
              slug: string
            }) => (
              <div key={show._id} className="grid  grid-cols-4 gap-4">
                <Image
                  alt={show.title}
                  src={show.imageUrl}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="col-span-2 md:col-span-1 w-full h-[200px] md:h-[150px] object-cover rounded-base cursor-pointer"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABjElEQVRIS+2Uz0oDQRSGz9"
                  onClick={() => handleClick(show.slug)}
                />
                <div className="grid place-content-between col-span-2 md:col-span-3">
                  <h1
                    className="font-bold"
                    onClick={() => handleClick(show.slug)}
                  >
                    {show.title} - {show.artist}
                  </h1>
                  <p className="line-clamp-3">{show.excerpt}</p>
                  <button onClick={() => handleDelete(show._id)}>
                    <BinIcon className="h-4 md:h-4" />
                  </button>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  )
}
