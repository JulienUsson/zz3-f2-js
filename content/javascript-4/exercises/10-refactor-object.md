---
layout: exercise
title: Incrémenter sans modifier
duration: 6
difficulty: 2
goal: Copier un objet en changeant un champ, sans le recopier à la main.
---

```javascript {monaco-run} {height:'260px', autorun:false}
const player = { name: "Alice", score: 10, level: 3 }

function incrementScore(player) {
  player.score += 1
  return player
}

console.log(incrementScore(player))
console.log(player) // 😱
```

Réécrivez `incrementScore` : `player` ne doit jamais changer, et **sans énumérer** `name` et `level` un par un.
