const album = {
  name: "album",
  title: "Album",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "artist",
      title: "Artist",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "The unique slug for this news item. This will be used in the URL.",
      options: {
        source: (doc: { artist: string; title: string }) => {
          const artist = doc.artist.replace(/\s+/g, "-").toLowerCase()
          const title = doc.title.replace(/\s+/g, "-").toLowerCase()
          return `${artist}-${title}`
        },
        maxLength: 200,
      },
    },
    {
      name: "releaseDate",
      title: "Release Date",
      type: "date",
      description: "The date when this album was released.",
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
      description: "The date when this news item was created.",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
        calendarTodayLabel: "Today",
      },
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Describe the image for those who can't see it",
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
              name: "title",
              title: "Title",
              type: "string",
            },
          ],
        },
      ],
      description: "List of tracks in the show with artist and track title.",
    },
    {
      name: "spotifyUrl",
      title: "Spotify URL",
      type: "url",
      description: "The URL to the album on Spotify.",
    },
    {
      name: "appleMusicUrl",
      title: "Apple Music URL",
      type: "url",
      description: "The URL to the album on Apple Music.",
    },
    {
      name: "siteUrl",
      title: "Site URL",
      type: "url",
      description: "The URL to the Artist's site.",
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "A brief summary of the Album .",
    },
    {
      name: "body",
      type: "array",
      title: "Body",
      description: "The main content for this album post.",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "URL",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
}

export default album
