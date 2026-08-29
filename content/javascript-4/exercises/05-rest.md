---
layout: exercise
title: Accepter n'importe quel nombre d'arguments
duration: 6
difficulty: 2
goal: Distinguer le rest (au paramètre) du spread (à l'appel).
---

Écrire `max(...numbers)` qui retourne le plus grand, et `0` si on ne lui passe rien.

```javascript {monaco-run} {height:'240px', autorun:false}
function max(/* à vous */) {
}

console.log(max(3, 9, 2))   // 9
console.log(max())          // 0

const values = [4, 7, 1]
console.log(max(...values))  // 7 — ici c'est du spread, pas du rest
```

Même symbole `...`, deux rôles opposés : rassembler à la déclaration, étaler à l'appel.
