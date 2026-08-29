---
layout: exercise
title: map() — transformer chaque élément
duration: 5
difficulty: 1
goal: Produire un nouveau tableau de même longueur.
---

Récupérer uniquement les prénoms des utilisateurs avec [`map()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

```javascript {monaco-run} {height:'200px', autorun:false}
const users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 24 },
  { name: "Bastien", age: 22 },
]

// Attendu : ["Julien", "Louise", "Bastien"]
```

Bonus : reprendre l'exercice « Additionner 42 » et le réécrire avec `map()`. Combien de lignes gagnées ?
