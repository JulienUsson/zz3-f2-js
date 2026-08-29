---
layout: exercise
title: Typer une fonction
duration: 6
difficulty: 1
goal: Paramètres, retour, et paramètre facultatif.
---

```typescript {monaco} {height:'280px'}
// 1. `divide(a, b)` retourne un number, et throw si b vaut 0
// 2. `greet(name?)` affiche "Hello World" quand on ne passe rien
// 3. Que devient le type de retour si vous l'omettez sur divide ?

function divide(a, b) {
  return a / b
}
```

Enlevez le type de retour de `divide` et survolez-la : TypeScript l'infère. Alors pourquoi l'écrire ? Parce qu'il vous prévient si le corps cesse de correspondre.
