import { defineCollection, z } from 'astro:content'

export const collections = {
	project: defineCollection({
		type: 'content',
		schema: z.object({
			title: z.string(),
			type: z.string(),
			role: z.string(),
			period: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			tags: z.array(z.string()),
			img: z.string(),
			img_alt: z.string().optional()
		})
	})
}
