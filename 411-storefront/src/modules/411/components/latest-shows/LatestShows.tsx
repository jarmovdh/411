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
  )
}
