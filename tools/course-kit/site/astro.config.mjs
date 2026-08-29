// @ts-check

import { readFileSync } from "node:fs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

const site = JSON.parse(
  readFileSync(new URL("../../../content/site.json", import.meta.url), "utf-8"),
);

/**
 * Les exercices marquent leurs blocs exécutables avec `{monaco-run}`, ce qui
 * les rend interactifs dans les slides. On reporte cette information dans le
 * HTML pour en faire autant sur le site.
 *
 * Les blocs `{monaco}` seuls — ceux de Typescript — n'en font pas partie :
 * ils vérifient des types, ils ne s'exécutent pas.
 */
const markRunnableBlocks = {
  name: "course-runnable",
  pre(node) {
    const meta = this.options.meta?.__raw ?? "";
    if (meta.includes("monaco-run")) {
      node.properties["data-runnable"] = "";
    }
  },
};

// https://astro.build/config
export default defineConfig({
  site: site.url,
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      transformers: [markRunnableBlocks],
    },
  },
});
