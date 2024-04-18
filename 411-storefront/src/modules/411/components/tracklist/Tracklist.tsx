import React from "react"

interface TracklistProps {
  tracklist?: {
    _key: string
    artist: string
    title: string
  }[]
}

const Tracklist = ({ tracklist }: TracklistProps) => {
  return (
    <>
      <div className="p-0">
        <h1>Tracklist</h1>
        {tracklist && tracklist.length === 0 ? (
          <h3>No Tracklist Provided</h3>
        ) : (
          <ul className="text-sm">
            {tracklist?.map((track) => (
              <li
                key={track._key}
                className="text-sm border-b border-gray-300 border-solid"
              >
                <strong>{track.artist}</strong> - {track.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default Tracklist
