import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    guide: defineCollection({
      type: 'page',
      source: 'guide/**/*.md',
      schema: z.object({
        title: z.string(),
        order: z.number(),
      }),
    }),
  },
})
