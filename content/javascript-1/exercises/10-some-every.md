---
layout: exercise
title: some() et every()
duration: 5
difficulty: 1
goal: Répondre par oui ou non sur tout un tableau.
---

Vérifier qu'**au moins une** personne a plus de 40 ans avec [`some()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/some), puis que **toutes** sont majeures avec [`every()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/every).

```javascript {monaco-run} {height:'200px', autorun:false}
const users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 24 },
  { name: "Alexandre", age: 42 },
]

// Attendu : true, puis true
```
