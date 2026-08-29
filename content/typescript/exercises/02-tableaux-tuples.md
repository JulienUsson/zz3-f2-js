---
layout: exercise
title: Tableau ou tuple ?
duration: 6
difficulty: 1
goal: Choisir entre « plusieurs fois la même chose » et « une structure fixe ».
---

```typescript {monaco} {height:'280px'}
// 1. Un tableau de nombres, puis le même en syntaxe Array<...>
// 2. Un tableau de chaînes qui refuse un nombre
// 3. Un tuple [nom, âge] — et vérifiez qu'il refuse [31, "Julien"]

const coordinates: [number, number] = [45.7, 3.1]
coordinates.push(99) // 😱 pourquoi est-ce accepté ?
```

La dernière ligne est un trou connu du typage des tuples. Que se passe-t-il si vous déclarez le tuple `readonly` ?
