---
layout: exercise
title: filter() — garder certains éléments
duration: 5
difficulty: 1
goal: Produire un nouveau tableau plus court.
---

Récupérer les personnes de moins de 26 ans avec [`filter()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

```javascript {monaco-run} {height:'220px', autorun:false}
const users = [
  { name: "Julien", age: 25 },
  { name: "Louise", age: 24 },
  { name: "Bastien", age: 22 },
  { name: "Raphaël", age: 28 },
  { name: "Alexandre", age: 42 },
]

// Attendu : Julien (25), Louise (24), Bastien (22)
```
