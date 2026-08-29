---
layout: exercise
title: Une closure qui compte
duration: 8
difficulty: 2
goal: Comprendre qu'une fonction retient l'environnement dans lequel elle est née.
---

Écrire `createCounter()` qui retourne une fonction : chaque appel renvoie `1`, `2`, `3`… Deux compteurs créés séparément ne doivent **pas** partager leur valeur.

```javascript {monaco-run} {height:'220px', autorun:false}
function createCounter() {
  // à vous
}

const a = createCounter()
const b = createCounter()
console.log(a(), a(), a()) // 1 2 3
console.log(b())           // 1
```

Bonus : `createAdder(n)` retourne une fonction qui ajoute `n` à son argument.
