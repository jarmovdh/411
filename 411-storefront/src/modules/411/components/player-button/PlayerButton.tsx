"use client"

import React, { useState } from "react"

import { ShowProps } from "../show/Show"
import { usePlayerContext } from "@lib/context/player-context"
import PauseIcon from "../../../../../public/assets/icons/PauseIcon"
import PlayIcon from "../../../../../public/assets/icons/PlayIcon"

type PlayerButtonProps = {
  show: ShowProps
  onClick?: (isPlaying: boolean) => void
}

export const PlayerButton = ({ show, onClick }: PlayerButtonProps) => {
  const { isPlaying, setIsPlaying, setActivePlayer } = usePlayerContext()
  const [isLocalPlaying, setLocalPlaying] = useState(false)

  const togglePlayer = () => {
    if (!isPlaying) {
      setActivePlayer({ ...show, slug: show.slug.current })
    } else {
      setActivePlayer(null)
    }

    setIsPlaying(!isPlaying)
    setLocalPlaying(!isLocalPlaying)
    if (onClick) onClick(!isPlaying || !isLocalPlaying)
  }

  return (
    <button type="button" onClick={togglePlayer}>
      {isPlaying || isLocalPlaying ? (
        <PauseIcon className="h-10 md:h-12" />
      ) : (
        <PlayIcon className="h-10 md:h-12" />
      )}
    </button>
  )
}
