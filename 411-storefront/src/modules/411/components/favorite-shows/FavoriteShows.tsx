import { Customer } from "@medusajs/medusa"
import Image from "next/image"

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
  }[]

  return (
    <div className="w-full">
      <div className="grid grid-flow-col gap-4 mt-4">
        {shows.length === 0 ? (
          <p>No shows added to your favorites yet!</p>
        ) : (
          shows.map(
            (show: {
              _id: string | number | null | undefined
              title: string
              imageUrl: string
            }) => (
              <div key={show._id} className="h-[150px] w-[150px]">
                <Image
                  alt={show.title}
                  src={show.imageUrl}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-full object-cover rounded-base"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABjElEQVRIS+2Uz0oDQRSGz9"
                />
                <h1>{show.title}</h1>
              </div>
            )
          )
        )}
      </div>
    </div>
  )
}
