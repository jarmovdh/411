import React, { useEffect, useState } from "react"

import { FeaturedAlbum } from "../featured-album/FeaturedAlbum"
import { getAlbums } from "../../../../../sanity/lib/queries"
import { AlbumListItem } from "../album-list-item/AlbumListItem"

export default async function FeaturedAlbums() {
  const albums = await getAlbums()

  return (
    <>
      {albums.length > 0 && (
        <>
          <div className="">
            <FeaturedAlbum
              artist={albums[0].artist}
              alt={albums[0].alt}
              coverImageUrl={albums[0].coverImageUrl}
              title={albums[0].title}
              slug={albums[0].slug.current}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-1">
            {albums.slice(1, 3).map((album) => (
              <AlbumListItem
                key={album.slug.current}
                alt={album.alt}
                coverImageUrl={album.coverImageUrl}
                slug={album.slug.current}
              />
            ))}
          </div>
        </>
      )}
    </>
  )
}
