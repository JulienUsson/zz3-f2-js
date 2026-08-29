---
layout: exercise
title: Un mot de passe vraiment privé
duration: 8
difficulty: 2
goal: Empêcher l'extérieur de lire un champ, pas seulement le décourager.
---

Ajouter à `User` un champ **privé** `#password`, une méthode `setPassword(pwd)` et une méthode `checkPassword(pwd)`.

```javascript {monaco-run} {height:'280px', autorun:false}
class User {
  // #password = ...
}

const user = new User("Julien", "Usson", 31, "mySecretPwd")
console.log(user.checkPassword("wrongPwd"))    // false
console.log(user.checkPassword("mySecretPwd")) // true

user.setPassword("newPwd")
console.log(user.checkPassword("mySecretPwd")) // false
console.log(user.checkPassword("newPwd"))      // true
```

Essayez `console.log(user.#password)` depuis l'extérieur, puis `console.log(user)`. Que voyez-vous ?
