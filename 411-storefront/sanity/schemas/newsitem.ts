const newsitem = {
  name: "newsitem",
  type: "document",
  title: "News Item",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      description: "Title of the news item.",
    },

    {
      name: "slug",
      type: "slug",
      title: "Slug",
      description:
        "The unique slug for this news item. This will be used in the URL.",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      name: "date",
      type: "datetime",
      title: "Date",
      description: "The date when this news item was created.",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
        calendarTodayLabel: "Today",
      },
    },
    {
      name: "excerpt",
      type: "text",
      title: "Excerpt",
      description: "A brief summary of the news item.",
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
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Describe the image for those who can't see it",
    },
    {
      name: "carouselImages",
      type: "array",
      title: "Carousel Images",
      description: "Images for the carousel.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              type: "image",
              title: "Image",
              options: {
                hotspot: true, // Enables the hotspot for better cropping
              },
            },
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Describe the image for those who can't see it",
            },
          ],
        },
      ],
    },
    {
      name: "body",
      type: "array",
      title: "Body",
      description: "The main content for this blog post.",
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
        {
          type: "image",
          options: {
            hotspot: true, // Enables the hotspot for better cropping
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
              description: "Describe the image for those who can't see it",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Add a caption to the image if needed",
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      imageUrl: "imageUrl",
    },
    prepare(selection: { title: string; date: string; imageUrl: string }) {
      const { title, date, imageUrl } = selection
      return {
        title,
        subtitle: date,
        media: imageUrl,
      }
    },
  },
}

export default newsitem
