import { AlbumListItem } from "@modules/411/components/album-list-item/AlbumListItem"
import { getAlbums } from "../../../../../sanity/lib/queries"
import { AlbumType } from "../../../../../sanity/schemas/types"

export default async function Albums() {
  const albums = await getAlbums()

  const groupedAlbums: { [key: string]: AlbumType[] } = albums.reduce(
    (acc: { [key: string]: AlbumType[] }, album: AlbumType) => {
      const startingLetter = album.artist.charAt(0).toUpperCase()
      acc[startingLetter] = acc[startingLetter] || []
      acc[startingLetter].push(album)
      return acc
    },
    {}
  )

  const sortedLetters = Object.keys(groupedAlbums).sort()

  return (
    <div className="content-container mb-12">
      <h1>Albums</h1>
      {sortedLetters.map((letter) => (
        <div key={letter}>
          <h2>{letter}</h2>
          <div className="flex flex-row flex-wrap w-[500px] sm:w-[200px] -mx-2 overflow-hidden">
            {groupedAlbums[letter]
              .sort((a, b) => a.artist.localeCompare(b.artist))
              .map((album) => (
                <div className="px-2 w-full sm:w-auto" key={album._id}>
                  <AlbumListItem
                    coverImageUrl={album.coverImageUrl}
                    alt={album.alt}
                    title={album.title}
                    artist={album.artist}
                    releaseDate={album.releaseDate}
                    slug={album.slug.current}
                  />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
