---
layout: exercise
title: Construire une phrase
duration: 4
difficulty: 1
goal: Arrêter de concaténer avec des `+`.
---

Réécrire cet affichage avec un template string, sur plusieurs lignes et sans un seul `+`.

```javascript {monaco-run} {height:'240px', autorun:false}
const user = { firstname: "Alice", lastname: "Smith", age: 25 }

console.log(
  "Bonjour " + user.firstname + " " + user.lastname +
  ",\nvous avez " + user.age + " ans." +
  "\nL'an prochain vous en aurez " + (user.age + 1) + "."
)
```

Un template string accepte n'importe quelle expression entre `${}`, pas seulement une variable.
