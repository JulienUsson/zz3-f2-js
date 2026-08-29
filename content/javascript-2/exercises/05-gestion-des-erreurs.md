---
layout: exercise
title: Quand la requête échoue
duration: 8
difficulty: 2
goal: Ne jamais laisser une promesse rejetée faire tomber le programme.
---

Afficher `Users loaded` si la requête aboutit, `Something went wrong` si elle échoue — **sans planter** — et `Request finished` dans tous les cas.

```javascript {monaco-run} {height:'260px', autorun:false}
// Cassez volontairement l'URL pour tester le cas d'erreur
const URL = "https://raw.githubusercontent.com/JulienUsson/CASSE/users.json"

async function loadUsers() {
  // try / catch / finally
}

loadUsers()
```

À faire dans les deux styles : `.then().catch().finally()` puis `try/catch/finally`.
