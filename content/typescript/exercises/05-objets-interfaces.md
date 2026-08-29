---
layout: exercise
title: Décrire la forme d'un objet
duration: 8
difficulty: 1
goal: Passer d'un type inline à une interface réutilisable.
---

```typescript {monaco} {height:'300px'}
// 1. Déclarez `user` avec un type inline { firstname, lastname, age }
// 2. Sortez cette forme dans une interface `User`, et réutilisez-la
// 3. Ajoutez `email` en propriété facultative
// 4. Créez `interface Admin extends User` avec `permissions: string[]`

// 5. Que dit TypeScript si vous ajoutez une propriété non déclarée ?
```

Le point 5 s'appelle le *excess property check* : il ne s'applique qu'aux objets littéraux assignés directement. Essayez en passant par une variable intermédiaire.
