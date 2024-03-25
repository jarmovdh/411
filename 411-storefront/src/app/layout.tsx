import { Metadata } from "next"
import "styles/globals.css"
import Providers from "./providers"
import Nav from "@modules/layout/templates/nav"
import { Suspense } from "react"
import Loading from "./loading"
import GlobalPlayer from "@modules/411/components/global-player/GlobalPlayer"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <Providers>
          <GlobalPlayer />
          <Suspense fallback={<Loading />}>
            <Nav />{" "}
            <main className="relative bg-[var(--theme-background)]">
              {props.children}
            </main>
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}
