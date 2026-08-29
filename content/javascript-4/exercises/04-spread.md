---
layout: exercise
title: Copier en changeant une chose
duration: 8
difficulty: 2
goal: Le geste que vous ferez le plus souvent en React.
---

Sans jamais modifier l'original :

```javascript {monaco-run} {height:'300px', autorun:false}
const user = { id: 1, name: "Alice", role: "user" }
const numbers = [2, 3]

// 1. un nouvel utilisateur avec role: "admin"
// 2. le même, plus une propriété `active: true`
// 3. [1, 2, 3, 4] à partir de `numbers`
// 4. fusionner { a: 1 } et { b: 2 }

console.log(user) // doit être intact à la fin
```

Puis expliquez la différence entre `{ ...obj, b: 1 }` et `{ b: 1, ...obj }`. L'ordre compte.
