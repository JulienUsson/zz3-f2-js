# course-kit

Le moteur du cours. Il lit `content/` à la racine du dépôt et produit un site
statique. Aucun texte de cours ne vit ici.

## Ce que fait `course build`

1. recopie les `content/<module>/preview.png` dans `site/public/preview/`,
   pour qu'Astro puisse les servir ;
2. construit le site Astro dans `dist/` — accueil, fiches TP et corrigés ;
3. construit chaque `content/<module>/slides.md` avec Slidev dans
   `dist/<module>/`, un processus par diaporama.

Le point 3 est séquentiel volontairement : chaque build Slidev embarque Monaco
et Shiki, et lancer les douze en parallèle épuise la mémoire de la machine de
build.

## Comment le contenu est découvert

Tout part du système de fichiers, il n'y a pas de manifeste à tenir à jour :

| Fichier                        | Effet                                      |
| ------------------------------ | ------------------------------------------ |
| `content/<id>/module.md`       | crée la séance `<id>`                      |
| `content/<id>/slides.md`       | crée le diaporama servi sur `/<id>/`       |
| `content/<id>/exercises/*.md`  | remplit la fiche `/practices/<id>/`        |
| `content/<id>/correction.md`   | crée le corrigé `/corrections/<id>/`       |
| `content/<id>/preview.png`     | la vignette de l'accueil                   |

`src/paths.js` fait cette découverte pour le CLI ; `site/src/content.config.ts`
la refait pour Astro, via des collections. Les deux lisent le même arbre.

## Structure

```
bin/course.js   l'entrée du CLI
src/paths.js    découverte des modules, résolution des exécutables
src/build.js    build complet (site + diaporamas)
src/dev.js      serveurs de développement
src/thumbnails.js  export PNG de la première slide
site/           l'application Astro
```

## Deux contraintes à connaître

**Slidev cherche le thème dans le `package.json` le plus proche du fichier
d'entrée.** Comme les `slides.md` vivent dans `content/`, ce package.json est
celui de la racine du dépôt : `slidev-theme-javascript` et
`slidev-addon-javascript` y sont donc déclarés, en plus de l'être ici.

**`site/public/preview/` est généré**, jamais versionné. Les vignettes ont leur
source dans `content/<module>/preview.png`.

## Le sortir du dépôt

Ce package ne dépend de rien qui lui soit extérieur, hormis la convention de
nommage de `content/`. Le publier sur npm et supprimer `tools/` ne demanderait
que de remplacer les `workspace:*` de la racine par une version publiée.
