---
layout: exercise
title: Annoter et laisser deviner
duration: 5
difficulty: 1
goal: Voir où l'annotation est utile, et où elle est du bruit.
---

Corrigez ce qui ne compile pas, puis **supprimez** les annotations dont TypeScript n'a pas besoin.

```typescript {monaco} {height:'240px'}
let age: number = "31"
let firstname: string = "Julien"
let isAdmin: boolean = 1

let city = "Clermont"
city = 63
```

Survolez `city` : quel type TypeScript lui a-t-il donné tout seul ?
