"use client"

import { Region } from "@medusajs/medusa"
import { useState } from "react"
import MenuIcon from "../../../../../public/assets/icons/MenuIcon"
import { DropdownMenu, useToggleState, clx } from "@medusajs/ui"
import { ArrowRightMini, XMark } from "@medusajs/icons"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import InstagramIcon from "../../../../../public/assets/icons/InstagramIcon"
import SpotifyIcon from "../../../../../public/assets/icons/SpotifyIcon"
import SoundCloudIcon from "../../../../../public/assets/icons/SoundCloudIcon"
import Xicon from "../../../../../public/assets/icons/Xicon"
import NewsLetterIcon from "../../../../../public/assets/icons/NewsLetterIcon"
import CountrySelect from "@modules/layout/components/country-select"

const SideMenuItems = {
  Listen: "/listen",
  Read: "/news",
  Shop: "/store",
  Account: "/account",
  About: "/about",
  Cart: "/cart",
}

const DropdownButton = ({ regions }: { regions: Region[] | null }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleState = useToggleState()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger className="flex items-center justify-center">
          <MenuIcon className="h-5 md:h-6" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="flex flex-col w-[350px] h-[600px] mt-4 z-50 bg-[var(--theme-background)] border border-[var(--theme-color)] p-4">
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
          <div className="flex flex-col justify-between flex-grow">
            <div className="border-t 1px flex gap-4 pt-2">
              <InstagramIcon className="h-4" />
              <Xicon className="h-4" />
              <NewsLetterIcon className="h-4" />
              <SpotifyIcon className="h-4" />
              <SoundCloudIcon className="h-4" />
            </div>
            <div className="flex flex-col gap-y-6">
              <div
                className="flex justify-between"
                onMouseEnter={toggleState.open}
                onMouseLeave={toggleState.close}
              >
                {regions && (
                  <CountrySelect toggleState={toggleState} regions={regions} />
                )}
                <ArrowRightMini
                  className={clx(
                    "transition-transform duration-150",
                    toggleState.state ? "-rotate-90" : ""
                  )}
                />
              </div>
            </div>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu>
    </>
  )
}

export default DropdownButton
