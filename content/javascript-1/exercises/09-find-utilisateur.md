---
layout: exercise
title: find() — le premier qui correspond
duration: 5
difficulty: 2
goal: Voir la différence entre « filtrer » et « trouver ».
---

Récupérer l'objet `{ name: "Julien", age: 31 }` avec [`find()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find). Attention : il y a **deux** Julien.

```javascript {monaco-run} {height:'220px', autorun:false}
const users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 28 },
  { name: "Bastien", age: 22 },
  { name: "Alexandre", age: 42 },
  { name: "Julien", age: 55 },
]

// Attendu : { name: "Julien", age: 31 }
```

Que retourne `find()` quand rien ne correspond ?
