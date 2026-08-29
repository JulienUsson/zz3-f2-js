---
layout: exercise
title: Mutation cachée
duration: 10
difficulty: 2
goal: Repérer une fonction qui modifie ce qu'on lui prête.
---

`addTag` a l'air inoffensive. Elle ne l'est pas.

```javascript {monaco-run} {height:'300px', autorun:false}
const users = [
  { id: 1, name: "Alice", tags: ["admin"] },
  { id: 2, name: "Bob", tags: ["user"] },
]

function addTag(user, tag) {
  user.tags.push(tag)
  return user
}

const updated = addTag(users[0], "editor")
console.log(users[0].tags)          // 😱
console.log(updated === users[0])   // 😱
```

Réécrivez-la pour qu'elle retourne un **nouvel** utilisateur sans jamais toucher l'original, puis vérifiez avec `===` que l'utilisateur **et** son tableau `tags` sont bien nouveaux.
