---
layout: exercise
title: Le bon speak() au bon moment
duration: 5
difficulty: 1
goal: Constater que la méthode appelée dépend de l'objet, pas du code appelant.
---

Mettre plusieurs `Animal` et `Dog` dans un tableau, le parcourir, appeler `speak()` sur chacun.

```javascript {monaco-run} {height:'240px', autorun:false}
// Reprenez vos classes Animal et Dog

const animals = [/* mélangez des Animal et des Dog */]

for (const animal of animals) {
  console.log(animal.speak())
}
```

Une seule ligne d'appel, deux comportements : c'est ça, le **polymorphisme**.
