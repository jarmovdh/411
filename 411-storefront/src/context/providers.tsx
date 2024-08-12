"use client"
import { PlayerProvider } from "@lib/context/player-context"
import { MedusaProvider } from "medusa-react"
import { ThemeProvider } from "next-themes"
import { QueryClient } from "@tanstack/react-query"

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()

  return (
    <>
      <MedusaProvider
        baseUrl="http://localhost:9000"
        queryClientProviderProps={{ client: queryClient }}
      >
        <ThemeProvider>
          <PlayerProvider>{children}</PlayerProvider>
        </ThemeProvider>
      </MedusaProvider>
    </>
  )
}
