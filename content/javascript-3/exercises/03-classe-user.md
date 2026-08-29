---
layout: exercise
title: Le même User, en classe
duration: 8
difficulty: 1
goal: Mesurer ce que la syntaxe `class` fait gagner.
---

Réécrire l'exercice « Un User à l'ancienne » avec `class`. Même comportement, mêmes appels.

```javascript {monaco-run} {height:'260px', autorun:false}
class User {
  // à vous
}

const user = new User("Julien", "Usson", 31)
console.log(user.getFullName()) // "Julien Usson"
console.log(user.isAdult())     // true
```

Combien de lignes en moins ? Et vérifiez que `getFullName` est toujours partagée entre les instances — la classe n'a rien changé au prototype.
