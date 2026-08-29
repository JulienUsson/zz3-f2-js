import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Tout le contenu du cours vit dans `content/<module>/` à la racine du dépôt.
// Le site n'est qu'un moteur de rendu : il ne contient aucun texte de cours.
const CONTENT = "../../../content";

/** `javascript-1/module.md` ➡️ `javascript-1` */
const moduleOf = (entry: string) => entry.split("/")[0]!;

const modules = defineCollection({
  loader: glob({
    base: CONTENT,
    pattern: "*/module.md",
    generateId: ({ entry }) => moduleOf(entry),
  }),
  schema: z.object({
    title: z.string(),
    order: z.number().optional().default(1),
    correctionDate: z.date().optional(),
    // Page accessible par lien mais absente de l'accueil (étapes d'un TP long).
    hidden: z.boolean().optional().default(false),
  }),
});

const exercises = defineCollection({
  loader: glob({ base: CONTENT, pattern: "*/exercises/*.md" }),
  schema: z.object({
    title: z.string(),
    duration: z.number().optional(),
    difficulty: z.number().min(1).max(3).optional().default(1),
    goal: z.string().optional(),
    // Hors du parcours de la séance : proposé aux plus rapides.
    bonus: z.boolean().optional().default(false),
    // Lu par Slidev, ignoré ici.
    layout: z.string().optional(),
  }),
});

const corrections = defineCollection({
  loader: glob({
    base: CONTENT,
    pattern: "*/correction.md",
    generateId: ({ entry }) => moduleOf(entry),
  }),
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = { modules, exercises, corrections };
