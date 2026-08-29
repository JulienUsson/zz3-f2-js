# ZZ3F2 — Javascript / Typescript

Le cours en ligne : [javascript.usson.dev](https://javascript.usson.dev)

Chaque séance a un dossier dans `content/`. Le reste du dépôt est de la
mécanique, et vous n'avez normalement pas à y toucher pour préparer un cours.

## Écrire du contenu

```
content/javascript-1/
  module.md      la fiche : titre, ordre, date de correction, puis l'intro du TP
  slides.md      le diaporama Slidev
  quiz.md        le quiz collectif de début de séance
  exercises/     un fichier par exercice
  correction.md  le corrigé
  assets/        les images du diaporama
  preview.png    la vignette affichée sur l'accueil
```

Seul `module.md` est obligatoire. Tout le reste est déduit des fichiers
présents : un dossier qui contient un `slides.md` a un diaporama, un dossier
qui contient des `exercises/` a des exercices. Il n'y a rien à déclarer
ailleurs.

### Créer une séance

```bash
mkdir -p content/ma-seance
cat > content/ma-seance/module.md <<'EOF'
---
title: "Ma séance"
order: 50
---
EOF
```

Elle apparaît immédiatement sur l'accueil, à sa place dans l'ordre.

### Écrire le quiz de début de séance

`content/ma-seance/quiz.md` contient une slide par question. Il est joué
collectivement, à main levée, en ouverture de séance, et porte sur la séance
**précédente** — il n'est pas noté, il sert à raviver les souvenirs.

```markdown
---
layout: quiz
---

# Que vaut `[1, 5, 10].sort()` ?

- **A.** `[1, 5, 10]`
- **B.** `[1, 10, 5]`

<v-click>

> ✅ **B** — sans callback, `sort()` compare les valeurs comme des chaînes.

</v-click>
```

Le bloc `<v-click>` masque la réponse : vous la révélez d'un clic, après le vote.
Le quiz ne figure pas sur la fiche TP — c'est une activité de classe.

### Écrire un exercice

Un exercice est un fichier autonome, affiché **deux fois** : intercalé dans le
diaporama au bon moment, et sur la fiche TP du site. Vous ne l'écrivez qu'une
fois.

```markdown
---
layout: exercise
title: Additionner 42
duration: 8
difficulty: 1
goal: Parcourir un tableau avec les trois formes de boucle.
---

Ajouter `42` à chaque élément du tableau.

```javascript {monaco-run} {height:'200px', autorun:false}
const numbers = [20, 30, 42, 66, 99]
```
```

Pour l'intercaler dans le diaporama, ajoutez une slide qui l'importe :

```markdown
---
src: ./exercises/01-boucles-additionner-42.md
---
```

Les blocs `monaco-run` sont exécutables **des deux côtés** : dans les slides,
et sur la fiche de TP, où l'élève peut aussi les modifier. Les blocs `monaco`
seuls restent statiques — c'est ce qu'on veut pour Typescript, qui se compile
mais ne s'exécute pas.

## Les commandes

| Commande                   |                                                   |
| -------------------------- | ------------------------------------------------- |
| `pnpm dev`                 | le site en local                                   |
| `pnpm dev javascript-1`    | un diaporama en local                              |
| `pnpm build`               | tout construire dans `dist/`                       |
| `pnpm list`                | lister les séances détectées                       |
| `pnpm thumbnails`          | régénérer les vignettes depuis la première slide   |

Les diaporamas inchangés sont repris d'un build sur l'autre : seuls ceux que
vous avez modifiés sont reconstruits. `pnpm build --no-cache` force tout.

## Le reste du dépôt

| Dossier            |                                                                    |
| ------------------ | ------------------------------------------------------------------ |
| `tools/course-kit` | le CLI `course` et le site Astro qui rend le contenu                |
| `tools/theme`      | le thème Slidev (dont le layout `exercise`)                        |
| `tools/addon`      | l'addon Slidev (configuration de l'éditeur Monaco)                 |
| `pizzima-starter`  | le squelette du TP fil rouge, récupéré par les élèves              |
| `api`              | des fixtures JSON, servies par GitHub raw et appelées depuis un TP |

⚠️ Les URL de `api/` sont écrites en dur dans les énoncés et pointent vers
`master` : déplacer ces fichiers casse le TP pour les élèves en cours de route.
