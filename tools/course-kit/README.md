# course-kit

Le moteur du cours. Il lit `content/` à la racine du dépôt et produit un site
statique. Aucun texte de cours ne vit ici.

## Ce que fait `course build`

1. restaure le cache des diaporamas (sur Netlify uniquement — en local il est
   déjà sur le disque) ;
2. recopie les `content/<module>/preview.png` dans `site/public/preview/`,
   pour qu'Astro puisse les servir ;
3. construit le site Astro dans `dist/` — accueil, fiches TP et corrigés ;
4. pour chaque `content/<module>/slides.md` : le reprend du cache s'il n'a pas
   changé, sinon le construit avec Slidev dans `dist/<module>/`.

Le point 4 est séquentiel volontairement : chaque build Slidev embarque Monaco
et Shiki, et lancer les douze en parallèle épuise la mémoire de la machine de
build.

## Le cache

Un diaporama coûte plus d'une minute à construire ; douze, c'est un quart
d'heure à chaque déploiement, même pour une virgule corrigée dans un corrigé.

Chaque diaporama est donc rangé dans `.course-cache/<module>-<empreinte>/`.
L'empreinte est un hachage de **ce que Slidev lit réellement** :

- `content/<module>/slides.md`
- `content/<module>/exercises/` et `content/<module>/assets/`
- `tools/theme/` et `tools/addon/`, qui changent l'apparence de tous les
  diaporamas
- la version de `@slidev/cli`

Ce qui n'entre **pas** dans l'empreinte : `module.md`, `correction.md` et
`preview.png`. Ils vivent dans le même dossier mais ne concernent que le site,
qui se reconstruit en quelques secondes de toute façon.

Les entrées qui ne correspondent plus à un diaporama actuel sont supprimées à
chaque build : le cache ne grossit pas indéfiniment.

`course build --no-cache` reconstruit tout. Si vous changez la façon dont un
diaporama est construit sans toucher aux fichiers ci-dessus, incrémentez
`CACHE_VERSION` dans `src/cache.js` — sinon le cache resservira un résultat
produit par l'ancienne logique.

Sur Netlify, chaque build part d'une machine neuve : `@netlify/cache-utils`
transporte `.course-cache` d'un build à l'autre. Si ça échoue, on reconstruit
tout — c'est plus lent, jamais cassé.

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
bin/course.js      l'entrée du CLI
src/paths.js       découverte des modules, résolution des exécutables
src/build.js       build complet (site + diaporamas)
src/cache.js       empreinte et réutilisation des diaporamas construits
src/netlify-cache.js  transport du cache entre deux builds Netlify
src/dev.js         serveurs de développement
src/thumbnails.js  export PNG de la première slide
site/              l'application Astro
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
