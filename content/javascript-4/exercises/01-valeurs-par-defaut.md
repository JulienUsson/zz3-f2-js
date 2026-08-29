---
layout: exercise
title: Des valeurs par défaut
duration: 4
difficulty: 1
goal: Voir ce qui déclenche — ou non — la valeur par défaut.
---

Écrire `createUser(name, role)` où `role` vaut `"user"` par défaut.

```javascript {monaco-run} {height:'220px', autorun:false}
function createUser(name, role) {
  // à vous
}

console.log(createUser("Alice"))              // role: "user"
console.log(createUser("Bob", "admin"))       // role: "admin"
console.log(createUser("Carl", null))         // et là ?
console.log(createUser("Dora", undefined))    // et là ?
```

Les deux derniers appels ne donnent pas le même résultat. Pourquoi ?
