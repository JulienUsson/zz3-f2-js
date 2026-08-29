---
layout: exercise
title: Compter les succès et les échecs
duration: 8
difficulty: 2
goal: Attendre toutes les promesses, même celles qui échouent.
---

Lancer trois promesses — deux qui réussissent, une qui échoue — puis afficher le nombre de succès et le nombre d'échecs.

```javascript {monaco-run} {height:'260px', autorun:false}
const ok = (value) => Promise.resolve(value)
const ko = (reason) => Promise.reject(new Error(reason))

async function report() {
  // Promise.allSettled, puis compter par `status`
}

report()
```

Refaites le même essai avec `Promise.all` : que se passe-t-il ?
