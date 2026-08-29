---
layout: exercise
title: any contre unknown
duration: 8
difficulty: 2
goal: Comprendre pourquoi `unknown` est pénible — et pourquoi c'est une qualité.
---

```typescript {monaco} {height:'300px'}
function parseWithAny(data: any) {
  return data.toUpperCase() // compile. Et à l'exécution ?
}

function parseWithUnknown(data: unknown) {
  return data.toUpperCase() // ❌ ne compile pas
}

console.log(parseWithAny(42))
```

1. Exécutez `parseWithAny(42)` : où l'erreur apparaît-elle ?
2. Réparez `parseWithUnknown` avec un `typeof`, en renvoyant la chaîne en majuscules ou `null`.

`any` déplace l'erreur du build vers la production. `unknown` la garde au build.
