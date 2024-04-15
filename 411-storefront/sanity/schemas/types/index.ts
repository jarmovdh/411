import { PortableTextBlock } from "sanity"

export type AlbumType = {
  _id: string
  title: string
  artist: string
  coverImageUrl: string
  alt: string
  excerpt: string
  body: PortableTextBlock[]
  date: string
  releaseDate: string
  slug: {
    current: string
  }
  spotifyUrl: string
  appleMusicUrl: string
  tracklist: {
    _key: string
    _type: string
    title: string
  }[]
}

export type CarouselImage = {
  _id: string
  imageSrc: string
  alt: string
}

export type NewsItemType = {
  _id: string
  title: string
  slug: {
    current: string
  }
  carouselImages?: CarouselImage[]
  date: string
  excerpt: string
  imageUrl: string
  alt: string
  body: PortableTextBlock[]
}

export type ShowType = {
  _id: number | string
  id: number
  artist: string
  title: string
  excerpt: string
  date: string
  slug: {
    current: string
  }
  tags: string[]
  imageUrl: string
  cloudUrl: string
  tracklist: {
    _key: string
    _type: string
    artist: string
    title: string
  }[]
  isFeatured: boolean
}
