"use client;"

import { Show } from "../show/Show"

const show = [
  {
    id: 1,
    title: "Show 1",
    artist: "Artist 1",
    date: "2022-01-01",
    excerpt: "Lorem ipsum dolor sit amet",
    tags: ["tag1", "tag2"],
    thumbnail: "thumbnail1.jpg",
    large: "large1.jpg",
  },
  {
    id: 2,
    title: "Show 2",
    artist: "Artist 2",
    date: "2022-02-02",
    excerpt: "Consectetur adipiscing elit",
    tags: ["tag3", "tag4"],
    thumbnail: "thumbnail2.jpg",
    large: "large2.jpg",
  },
  // Add more show objects as needed
]

export const LatestShows = () => {
  return (
    <div className="grid grid-cols-2 gap-1 mb-1 md:grid-cols-2 md:gap-1 lg:grid-cols-3">
      {show.map((show) => (
        <Show
          key={show.id}
          id={show.id}
          title={show.title}
          artist={show.artist}
          date={show.date}
          excerpt={show.excerpt}
          tags={show.tags}
          thumbnail={show.thumbnail}
          large={show.large}
        />
      ))}
    </div>
  )
}
