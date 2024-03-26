import NewsItemPageContent from "@modules/411/components/news-item-page-content/NewsItemPageContent"
import { getNewsItemBySlug } from "../../../../../../sanity/lib/queries"

export default async function NewsItemPage({
  params,
}: {
  params: { slug: string }
}) {
  const newsItem = await getNewsItemBySlug(params?.slug)

  return <NewsItemPageContent newsItem={newsItem} />
}
