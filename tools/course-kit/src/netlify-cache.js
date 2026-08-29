import { CACHE_DIR } from "./cache.js";

/**
 * Sur Netlify, chaque build part d'une machine neuve : seul le dossier de cache
 * géré par `@netlify/cache-utils` survit d'un build à l'autre. En dehors de
 * Netlify il n'y a rien à faire, `.course-cache` reste sur le disque.
 *
 * Ces deux fonctions ne doivent jamais faire échouer un build : au pire on
 * reconstruit tout, ce qui est le comportement d'avant le cache.
 */
async function cacheUtils() {
  if (!process.env.NETLIFY) return null;
  try {
    return await import("@netlify/cache-utils");
  } catch {
    console.log("ℹ️  @netlify/cache-utils indisponible, cache non partagé");
    return null;
  }
}

export async function restoreSharedCache() {
  const utils = await cacheUtils();
  if (!utils) return;
  try {
    const restored = await utils.restore(CACHE_DIR);
    console.log(restored ? "♻️  Cache Netlify restauré" : "ℹ️  Aucun cache Netlify");
  } catch (error) {
    console.log(`⚠️  Restauration du cache impossible : ${error.message}`);
  }
}

export async function saveSharedCache() {
  const utils = await cacheUtils();
  if (!utils) return;
  try {
    await utils.save(CACHE_DIR);
    console.log("💾 Cache Netlify enregistré");
  } catch (error) {
    console.log(`⚠️  Enregistrement du cache impossible : ${error.message}`);
  }
}
