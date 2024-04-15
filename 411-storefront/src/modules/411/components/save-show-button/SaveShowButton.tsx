import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import BookmarkFill from "../../../../../public/assets/icons/BookmarkFill"
import BookmarkLine from "../../../../../public/assets/icons/BookmarkLine"
import { Show } from "../show/Show"
import {
  addCustomerShows,
  deleteCustomerShowById,
  getCustomersShows,
} from "@modules/account/actions"

interface Show {
  imageUrl: string
  _id: string
  cloudUrl: string
  excerpt: string
  title: string
}

interface ShowProps {
  show: Show
  initialIsBookmarked: boolean
  customer: {
    id: string
    first_name: string
    metadata: { shows?: string[] }
  } | null
  shows?: Show[]
}

export default function SaveShowButton({
  show,
  initialIsBookmarked,
  customer,
}: ShowProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked)
  const router = useRouter()

  useEffect(() => {
    const checkIsShowBookmarked = async () => {
      if (customer && customer.metadata && customer.metadata.shows) {
        const isShowBookmarked = await getCustomersShows(customer, show._id)
        setIsBookmarked(isShowBookmarked)
      }
    }
    checkIsShowBookmarked()
  }, [customer, show._id])

  const handleAddToFavorites = async () => {
    if (!customer) {
      router.push("/account")
      return
    }

    if (!isBookmarked) {
      const formData = new FormData()
      formData.append("imageUrl", show.imageUrl)
      formData.append("_id", show._id)
      formData.append("cloudUrl", show.cloudUrl)
      formData.append("excerpt", show.excerpt)
      formData.append("title", show.title)
      formData.append("isBookmarked", "true")

      const result = await addCustomerShows({}, formData)
      if (result.success) {
        setIsBookmarked(true)
        if (customer && customer.metadata && customer.metadata.shows) {
          customer.metadata.shows.push({ _id: show._id })
        }
      } else {
        console.error("Failed to add favorite show:", result.error)
      }
    } else {
      const result = await deleteCustomerShowById({}, show._id)
      if (result.success) {
        setIsBookmarked(false)
        if (customer && customer.metadata && customer.metadata.shows) {
          customer.metadata.shows = customer.metadata.shows.filter(
            (showObj) => showObj._id !== show._id
          )
        }
      } else {
        console.error("Failed to delete favorite show:", result.error)
      }
    }
  }
  return (
    <div>
      <button
        className="bg-transparent border-none cursor-pointer"
        title={
          isBookmarked
            ? "Remove show from your favorites"
            : "Add show to your favorites"
        }
        onClick={handleAddToFavorites}
      >
        {isBookmarked ? (
          <BookmarkFill className="h-4 md:h-5" />
        ) : (
          <BookmarkLine className="h-4 md:h-5" />
        )}
      </button>
    </div>
  )
}
