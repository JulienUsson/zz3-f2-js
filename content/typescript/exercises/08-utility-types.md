---
layout: exercise
title: Dériver un type d'un autre
duration: 8
difficulty: 2
goal: Ne jamais réécrire à la main un type qui existe déjà.
---

```typescript {monaco} {height:'320px'}
interface User {
  id: number
  name: string
  email: string
  password: string
}

// 1. `PublicUser` : User sans le password
// 2. `UserPreview` : seulement id et name
// 3. `UserUpdate` : toutes les propriétés facultatives, sauf l'id qui reste requis
// 4. `ReadonlyUser` : toutes les propriétés en lecture seule
```

Ajoutez une propriété à `User` : combien de vos types doivent être modifiés à la main ? C'est tout l'intérêt.
