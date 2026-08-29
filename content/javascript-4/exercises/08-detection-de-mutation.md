---
layout: exercise
title: Une copie qui n'en est pas une
duration: 8
difficulty: 3
goal: Savoir lire une affectation entre objets.
---

```javascript {monaco-run} {height:'300px', autorun:false}
const state = { counter: 0 }

function increment(state) {
  const newState = state
  newState.counter++
  return newState
}

const next = increment(state)
console.log(next === state)   // 😱
console.log(state.counter)    // 😱
```

1. Décrivez ce qui se passe **en mémoire** à la ligne `const newState = state`.
2. Réécrivez `increment` correctement.
3. Écrivez deux `console.log` qui prouvent l'immutabilité de votre version.

`const` ne crée pas de copie. Il ne fait qu'interdire de réaffecter le nom.
