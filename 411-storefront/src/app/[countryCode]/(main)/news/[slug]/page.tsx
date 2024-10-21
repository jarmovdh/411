import NewsItemPageContent from "@modules/411/components/news-item-page-content/NewsItemPageContent"
import { getNewsItemBySlug } from "../../../../../../sanity/lib/queries"
import { Metadata, ResolvingMetadata } from "next"

type NewsItemPageParams = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: NewsItemPageParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const newsItem = await getNewsItemBySlug(params?.slug)

  const previousImages = (await parent).openGraph?.images || []

  const baseUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:8000"

  return {
    title: newsItem.title,
    description: newsItem.excerpt,
    openGraph: {
      title: newsItem.title,
      description: newsItem.excerpt,
      images: [newsItem.imageUrl, ...previousImages],
      url: `${baseUrl}/news/${newsItem.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: newsItem.title,
      description: newsItem.excerpt,
      images: [newsItem.imageUrl],
    },
  }
}

export default async function NewsItemPage({ params }: NewsItemPageParams) {
  const newsItem = await getNewsItemBySlug(params.slug)
  return <NewsItemPageContent newsItem={newsItem} />
}
