/* eslint-disable import/no-unresolved */

"use client"

import React, { useEffect, useState } from "react"
import { getNewsItems } from "../../../../../sanity/lib/queries"
import { NewsItemType } from "../../../../../sanity/schemas/types"
import { NewsItem } from "@modules/411/components/newsitem/NewsItem"

const News = () => {
  const [newsItems, setNewsItems] = useState<NewsItemType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      const data = await getNewsItems()
      setNewsItems(data)
      setLoading(false)
    }

    fetchNews()
  }, [])

  return (
    <>
      <div className="content-container mt-1">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:m-0 2xl:grid-cols-2">
          {newsItems.map((news) => (
            <NewsItem
              key={news._id}
              date={news.date}
              title={news.title}
              slug={news.slug.current}
              imageUrl={news.imageUrl}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default News
