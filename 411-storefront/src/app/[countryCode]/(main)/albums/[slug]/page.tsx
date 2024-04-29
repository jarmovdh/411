import AlbumPageContent from "@modules/411/components/album-page-content/AlbumPageContent"
import { getAlbumBySlug } from "../../../../../../sanity/lib/queries"

export default async function AlbumPage({
  params,
}: {
  params: { slug: string }
}) {
  const album = await getAlbumBySlug(params?.slug)

  return (
    <>
      <AlbumPageContent album={album} />
    </>
  )
}
