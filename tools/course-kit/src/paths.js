import { existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const KIT_DIR = fileURLToPath(new URL("..", import.meta.url));
export const SITE_DIR = join(KIT_DIR, "site");
export const REPO_DIR = join(KIT_DIR, "..", "..");
export const CONTENT_DIR = join(REPO_DIR, "content");

/**
 * Résout un exécutable installé (slidev, astro…). pnpm le place dans le
 * `node_modules/.bin` du package qui le déclare, ou dans celui de la racine
 * quand les dépendances sont remontées.
 */
export function resolveBin(name) {
  const candidates = [
    join(KIT_DIR, "node_modules", ".bin", name),
    join(REPO_DIR, "node_modules", ".bin", name),
  ];
  const found = candidates.find((path) => existsSync(path));
  if (!found) {
    throw new Error(
      `Exécutable "${name}" introuvable. Avez-vous lancé \`pnpm install\` ?`,
    );
  }
  return found;
}

/**
 * Les modules du cours : un dossier par séance dans `content/`, contenant au
 * minimum un `module.md`.
 */
export function listModules() {
  if (!existsSync(CONTENT_DIR)) return [];
  return readdirSync(CONTENT_DIR)
    .filter((name) => statSync(join(CONTENT_DIR, name)).isDirectory())
    .filter((name) => existsSync(join(CONTENT_DIR, name, "module.md")))
    .sort()
    .map((id) => ({
      id,
      dir: join(CONTENT_DIR, id),
      slides: join(CONTENT_DIR, id, "slides.md"),
      preview: join(CONTENT_DIR, id, "preview.png"),
    }));
}

/** Les modules qui ont un diaporama à construire. */
export function listDecks() {
  return listModules().filter((module) => existsSync(module.slides));
}

export { dirname };
