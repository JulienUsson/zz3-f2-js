---
layout: exercise
title: L'union discriminée
duration: 10
difficulty: 2
goal: Le motif le plus utile de TypeScript — et celui du mini-projet.
---

```typescript {monaco} {height:'320px'}
type Circle = { kind: "circle"; radius: number }
type Square = { kind: "square"; side: number }
type Shape = Circle | Square

function area(shape: Shape): number {
  // switch sur shape.kind
}
```

1. Écrivez `area`. Dans chaque branche, survolez `shape` : TypeScript a **restreint** le type tout seul.
2. Ajoutez `type Triangle` à l'union sans toucher à `area`. Que se passe-t-il ?
3. Ajoutez un `default` qui fait `const _exhaustif: never = shape`. Maintenant, oublier un cas devient une **erreur de compilation**.

C'est exactement la structure `Warrior | Mage` du mini-projet.
