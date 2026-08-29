import { createHash } from "node:crypto";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
} from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { REPO_DIR } from "./paths.js";

export const CACHE_DIR = join(REPO_DIR, ".course-cache");

/**
 * À incrémenter quand la façon de construire un diaporama change sans que les
 * fichiers hachés ci-dessous bougent — sinon on ressort du cache un résultat
 * produit par l'ancienne logique.
 */
const CACHE_VERSION = 1;

const require = createRequire(import.meta.url);

function slidevVersion() {
  try {
    return require("@slidev/cli/package.json").version;
  } catch {
    return "inconnue";
  }
}

/** Mélange dans `hash` le nom et le contenu de tout ce que contient `path`. */
function hashPath(hash, path, label) {
  if (!existsSync(path)) {
    hash.update(`absent:${label}`);
    return;
  }
  if (statSync(path).isDirectory()) {
    hash.update(`dir:${label}`);
    for (const name of readdirSync(path).sort()) {
      hashPath(hash, join(path, name), name);
    }
    return;
  }
  hash.update(`file:${label}`);
  hash.update(readFileSync(path));
}

/**
 * L'empreinte de tout ce qui peut changer le résultat du build d'un diaporama.
 *
 * On ne hache que ce que Slidev lit réellement : le `slides.md`, les exercices
 * qu'il importe et les images qu'il affiche. `module.md`, `correction.md` et
 * `preview.png` vivent dans le même dossier mais ne concernent que le site —
 * les inclure ferait reconstruire un diaporama pour une virgule dans un
 * corrigé.
 */
export function deckFingerprint(deck) {
  const hash = createHash("sha256");
  hash.update(`v${CACHE_VERSION}\n`);
  hash.update(`id:${deck.id}\n`);
  hash.update(`slidev:${slidevVersion()}\n`);

  hashPath(hash, deck.slides, "slides.md");
  hashPath(hash, join(deck.dir, "exercises"), "exercises");
  hashPath(hash, join(deck.dir, "assets"), "assets");
  // Le thème et l'addon changent l'apparence de tous les diaporamas.
  hashPath(hash, join(REPO_DIR, "tools", "theme"), "theme");
  hashPath(hash, join(REPO_DIR, "tools", "addon"), "addon");

  return hash.digest("hex").slice(0, 16);
}

const entryPath = (deck, fingerprint) => join(CACHE_DIR, `${deck.id}-${fingerprint}`);

/** Recopie un diaporama déjà construit. Retourne false s'il n'est pas en cache. */
export function restoreDeck(deck, fingerprint, target) {
  const entry = entryPath(deck, fingerprint);
  // `index.html` est le dernier fichier qu'écrit Slidev : sa présence garantit
  // qu'on ne restaure pas un build interrompu.
  if (!existsSync(join(entry, "index.html"))) return false;
  cpSync(entry, target, { recursive: true });
  return true;
}

export function storeDeck(deck, fingerprint, built) {
  const entry = entryPath(deck, fingerprint);
  rmSync(entry, { recursive: true, force: true });
  mkdirSync(CACHE_DIR, { recursive: true });
  cpSync(built, entry, { recursive: true });
}

/**
 * Supprime les entrées qui ne correspondent plus à aucun diaporama actuel,
 * pour que le cache ne grossisse pas à chaque modification.
 */
export function pruneCache(keep) {
  if (!existsSync(CACHE_DIR)) return 0;
  const wanted = new Set(keep);
  let removed = 0;
  for (const name of readdirSync(CACHE_DIR)) {
    if (wanted.has(name)) continue;
    rmSync(join(CACHE_DIR, name), { recursive: true, force: true });
    removed += 1;
  }
  return removed;
}

export const cacheEntryName = (deck, fingerprint) => `${deck.id}-${fingerprint}`;
