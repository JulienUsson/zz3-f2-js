---
layout: exercise
title: Trier par âge
duration: 8
difficulty: 2
goal: Trier sans casser le tableau d'origine.
---

Trier les utilisateurs par âge croissant avec [`sort()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), puis avec [`toSorted()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted), puis en ordre décroissant.

```javascript {monaco-run} {height:'220px', autorun:false}
const users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 24 },
  { name: "Bastien", age: 22 },
]

// Attendu : Bastien (22), Louise (24), Julien (31)
```

Après votre `sort()`, affichez `users`. Que constatez-vous ?
