"use client"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import LightIcon from "../../../../../public/assets/icons/LightIcon"
import DarkIcon from "../../../../../public/assets/icons/DarkIcon"

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div>
      {theme === "dark" ? (
        <button onClick={() => setTheme("light")}>
          <LightIcon height={24} />
        </button>
      ) : (
        <button onClick={() => setTheme("dark")}>
          <DarkIcon height={24} />
        </button>
      )}
    </div>
  )
}

export default ThemeSwitcher
