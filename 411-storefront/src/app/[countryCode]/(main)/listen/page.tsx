/* eslint-disable import/no-unresolved */

"use client"

import { useEffect, useState } from "react"
import { getShows } from "../../../../../sanity/lib/queries"
import { ShowType } from "../../../../../sanity/schemas/types"
import { Show } from "@modules/411/components/show/Show"

const Listen = () => {
  const [shows, setShows] = useState<ShowType[]>([])

  useEffect(() => {
    async function fetchShows() {
      try {
        const data = await getShows()
        setShows(data)
      } catch (error) {
        console.error("Error fetching shows:", error)
      }
    }

    fetchShows()
  }, [])

  return (
    <>
      <div className="content-container mt-1">
        <p>The latest additions to the 411 Radio archive, updated weekly.</p>
        <div className="grid grid-cols-2 gap-1 m-1 place-items-center sm:gap-1 sm:m-0 md:grid-cols-2 lg:grid-cols-3">
          {shows.map((show) => (
            <Show
              artist={show.artist}
              key={show._id}
              date={show.date}
              excerpt={show.excerpt}
              title={show.title}
              slug={show.slug.current}
              tags={show.tags}
              imageUrl={show.imageUrl}
              cloudUrl={show.cloudUrl}
              id={show._id}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Listen
