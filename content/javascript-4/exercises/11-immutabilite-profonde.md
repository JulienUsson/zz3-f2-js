---
layout: exercise
title: Immutabilité profonde
duration: 12
difficulty: 2
goal: Comprendre qu'une copie de surface ne suffit pas.
---

Écrire `updateLastname(state, newLastname)` qui ne modifie rien et clone **tous les niveaux** nécessaires.

```javascript {monaco-run} {height:'320px', autorun:false}
const state = {
  user: { id: 1, profile: { firstname: "Julien", lastname: "Usson" } },
}

function updateLastname(state, newLastname) {
  // à vous
}

const next = updateLastname(state, "Dupont")
console.log(state !== next)                            // true
console.log(state.user !== next.user)                  // true
console.log(state.user.profile !== next.user.profile)  // true
console.log(state.user.profile.lastname)               // "Usson"
```

Essayez d'abord avec un seul niveau de spread : quelle assertion tombe ?
