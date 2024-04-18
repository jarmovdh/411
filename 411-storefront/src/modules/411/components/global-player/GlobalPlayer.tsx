"use client"

import React from "react"
import { usePlayerContext } from "@lib/context/player-context"
import { Player } from "../player/Player"

const GlobalPlayer = () => {
  const { activePlayer, setActivePlayer } = usePlayerContext()

  const handlePlayerClose = () => {
    setActivePlayer(null)
  }

  return (
    activePlayer && (
      <Player
        show={{
          ...activePlayer,
          tracklist: activePlayer.tracklist || [],
        }}
        onClose={handlePlayerClose}
      />
    )
  )
}

export default GlobalPlayer
