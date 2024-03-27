import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import { Metadata } from "next"
import Link from "next/link"
import LogoIcon from "../../public/assets/icons/LogoIcon"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <LogoIcon className="w-12 h-12" />
      <h1 className="text-2xl-semi text-[var(--theme-color)]">
        Page not found
      </h1>
      <p className="text-small-regular text-[var(--theme-color)]">
        The page you tried to access does not exist.
      </p>
      <Link className="flex gap-x-1 items-center group" href="/">
        <Text className="text-[var(--theme-color)]">Go to frontpage</Text>
        <ArrowUpRightMini
          className="group-hover:rotate-45 ease-in-out duration-150"
          color="var(--logo-fill-color)"
        />
      </Link>
    </div>
  )
}
