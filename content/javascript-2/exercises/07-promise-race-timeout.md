---
layout: exercise
title: Abandonner au bout de N secondes
duration: 10
difficulty: 2
goal: Faire courir deux promesses et ne garder que la première.
---

Écrire `fetchWithTimeout(promise, ms)` qui échoue si la promesse met plus de `ms` à se résoudre.

```javascript {monaco-run} {height:'260px', autorun:false}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function fetchWithTimeout(promise, ms) {
  // Indice : faites courir `promise` contre une promesse qui rejette après ms
}

fetchWithTimeout(delay(3000).then(() => "fini"), 1000)
  .then(console.log)
  .catch(() => console.log("Timeout"))
```

Que devient la promesse perdante ? Est-elle annulée ?
