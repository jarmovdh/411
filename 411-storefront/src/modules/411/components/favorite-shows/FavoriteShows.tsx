"use client"
import { Customer } from "@medusajs/medusa"
import Image from "next/image"
import { useRouter } from "next/navigation"

type FavoriteShowsProps = {
  customer: Omit<Customer, "password_hash">
}

export const FavoriteShowsList: React.FC<FavoriteShowsProps> = ({
  customer,
}) => {
  const shows = (customer?.metadata?.shows || []) as {
    _id: string | number | null | undefined
    title: string
    imageUrl: string
    slug: { current: string }
  }[]

  const router = useRouter()

  const handleClick = (slug: string | undefined) => {
    console.log("Clicked on slug:", slug)
    if (slug) {
      router.push(`/listen/${slug}`)
    }
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
              imageUrl: string
              slug: { current: string }
            }) => (
              <div key={show._id} className="grid grid-cols-4 gap-4">
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
                  onClick={() => handleClick(show.slug.current)}
                />
                <div className="col-span-2 md:col-span-3">
                  <h1>{show.title}</h1>
                  <p>{show.excerpt}</p>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  )
}
