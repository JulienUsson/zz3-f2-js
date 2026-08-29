---
layout: exercise
title: Retirer sans splice
duration: 8
difficulty: 2
goal: Remplacer une méthode mutante par une méthode qui retourne du neuf.
---

`splice` modifie le tableau reçu. Réécrivez cette fonction sans elle.

```javascript {monaco-run} {height:'280px', autorun:false}
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Carl" },
]

function removeUserById(users, id) {
  const index = users.findIndex((u) => u.id === id)
  users.splice(index, 1)
  return users
}

console.log(removeUserById(users, 2))
console.log(users) // 😱 l'original a perdu Bob
```

💡 `filter` retourne un nouveau tableau.

Que fait la version d'origine si l'`id` n'existe pas ? (`findIndex` renvoie `-1`…)
