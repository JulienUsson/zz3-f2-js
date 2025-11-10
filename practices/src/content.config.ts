import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const practices = defineCollection({
  loader: glob({ base: "./src/content/practices", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slides: z.string().optional(),
    }),
});

export const collections = { practices };
