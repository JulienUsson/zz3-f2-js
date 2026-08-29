import { readFileSync } from "node:fs";

export type SiteConfig = {
  title: string;
  description: string;
  url: string;
  email: string;
  github: string;
  author: { name: string; url: string };
  survey?: { label: string; url: string; from?: string };
};

/**
 * Les réglages qui changent d'une promo à l'autre vivent avec le contenu, pas
 * dans le moteur : `content/site.json`.
 */
export const SITE: SiteConfig = JSON.parse(
  readFileSync(new URL("../../../../content/site.json", import.meta.url), "utf-8"),
);

export const SITE_TITLE = SITE.title;
export const SITE_DESCRIPTION = SITE.description;
