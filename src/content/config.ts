import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		tags: z.array(z.string()).optional(),
		image: z.string().optional(),
		table: z.boolean().optional(),
		ssr: z.boolean().optional(),
		date: z.string(),
	})
});

export const collections = {
	blog: blogCollection
};
