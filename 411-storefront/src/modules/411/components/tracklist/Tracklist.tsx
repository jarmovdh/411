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
      <div className="">
        <h1 className="mb-3">Tracklist</h1>
        {tracklist && tracklist.length === 0 ? (
          <h3>No Tracklist Provided</h3>
        ) : (
          <div className="px-4">
            <ol className="text-xs px-4 list-decimal">
              {tracklist?.map((track) => (
                <li
                  key={track._key}
                  className="text-xs border-b border-gray-300 border-solid pb-1"
                >
                  <strong>{track.artist}</strong> - {track.title}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </>
  )
}

export default Tracklist
