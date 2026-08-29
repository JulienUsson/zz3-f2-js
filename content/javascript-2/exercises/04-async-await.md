---
layout: exercise
title: Le même, en async/await
duration: 8
difficulty: 1
goal: Voir que async/await n'est que de la syntaxe par-dessus les promesses.
---

Réécrire l'exercice « Première promesse » avec `async`/`await`, sans aucun `.then()`.

```javascript {monaco-run} {height:'260px', autorun:false}
const URL =
  "https://raw.githubusercontent.com/JulienUsson/zz3-f2-js/refs/heads/master/api/users.json"

async function showFrenchUsers() {
  // à vous
}

showFrenchUsers()
```

Comparez les deux versions : laquelle se lit le mieux ?
