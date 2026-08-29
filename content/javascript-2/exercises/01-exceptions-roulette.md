---
layout: exercise
title: La roulette russe
duration: 6
difficulty: 1
goal: Attraper une exception au lieu de la subir.
---

Sans modifier `russianRoulette()`, faire afficher `You're dead :(` quand l'exception est levée, et `You survived :D` sinon — avec un **seul** `try/catch`.

```javascript {monaco-run} {height:'240px', autorun:false}
function russianRoulette() {
  if (Math.random() < 0.5) {
    throw new Error("PAN")
  }
}

russianRoulette()
```

Relancez plusieurs fois : les deux cas doivent apparaître.
