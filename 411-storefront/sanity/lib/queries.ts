import { groq } from "next-sanity"
import client from "./client"

export async function getAlbums() {
  return client.fetch(groq`
    *[_type == "album"] | order(date desc) {
      _id,
      title,
      slug,
      artist,
      "coverImageUrl": coverImage.asset->url,
      alt,
      releaseDate,
      spotifyUrl,
      appleMusicUrl,
      siteUrl,
      tracklist,
      excerpt,
      body,
      date,
    }
  `)
}

export async function getAlbumBySlug(slug: string) {
  return client.fetch(
    groq`
    *[_type == "album" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      artist,
      "coverImageUrl": coverImage.asset->url,
      alt,
      releaseDate,
      spotifyUrl,
      appleMusicUrl,
      siteUrl,
      tracklist,
      excerpt,
      body,
      date,
    }
  `,
    { slug }
  )
}

export async function getNewsItems() {
  return client.fetch(groq`
		*[_type == "newsitem"] | order(_createdAt desc) {
      _id,
			title,
			slug,
			date,
       "carouselImages": carouselImages[] {
        "imageSrc": image.asset->url, 
        alt
      },
			excerpt,
      "imageUrl": imageUrl.asset->url,
			alt,
			body
		}
	`)
}

export async function getNewsItemBySlug(slug: string) {
  return client.fetch(
    groq`
    *[_type == "newsitem" && slug.current == $slug][0] {
      _id,
      title,
      slug,
       "carouselImages": carouselImages[] {
        "imageSrc": image.asset->url, 
        alt
      },
      date,
      excerpt,
      "imageUrl": imageUrl.asset->url,
      alt,
      body[]{
        ...,
        ...select(
          _type == "image" => {
            "blogImage": asset->url, 
            alt,
            caption
          }
        )
    }
    }
  `,
    { slug }
  )
}

export async function getShows() {
  return client.fetch(groq`
    *[_type == "show"] | order(date desc) {
      "imageUrl": imageUrl.asset->url,
      _id,
      artist,
      cloudUrl,
      date,
      excerpt,
      isFeatured,
      slug,
      tags,
      title,
      tracklist,
      isFeatured
    }
  `)
}

export async function getShowBySlug(slug: string) {
  return client.fetch(
    groq`
    *[_type == "show" && slug.current == $slug][0] {
      "imageUrl": imageUrl.asset->url,
      _id,
      artist,
      cloudUrl,
      date,
      excerpt,
      isFeatured,
      slug,
      tags,
      title,
      tracklist,
    }
  `,
    { slug }
  )
}
