---
layout: exercise
title: Limiter la concurrence
duration: 15
difficulty: 3
bonus: true
goal: Le morceau de bravoure de la séance.
---

Écrire `parallelLimit(tasks, limit)` : un tableau de fonctions retournant des promesses, dont jamais plus de `limit` ne s'exécutent en même temps.

```javascript {monaco-run} {height:'300px', autorun:false}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let running = 0
let peak = 0
const task = (n) => async () => {
  running++; peak = Math.max(peak, running)
  await delay(200)
  running--
  return n
}

async function parallelLimit(tasks, limit) {
  // à vous
}

const tasks = [1, 2, 3, 4, 5, 6].map(task)
parallelLimit(tasks, 2).then((r) => console.log(r, "| pic de parallélisme :", peak))
```

✅ Attendu : `[1, 2, 3, 4, 5, 6]` dans l'ordre, et un pic de **2**.

ℹ️ `Promise.race` sait vous dire quelle tâche vient de finir.
