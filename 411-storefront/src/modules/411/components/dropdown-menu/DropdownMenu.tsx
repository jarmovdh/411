import { Region } from "@medusajs/medusa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text } from "@medusajs/ui"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { motion } from "framer-motion"
import CountrySelect from "@modules/layout/components/country-select"

const SideMenuItems = {
  Home: "/",
  Listen: "/listen",
  Read: "/news",
  Shop: "/store",
  Account: "/account",
  About: "/about",
  Cart: "/cart",
}

const DropdownMenu = ({ regions }: { regions: Region[] | null }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col bg-[var(--theme-background)] justify-between p-6 border border-[var(--theme-color)]"
    >
      <motion.ul className="flex flex-col gap-6 items-start justify-start">
        {Object.entries(SideMenuItems).map(([name, href]) => {
          return (
            <li key={name}>
              <LocalizedClientLink
                href={href}
                className="text-3xl leading-10 hover:text-ui-fg-disabled"
              >
                {name}
              </LocalizedClientLink>
            </li>
          )
        })}
      </motion.ul>
      <div className="flex flex-col gap-y-6">
        <Text className="flex justify-between txt-compact-small">
          © {new Date().getFullYear()} 411 Radio. All rights reserved.
        </Text>
      </div>
    </motion.div>
  )
}

export default DropdownMenu
