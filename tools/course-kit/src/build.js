import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import {
  CONTENT_DIR,
  KIT_DIR,
  REPO_DIR,
  SITE_DIR,
  listDecks,
  listModules,
  resolveBin,
} from "./paths.js";
import {
  cacheEntryName,
  deckFingerprint,
  pruneCache,
  restoreDeck,
  storeDeck,
} from "./cache.js";
import { restoreSharedCache, saveSharedCache } from "./netlify-cache.js";

const run = (bin, args, cwd = KIT_DIR) =>
  execFileSync(resolveBin(bin), args, { stdio: "inherit", cwd });

/**
 * Les images de couverture vivent avec leur module (`content/<id>/preview.png`)
 * mais doivent être servies par le site. On les recopie dans son dossier
 * `public/`, qui est ignoré par git.
 */
export function syncPreviews() {
  const target = join(SITE_DIR, "public", "preview");
  rmSync(target, { recursive: true, force: true });
  mkdirSync(target, { recursive: true });

  let count = 0;
  for (const module of listModules()) {
    if (!existsSync(module.preview)) continue;
    cpSync(module.preview, join(target, `${module.id}.png`));
    count += 1;
  }
  return count;
}

export function buildSite(outDir) {
  run("astro", ["build", "--root", SITE_DIR, "--outDir", outDir]);
}

export function buildDeck(module, outDir) {
  run("slidev", [
    "build",
    module.slides,
    "--base",
    `/${module.id}/`,
    "--out",
    join(outDir, module.id),
  ]);
}

export async function build({ out = join(REPO_DIR, "dist"), cache = true } = {}) {
  if (!existsSync(CONTENT_DIR)) {
    throw new Error(`Aucun dossier "content/" à la racine du dépôt.`);
  }

  console.log("🧹 Nettoyage de dist/");
  rmSync(out, { recursive: true, force: true });

  if (cache) await restoreSharedCache();

  const previews = syncPreviews();
  console.log(`🖼️  ${previews} image(s) de couverture`);

  console.log("📦 Construction du site");
  buildSite(out);

  const decks = listDecks();
  console.log(`🎬 ${decks.length} diaporama(s)`);

  const started = Date.now();
  const keep = [];
  let reused = 0;

  // Un processus par diaporama : construire les douze en parallèle épuise la
  // mémoire (chaque build Slidev embarque Monaco et Shiki).
  for (const deck of decks) {
    const target = join(out, deck.id);
    const fingerprint = cache ? deckFingerprint(deck) : null;
    if (fingerprint) keep.push(cacheEntryName(deck, fingerprint));

    if (fingerprint && restoreDeck(deck, fingerprint, target)) {
      console.log(`   ♻️  ${deck.id} (inchangé)`);
      reused += 1;
      continue;
    }

    console.log(`   ➡️  ${deck.id}`);
    buildDeck(deck, out);
    if (fingerprint) storeDeck(deck, fingerprint, target);
  }

  if (cache) {
    pruneCache(keep);
    await saveSharedCache();
  }

  const minutes = ((Date.now() - started) / 60000).toFixed(1);
  console.log(
    `   ${reused}/${decks.length} repris du cache, ${minutes} min de diaporamas`,
  );
  console.log(`✅ Site complet dans ${out}`);
}
