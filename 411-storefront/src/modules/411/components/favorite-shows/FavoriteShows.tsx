import { Customer } from "@medusajs/medusa"
import Image from "next/image"
import show from "../../../../../sanity/schemas/show"

type FavoriteShowsProps = {
  customer: Omit<Customer, "password_hash">
}

export const FavoriteShowsList: React.FC<FavoriteShowsProps> = ({
  customer,
}) => {
  const showTitle = customer?.metadata?.show?.title || ""
  const imageUrl = customer?.metadata?.show?.imageUrl || ""

  return (
    <div className="w-full">
      <span>Hello {customer?.email}</span>
      <div className="grid grid-cols-3 lg:grid-cols-2 gap-4 flex-1 mt-4">
        <Image
          alt={showTitle}
          src={imageUrl}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full object-cover rounded-base"
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABjElEQVRIS+2Uz0oDQRSGz9"
        />
      </div>
    </div>
  )
}
