---
layout: exercise
title: Une fonction pour tous les types
duration: 8
difficulty: 2
goal: Réutiliser sans perdre le typage, et sans `any`.
---

```typescript {monaco} {height:'300px'}
// 1. `first(array)` retourne le premier élément, ou undefined si vide.
//    Le type de retour doit suivre celui du tableau.

function first(array) {
  return array[0]
}

const n = first([1, 2, 3])        // doit être number | undefined
const s = first(["a", "b"])       // doit être string | undefined

// 2. Écrivez la même chose avec `any` : que perd-on sur `n` et `s` ?
```

Bonus : `pluck<T, K extends keyof T>(items: T[], key: K)` qui retourne le tableau des valeurs de cette clé.
