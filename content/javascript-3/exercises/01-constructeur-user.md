---
layout: exercise
title: Un User à l'ancienne
duration: 10
difficulty: 2
goal: Écrire un constructeur et poser ses méthodes sur le prototype.
---

Créer `User(firstname, lastname, age)` avec deux méthodes **sur le prototype** : `getFullName()` et `isAdult()`.

```javascript {monaco-run} {height:'260px', autorun:false}
function User(firstname, lastname, age) {
  // à vous
}

// Les méthodes vont sur User.prototype, pas dans le constructeur

const user = new User("Julien", "Usson", 31)
console.log(user.getFullName()) // "Julien Usson"
console.log(user.isAdult())     // true
```

Créez un second utilisateur et vérifiez avec `===` que les deux partagent bien **la même** fonction `getFullName`.
