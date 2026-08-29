---
layout: exercise
title: Interdire la mutation au build
duration: 8
difficulty: 2
goal: Faire vérifier par le compilateur ce qu'on s'imposait à la main en Javascript 4.
---

```typescript {monaco} {height:'320px'}
type Player = {
  readonly id: number
  readonly name: string
  readonly hp: number
}

const player: Player = { id: 1, name: "Alice", hp: 100 }
player.hp = 50 // ❌ que dit le compilateur ?

const players: Player[] = [player]
players.push(player) // ✅ accepté — pourquoi ?
```

1. Écrivez `damage(player, amount)` qui retourne un **nouveau** joueur.
2. Faites en sorte que `players.push(...)` soit refusé lui aussi.

En Javascript 4, l'immutabilité était une discipline. Ici, c'est le compilateur qui la fait respecter.
