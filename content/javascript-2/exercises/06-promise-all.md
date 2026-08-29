---
layout: exercise
title: Deux requêtes en parallèle
duration: 8
difficulty: 2
goal: Lancer deux requêtes en même temps plutôt que l'une après l'autre.
---

Récupérer les **deux** listes d'utilisateurs, les fusionner et afficher le total.

```javascript {monaco-run} {height:'260px', autorun:false}
const BASE = "https://raw.githubusercontent.com/JulienUsson/zz3-f2-js/refs/heads/master/api"

async function countAllUsers() {
  // Promise.all, puis fusionner les deux tableaux
}

countAllUsers()
```

Mesurez avec `console.time()` / `console.timeEnd()`, puis comparez avec deux `await` à la suite. Combien de temps gagnez-vous ?
