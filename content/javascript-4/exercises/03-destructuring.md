---
layout: exercise
title: Déstructurer plutôt que répéter
duration: 6
difficulty: 1
goal: Extraire ce dont on a besoin, en une ligne.
---

Réécrire cette fonction en déstructurant son paramètre, avec une valeur par défaut pour `city`.

```javascript {monaco-run} {height:'260px', autorun:false}
function describe(user) {
  return `${user.firstname} ${user.lastname}, ${user.city ?? "ville inconnue"}`
}

console.log(describe({ firstname: "Alice", lastname: "Smith", city: "Paris" }))
console.log(describe({ firstname: "Bob", lastname: "Jones" }))
```

Bonus : récupérer le premier élément et **tout le reste** d'un tableau en une seule ligne.
