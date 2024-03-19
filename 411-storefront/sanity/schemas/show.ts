const show = {
  name: "show",
  title: "Show",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "The title of the show.",
    },
    {
      name: "artist",
      title: "Artist",
      type: "string",
      description: "The artist of the show.",
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "A brief summary of the show.",
    },
    {
      name: "date",
      title: "Date",
      type: "date",
      description: "The date when the show took place.",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc: { artist: string; title: string; date: string }) => {
          const artist = doc.artist.replace(/\s+/g, "-").toLowerCase()
          const title = doc.title.replace(/\s+/g, "-").toLowerCase()
          const date = doc.date.split("T")[0] // Extract the date part
          return `${artist}-${title}-${date}`
        },
        maxLength: 200,
      },
      description: "The URL-friendly identifier for the show.",
    },
    {
      name: "isFeatured",
      title: "Featured Show",
      type: "boolean",
      description: "Whether the show is featured or not.",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Tags associated with the show.",
    },
    {
      name: "imageUrl",
      type: "image",
      title: "Image",
      description: "The main image for this news item.",
      options: {
        hotspot: true, // Enables the hotspot for better cropping
      },
    },
    {
      name: "cloudUrl",
      title: "Cloud URL",
      type: "url",
      description: "The URL of the show's content in the cloud.",
    },
    {
      name: "tracklist",
      title: "Tracklist",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "artist",
              title: "Artist",
              type: "string",
            },
            {
              name: "title",
              title: "Title",
              type: "string",
            },
          ],
        },
      ],
      description: "List of tracks in the show with artist and track title.",
    },
  ],
}

export default show
