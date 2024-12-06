import React from "react"
import { getShowBySlug } from "../../../../../../sanity/lib/queries"
import ShowPageContent from "@modules/411/components/show-page-content/ShowPageContent"
import { getCustomer } from "@lib/data"
import { Metadata, ResolvingMetadata } from "next"

type ShowPageParams = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: ShowPageParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch data for the show
  const show = await getShowBySlug(params.slug)

  // Optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  const baseUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:8000"

  return {
    title: `${show.title} - ${show.artist}`,
    description: show.excerpt,
    openGraph: {
      title: `${show.title} - ${show.artist}`,
      description: show.excerpt,
      images: [show.imageUrl, ...previousImages],
      url: `${baseUrl}/listen/${show.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${show.title} - ${show.artist}`,
      description: show.excerpt,
      images: [show.imageUrl],
    },
  }
}

export default async function ShowPage({ params }: ShowPageParams) {
  const show = await getShowBySlug(params.slug)
  const customer = await getCustomer()

  return (
    <>
      <ShowPageContent show={show} customer={customer || null} />
    </>
  )
}
