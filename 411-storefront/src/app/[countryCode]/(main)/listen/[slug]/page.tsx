import React from "react"
import { getShowBySlug } from "../../../../../../sanity/lib/queries"
import ShowPageContent from "@modules/411/components/show-page-content/ShowPageContent"
import { getCustomer } from "@lib/data"

export default async function ShowPage({
  params,
}: {
  params: { slug: string }
}) {
  const show = await getShowBySlug(params?.slug)
  const customer = await getCustomer()

  return (
    <>
      <ShowPageContent show={show} customer={customer || null} />
    </>
  )
}
