---
layout: exercise
title: Le piège de la référence partagée
duration: 10
difficulty: 3
goal: Voir qu'un objet déclaré une fois est partagé par tous ceux qui le pointent.
---

```javascript {monaco-run} {height:'320px', autorun:false}
const defaultSettings = { theme: "dark", notifications: true }

function createUser(name) {
  return { name, settings: defaultSettings }
}

const user1 = createUser("Alice")
const user2 = createUser("Bob")

user1.settings.theme = "light"
console.log(user2.settings.theme) // 😱
```

1. Expliquez précisément **pourquoi** `user2` est touché.
2. Corrigez `createUser`.
3. Vérifiez que `user1.settings !== user2.settings`.

`const` empêche de réaffecter la variable, pas de modifier l'objet qu'elle désigne.
