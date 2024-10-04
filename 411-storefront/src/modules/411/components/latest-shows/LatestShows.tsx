import { Show } from "../show/Show"
import { getShows } from "../../../../../sanity/lib/queries"
import { ShowType } from "../../../../../sanity/schemas/types"

export default async function LatestShows() {
  const shows = await getShows()

  return (
    <div className="grid grid-cols-2 gap-1 mb-1 md:grid-cols-2 md:gap-1 lg:grid-cols-3 content-container mt-1">
      {shows.map((show: ShowType) => (
        <Show
          artist={show.artist}
          excerpt={show.excerpt}
          key={show._id}
          date={show.date}
          title={show.title}
          slug={show.slug.current}
          tags={show.tags}
          imageUrl={show.imageUrl}
          cloudUrl={show.cloudUrl}
          id={show._id}
        />
      ))}
    </div>
  )
}
