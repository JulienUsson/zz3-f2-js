import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { KIT_DIR, listDecks, resolveBin } from "./paths.js";

/**
 * Régénère l'image de couverture d'un module à partir de la première slide de
 * son diaporama. Nécessite Chromium (playwright-chromium).
 */
export function thumbnails(moduleId) {
  const decks = listDecks().filter((deck) => !moduleId || deck.id === moduleId);
  if (decks.length === 0) {
    throw new Error(
      moduleId
        ? `Aucun diaporama pour le module "${moduleId}".`
        : "Aucun diaporama à exporter.",
    );
  }

  for (const deck of decks) {
    console.log(`🖼️  ${deck.id}`);
    const scratch = mkdtempSync(join(tmpdir(), `course-thumb-${deck.id}-`));
    try {
      execFileSync(
        resolveBin("slidev"),
        ["export", deck.slides, "--format", "png", "--range", "1", "--output", scratch],
        { stdio: "inherit", cwd: KIT_DIR },
      );
      cpSync(join(scratch, "1.png"), deck.preview);
    } finally {
      rmSync(scratch, { recursive: true, force: true });
    }
  }

  console.log(`✅ ${decks.length} couverture(s) régénérée(s)`);
}
