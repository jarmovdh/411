/* eslint-disable no-restricted-globals */
/* eslint-disable react/button-has-type */

"use client"

import React, { useState, useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import ReactPlayer from "react-player"
import Tracklist from "../tracklist/TrackList"

import { usePlayerContext } from "@lib/context/player-context"
import VolumeMuteIcon from "../../../../../public/assets/icons/VolumeMuteIcon"
import VolumeDownIcon from "../../../../../public/assets/icons/VolumeDownIcon"
import VolumeUpIcon from "../../../../../public/assets/icons/VolumeUpIcon"
import PauseIcon from "../../../../../public/assets/icons/PauseIcon"
import PlayIcon from "../../../../../public/assets/icons/PlayIcon"
import MenuHamburger from "../../../../../public/assets/icons/MenuHamburger"
import CloseIcon from "../../../../../public/assets/icons/CloseIcon"
import { motion } from "framer-motion"
import SoundCloudIcon from "../../../../../public/assets/icons/SoundCloudIcon"

interface PlayerProps {
  show: {
    artist: string
    cloudUrl: string
    date: string
    id: number
    imageUrl: string
    title: string
    slug: string
    tracklist?: {
      _key: string
      artist: string
      title: string
    }[]
  }
  onClose: () => void
  isVisible?: boolean
}

const initialHeight = 90

export const Player = ({ show, onClose, isVisible }: PlayerProps) => {
  const {
    isPlaying,
    setIsPlaying,
    timeProgress,
    setTimeProgress,
    duration,
    setDuration,
    muteVolume,
    setMuteVolume,
    volume,
    setVolume,
  } = usePlayerContext()

  const [isExpanded, setIsExpanded] = useState(false)
  const [height, setHeight] = useState(initialHeight)

  const reactPlayerRef = useRef(null)
  const progressBarRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleClick = () => {
    router.push(`/listen/${show.slug}`)
  }

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded)
    setHeight(isExpanded ? initialHeight : 300)
  }

  const handleDuration = (dur: number) => {
    setDuration(dur)
    if (progressBarRef.current) {
      progressBarRef.current.max = dur.toString()
    }
  }

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (reactPlayerRef.current) {
      const seekToFraction = parseFloat(event.target.value) / duration
      ;(reactPlayerRef.current as any).seekTo(seekToFraction)
      setTimeProgress(parseFloat(event.target.value))
    }
  }
  const handleProgress = (progress: {
    played: number
    playedSeconds: number
  }) => {
    const currentTime = progress.playedSeconds
    setTimeProgress(currentTime)
  }

  const togglePlayer = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying)
  }

  const playerVariants = {
    hidden: { y: "100%", opacity: 1 },
    visible: { y: "0", opacity: 1 },
  }

  const formatTime = (time: number): string => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60)
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
      const seconds = Math.floor(time % 60)
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
      return `${formatMinutes}:${formatSeconds}`
    }
    return "00:00"
  }

  const volumeIcon = useMemo(() => {
    if (muteVolume || volume < 1) {
      return <VolumeMuteIcon height={20} />
    }
    if (volume < 40) {
      return <VolumeDownIcon height={20} />
    }
    return <VolumeUpIcon height={20} />
  }, [muteVolume, volume])

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={playerVariants}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="z-50 rounded-[20px] mb-1 border border-ui-border-base bg-[var(--theme-background)] shadow-lg w-full lg:w-1/2 mx-auto"
      style={{
        backgroundColor: "var(--theme-background)",
        height: `${isExpanded ? 300 : initialHeight}px`,
        position: "fixed",
        bottom: `${isExpanded ? "300px" : "90px"}`,
        left: 0,
        right: 0,
        transition: "bottom 0.5s ease-in-out, height 0.5s ease-in-out",
        boxShadow:
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className="flex flex-row border border-transparent">
        <div
          className="cursor-pointer h-[85px] object-cover p-[5px] w-[150px] sm:w-[150px]"
          onClick={handleClick}
        >
          <Image
            alt={show.title}
            src={show.imageUrl}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-cover rounded-[15px]"
          />
        </div>
        <div className="flex flex-col pt-1 justify-evenly w-full">
          <div className="flex items-center gap-2.5">
            <button
              className="border-none cursor-pointer p-0 bg-transparent"
              onClick={togglePlayer}
            >
              {isPlaying ? <PauseIcon height={25} /> : <PlayIcon height={25} />}
            </button>

            <>
              {!isPlaying ? (
                <div className="flex flex-col justify-center w-full">
                  <h3
                    className="cursor-pointer font-normal text-sm m-0 uppercase text-[var(--textColor)]"
                    onClick={handleClick}
                  >
                    {show.title}
                    {" - "}
                    {show.artist}
                  </h3>

                  <h4 className="font-normal text-xs text-[var(--textColor)]">
                    {new Date(show.date)
                      .toLocaleDateString(undefined, {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })
                      .replace(/-/g, ".")}
                  </h4>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2 w-full">
                  <span className="text-[11px] font-nums text-[var(--textColor)]">
                    {formatTime(timeProgress)}
                  </span>
                  <input
                    className="range-input"
                    type="range"
                    ref={progressBarRef}
                    max={duration.toString()}
                    value={timeProgress.toString()}
                    onChange={handleProgressChange}
                  />
                  <span className="text-[11px] font-nums text-[var(--textColor)]">
                    {formatTime(duration)}
                  </span>
                </div>
              )}
            </>
            <button className="border-none cursor-pointer p-0 bg-transparent">
              <SoundCloudIcon className="h-6 md:h-6" />
            </button>
            <button
              className="border-none cursor-pointer p-0 bg-transparent"
              onClick={toggleExpansion}
            >
              <MenuHamburger height={20} />
            </button>
            <button
              className="border-none cursor-pointer p-0 bg-transparent"
              type="button"
              onClick={onClose}
            >
              <CloseIcon height={20} />
            </button>
            <ReactPlayer
              ref={reactPlayerRef}
              url={show.cloudUrl}
              playing={isPlaying}
              width="0"
              height="0"
              volume={muteVolume ? 0 : volume / 100}
              onDuration={handleDuration}
              onProgress={handleProgress}
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>
          <div className="hidden lg:flex items-center">
            {" "}
            <button
              className="bg-transparent border-none cursor-pointer w-9"
              aria-label="control volume"
              onClick={() => setMuteVolume((prevMuteVolume) => !prevMuteVolume)}
            >
              {volumeIcon}
            </button>
            <input
              type="range"
              className="volume-slider"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value, 10))}
            />
          </div>
        </div>
        {/* TODO add tracklists */}
        {/* <Tracklist tracklist={show.tracklist} /> */}
      </div>
    </motion.div>
  )
}
