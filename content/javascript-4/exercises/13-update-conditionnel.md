---
layout: exercise
title: Ne recréer que ce qui change
duration: 12
difficulty: 3
goal: Produire un nouvel état minimal — exactement ce qu'attend React.
---

Écrire `setUserOnline(state, userId)` : un nouvel état, un seul utilisateur passe `online: true`, et **les autres gardent leur référence d'origine**.

```javascript {monaco-run} {height:'340px', autorun:false}
const state = {
  users: [
    { id: 1, name: "Alice", online: false },
    { id: 2, name: "Bob", online: false },
  ],
}

function setUserOnline(state, userId) {
  // à vous
}

const next = setUserOnline(state, 1)
console.log(next.users[0].online)                  // true
console.log(next.users[1] === state.users[1])      // true — Bob n'a pas bougé
console.log(next !== state)                        // true
```

Ce dernier point n'est pas un détail : c'est ce qui permet à React de ne pas réafficher Bob.
