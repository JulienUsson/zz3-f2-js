#!/usr/bin/env node
import { build } from "../src/build.js";
import { dev } from "../src/dev.js";
import { thumbnails } from "../src/thumbnails.js";
import { listDecks, listModules } from "../src/paths.js";

const USAGE = `
course — le moteur du cours

  course build              Construit le site complet dans dist/
  course build --no-cache   Reconstruit tous les diaporamas
  course dev                Lance le site en local
  course dev <module>       Lance le diaporama d'un module
  course thumbnails [mod]   Régénère les images de couverture
  course list               Liste les modules détectés

Le contenu est lu dans content/<module>/ :
  module.md      la fiche (titre, ordre, date de correction) — requis
  slides.md      le diaporama            (facultatif)
  exercises/     les exercices, un par fichier (facultatif)
  correction.md  le corrigé              (facultatif)
  assets/        les images du diaporama (facultatif)
  preview.png    l'image de couverture   (facultatif)
`.trim();

function list() {
  const decks = new Set(listDecks().map((deck) => deck.id));
  for (const module of listModules()) {
    console.log(`${module.id}${decks.has(module.id) ? "  (diaporama)" : ""}`);
  }
}

const [command, argument] = process.argv.slice(2);

try {
  switch (command) {
    case "build":
      await build({ cache: argument !== "--no-cache" });
      break;
    case "dev":
      dev(argument);
      break;
    case "thumbnails":
      thumbnails(argument);
      break;
    case "list":
      list();
      break;
    case undefined:
    case "help":
    case "--help":
    case "-h":
      console.log(USAGE);
      break;
    default:
      console.error(`Commande inconnue : ${command}\n`);
      console.error(USAGE);
      process.exit(1);
  }
} catch (error) {
  // Les commandes déléguées impriment déjà leur erreur ; on n'ajoute pas une
  // trace Node illisible par-dessus.
  console.error(`\n❌ ${error.message}`);
  process.exit(1);
}
