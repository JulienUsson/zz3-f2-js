---
layout: exercise
title: fullName qui se lit et s'écrit
duration: 8
difficulty: 2
goal: Exposer une propriété calculée comme si c'était un champ.
---

Créer `User` avec `firstname` et `lastname`, un **getter** `fullName` et un **setter** `fullName` qui découpe la chaîne reçue.

```javascript {monaco-run} {height:'260px', autorun:false}
class User {
  // get fullName() { ... }
  // set fullName(value) { ... }
}

const user = new User("Julien", "Usson")
console.log(user.fullName)     // "Julien Usson"

user.fullName = "Jean Dupont"
console.log(user.firstname)    // "Jean"
console.log(user.lastname)     // "Dupont"
```

ℹ️ [`split()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/split) découpe la chaîne. Que faire si on reçoit `"Jean"` tout seul ?
