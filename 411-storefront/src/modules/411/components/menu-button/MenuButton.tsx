"use client"

import { Region } from "@medusajs/medusa"
import { useState } from "react"
import MenuIcon from "../../../../../public/assets/icons/MenuIcon"
import { DropdownMenu } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import InstagramIcon from "../../../../../public/assets/icons/InstagramIcon"
import SpotifyIcon from "../../../../../public/assets/icons/SpotifyIcon"
import SoundCloudIcon from "../../../../../public/assets/icons/SoundCloudIcon"
import Xicon from "../../../../../public/assets/icons/Xicon"
import NewsLetterIcon from "../../../../../public/assets/icons/NewsLetterIcon"

const SideMenuItems = {
  Listen: "/listen",
  Read: "/news",
  Shop: "/store",
  Account: "/account",
  About: "/about",
  Cart: "/cart",
}

const DropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger className="flex items-center justify-center">
          <MenuIcon className="h-5 md:h-6" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-[350px] h-[500px] mt-4 z-50 bg-[var(--theme-background)] border border-[var(--theme-color)] p-4">
          {Object.entries(SideMenuItems).map(([name, href]) => {
            return (
              <li
                key={name}
                className="flex text-[var(--theme-color)] bg-[var(--theme-background)] p-y-0"
              >
                <LocalizedClientLink
                  href={href}
                  className="text-md sm:text-lg leading-10 "
                >
                  {name}
                </LocalizedClientLink>
              </li>
            )
          })}
          <div className="border-t 1px flex gap-4 pt-2">
            <InstagramIcon className="h-4" />
            <Xicon className="h-4" />
            <NewsLetterIcon className="h-4" />
            <SpotifyIcon className="h-4" />
            <SoundCloudIcon className="h-4" />
          </div>
        </DropdownMenu.Content>
      </DropdownMenu>
    </>
  )
}

export default DropdownButton
