import { existsSync, readdirSync } from "node:fs";

/**
 * Le dossier `content/` à la racine du dépôt, vu depuis ce fichier
 * (`tools/course-kit/site/src/`).
 */
const CONTENT_DIR = new URL("../../../../content/", import.meta.url);

/** Un module a-t-il un diaporama ? Déduit de la présence du fichier. */
export function hasSlides(moduleId: string): boolean {
  return existsSync(new URL(`${moduleId}/slides.md`, CONTENT_DIR));
}

/** Un module a-t-il une image de couverture ? */
export function hasPreview(moduleId: string): boolean {
  return existsSync(new URL(`${moduleId}/preview.png`, CONTENT_DIR));
}

/**
 * Y a-t-il au moins un exercice dans tout le cours ? Astro avertit bruyamment
 * quand on interroge une collection vide, et une séance peut légitimement ne
 * pas encore avoir d'exercices.
 */
export function hasAnyExercise(): boolean {
  return readdirSync(CONTENT_DIR).some((entry) =>
    existsSync(new URL(`${entry}/exercises`, CONTENT_DIR)),
  );
}
