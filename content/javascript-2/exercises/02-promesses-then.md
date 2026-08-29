---
layout: exercise
title: Première promesse
duration: 10
difficulty: 1
goal: Enchaîner un traitement sur une valeur qui n'est pas encore là.
---

Récupérer la liste d'utilisateurs et afficher **ceux qui habitent en France**, avec `.then()`.

```javascript {monaco-run} {height:'260px', autorun:false}
const URL =
  "https://raw.githubusercontent.com/JulienUsson/zz3-f2-js/refs/heads/master/api/users.json"

fetch(URL)
  .then((response) => response.json())
  .then((users) => {
    console.log(users)
    // à vous : ne garder que la France
  })
```

Mettez un `console.log` **avant** et **après** le `fetch`. Dans quel ordre s'affichent-ils ?

ℹ️ En cours nous utilisons `fetch`, disponible partout. Sur CodeSandbox vous pouvez aussi utiliser [axios](https://github.com/axios/axios#example).
