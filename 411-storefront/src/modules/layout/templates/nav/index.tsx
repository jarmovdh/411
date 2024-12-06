import { Suspense } from "react"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import ThemeSwitcher from "@modules/411/components/theme-switcher/ThemeSwitcher"
import LogoIcon from "../../../../../public/assets/icons/LogoIcon"
import Link from "next/link"
import ProfileIcon from "../../../../../public/assets/icons/ProfileIcon"
import CartIcon from "../../../../../public/assets/icons/CartIcon"
import SearchBar from "@modules/411/components/searchbar/SearchBar"
import DropdownButton from "@modules/411/components/menu-button/MenuButton"

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)

  return (
    <div className="sticky top-[-1px] inset-x-0 z-50 group">
      <header className="relative h-14 sm:h-16 mx-auto border-b duration-200 border-b-[var(--theme-color)] bg-[var(--theme-background)] z-30">
        <nav className="content-container txt-xsmall-plus text-[var(--colorsubtle)] flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <Link href="/">
              <LogoIcon className="h-8 md:h-11" />
            </Link>
          </div>

          <div className="flex items-center gap-x-3 h-full flex-1 basis-0 justify-end">
            <SearchBar placeholder="Search for music.." />

            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="text-[var(--theme-color)]"
                href="/listen"
              >
                LISTEN
              </LocalizedClientLink>
              <LocalizedClientLink
                className="text-[var(--theme-color)]"
                href="/news"
              >
                READ
              </LocalizedClientLink>
              <LocalizedClientLink
                className="text-[var(--theme-color)]"
                href="/store"
              >
                SHOP
              </LocalizedClientLink>
            </div>
            <div className="flex text-[var(--theme-color)] z-40">
              <DropdownButton regions={regions} />
            </div>
            <ThemeSwitcher />

            <LocalizedClientLink
              className="hover:[var(--theme-color)]"
              href="/account"
            >
              <ProfileIcon className="h-5 md:h-6" />
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:[var(--theme-color)] flex gap-2"
                  href="/cart"
                >
                  <CartIcon className="h-5 md:h-6" />
                  (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
