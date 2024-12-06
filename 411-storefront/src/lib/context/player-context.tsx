"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface ShowProps {
  id: number
  title: string
  date: string
  slug: string
  imageUrl: string
  cloudUrl: string
  tags: string[]
  artist: string
  excerpt: string
  isFeatured?: boolean
  tracklist?: { _key: string; _type: string; artist: string; title: string }[]
}

interface PlayerProviderProps {
  children?: React.ReactNode
}

type PlayerContextProps = {
  activePlayer: ShowProps | null
  setActivePlayer: React.Dispatch<React.SetStateAction<ShowProps | null>>
  handlePlayerClose: () => void
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  timeProgress: number
  setTimeProgress: React.Dispatch<React.SetStateAction<number>>
  duration: number
  setDuration: React.Dispatch<React.SetStateAction<number>>
  muteVolume: boolean
  setMuteVolume: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  volume: number
  setVolume: React.Dispatch<React.SetStateAction<number>>
  setProgressBarValue: React.Dispatch<React.SetStateAction<number>>
}

const PlayerContext = createContext<PlayerContextProps>({
  activePlayer: null,
  setActivePlayer: () => {},
  handlePlayerClose: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
  timeProgress: 0,
  setTimeProgress: () => {},
  duration: 0,
  setDuration: () => {},
  muteVolume: false,
  setMuteVolume: () => {},
  isLoading: false,
  setIsLoading: () => {},
  volume: 0,
  setVolume: () => {},
  setProgressBarValue: () => {},
})

export const usePlayerContext = () => useContext(PlayerContext)

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [activePlayer, setActivePlayer] = useState<ShowProps | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeProgress, setTimeProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [muteVolume, setMuteVolume] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [volume, setVolume] = useState(60)
  const [, setProgressBarValue] = useState(0)

  const handlePlayerClose = () => {
    setActivePlayer(null)
  }

  useEffect(() => {
    setTimeProgress(0)
    setDuration(0)
  }, [activePlayer])

  return (
    <PlayerContext.Provider
      value={{
        activePlayer,
        setActivePlayer,
        isPlaying,
        setIsPlaying,
        timeProgress,
        setTimeProgress,
        duration,
        setDuration,
        muteVolume,
        setMuteVolume,
        isLoading,
        setIsLoading,
        volume,
        setVolume,
        handlePlayerClose,
        setProgressBarValue,
      }}
    >
      {" "}
      {children}
    </PlayerContext.Provider>
  )
}
