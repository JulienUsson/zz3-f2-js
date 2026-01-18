import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const practices = defineCollection({
  loader: glob({ base: "./src/content/practices", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slides: z.string().optional(),
      slidesOnly: z.boolean().optional().default(false),
      correctionDate: z.date().optional(),
      order: z.number().optional().default(1),
      image: z.string().optional(),
    }),
});

const corrections = defineCollection({
  loader: glob({ base: "./src/content/corrections", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
    }),
});

export const collections = { practices, corrections };
