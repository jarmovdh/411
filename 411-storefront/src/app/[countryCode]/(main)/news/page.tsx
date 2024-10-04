/* eslint-disable import/no-unresolved */

import { getNewsItems } from "../../../../../sanity/lib/queries"
import { NewsItem } from "@modules/411/components/newsitem/NewsItem"

export default async function News() {
  const newsItems = await getNewsItems()

  return (
    <>
      <div className="content-container my-20 pb-24">
        <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:m-0 2xl:grid-cols-2">
          {newsItems.map(
            (news: {
              _id: string | number | null | undefined
              date: string
              title: string
              slug: { current: string }
              imageUrl: string
            }) => (
              <NewsItem
                key={news._id}
                date={news.date}
                title={news.title}
                slug={news.slug.current}
                imageUrl={news.imageUrl}
              />
            )
          )}
        </div>
      </div>
    </>
  )
}
