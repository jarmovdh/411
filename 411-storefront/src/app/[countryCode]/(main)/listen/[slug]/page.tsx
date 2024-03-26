import React from "react"
import { getShowBySlug } from "../../../../../../sanity/lib/queries"
import ShowPageContent from "@modules/411/components/show-page-content/ShowPageContent"

export default async function ShowPage({
  params,
}: {
  params: { slug: string }
}) {
  const show = await getShowBySlug(params?.slug)

  return (
    <>
      <ShowPageContent show={show} />
    </>
  )
}
