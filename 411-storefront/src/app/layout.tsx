import { Metadata } from "next"
import "styles/globals.css"
import Providers from "../context/providers"
import Nav from "@modules/layout/templates/nav"
import { Suspense } from "react"
import Loading from "./loading"
import GlobalPlayer from "@modules/411/components/global-player/GlobalPlayer"
import Loader from "@modules/411/components/loader/Loader"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <Providers>
          <Nav />
          <Suspense fallback={<Loading />}>
            <main className="relative h-lvh bg-[var(--theme-background)]">
              {props.children}
              <GlobalPlayer />
            </main>
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}
