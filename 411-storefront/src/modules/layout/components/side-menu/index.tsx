"use client"

import { Popover, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Region } from "@medusajs/medusa"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment, useState } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { motion } from "framer-motion"
import MenuIcon from "../../../../../public/assets/icons/MenuIcon"

const SideMenuItems = {
  Home: "/",
  Listen: "/listen",
  Read: "/news",
  Shop: "/store",
  Account: "/account",
  About: "/about",
  Cart: "/cart",
}

const SideMenu = ({ regions }: { regions: Region[] | null }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none "
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <MenuIcon height={24} />
                </Popover.Button>
              </div>
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel
                  static
                  className="block absolute top-[calc(100%+1px)] bg-[var(--theme-background)] right-0 border-x border-b border-[var(--theme-color)] w-full sm:w-[420px] [var(--theme-color)]"
                >
                  <div className="flex flex-col h-full bg-[var(--theme-background)] justify-between p-6">
                    <div className="flex justify-end" id="xmark">
                      <button
                        onClick={() => {
                          close()
                          setIsOpen(false)
                        }}
                      >
                        <XMark />
                      </button>
                    </div>
                    <ul className="flex flex-col gap-6 items-start justify-start">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="text-3xl leading-10 hover:text-ui-fg-disabled"
                              onClick={() => {
                                close()
                                setIsOpen(false)
                              }}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>
                    <div className="flex flex-col gap-y-6">
                      <div
                        className="flex justify-between"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <Text className="flex justify-between txt-compact-small">
                        © {new Date().getFullYear()} 411 Radio. All rights
                        reserved.
                      </Text>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
