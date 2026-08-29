import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { KIT_DIR, SITE_DIR, listDecks, listModules, resolveBin } from "./paths.js";
import { syncPreviews } from "./build.js";

export function dev(moduleId) {
  syncPreviews();

  if (!moduleId) {
    execFileSync(resolveBin("astro"), ["dev", "--root", SITE_DIR], {
      stdio: "inherit",
      cwd: KIT_DIR,
    });
    return;
  }

  const module = listModules().find((candidate) => candidate.id === moduleId);
  if (!module) {
    const known = listModules().map((m) => m.id).join(", ");
    throw new Error(`Module "${moduleId}" inconnu. Modules disponibles : ${known}`);
  }
  if (!existsSync(module.slides)) {
    const withSlides = listDecks().map((m) => m.id).join(", ");
    throw new Error(
      `Le module "${moduleId}" n'a pas de slides.md. Modules avec diaporama : ${withSlides}`,
    );
  }

  execFileSync(resolveBin("slidev"), [module.slides, "--open"], {
    stdio: "inherit",
    cwd: KIT_DIR,
  });
}
