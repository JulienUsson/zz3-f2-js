---
layout: exercise
title: Des méthodes sans instance
duration: 5
difficulty: 1
goal: Distinguer ce qui appartient à la classe de ce qui appartient à l'objet.
---

Créer `MathUtils` avec deux méthodes statiques : `add(a, b)` et `multiply(a, b)`.

```javascript {monaco-run} {height:'220px', autorun:false}
class MathUtils {
  // à vous
}

console.log(MathUtils.add(1, 2))       // 3
console.log(MathUtils.multiply(6, 7))  // 42
```

Essayez `new MathUtils().add(1, 2)`. Pourquoi est-ce que ça échoue ?
