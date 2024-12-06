/* eslint-disable import/no-unresolved */

import { getShows } from "../../../../../sanity/lib/queries"
import { Show } from "@modules/411/components/show/Show"
import { ShowType } from "../../../../../sanity/schemas/types"

export default async function Listen() {
  const shows = await getShows()

  return (
    <>
      <div className="content-container mt-1 pb-24">
        <p className="py-8">
          The latest additions to the 411 Radio archive, updated weekly.
        </p>
        <div className="grid grid-cols-1 gap-1 m-1 place-items-center sm:gap-1 sm:m-0 md:grid-cols-2 lg:grid-cols-3">
          {shows.map((show: ShowType) => (
            <Show
              artist={show.artist}
              cloudUrl={show.cloudUrl}
              date={show.date}
              excerpt={show.excerpt}
              id={show._id}
              imageUrl={show.imageUrl}
              key={show._id}
              slug={show.slug.current}
              tags={show.tags}
              title={show.title}
            />
          ))}
        </div>
      </div>
    </>
  )
}
