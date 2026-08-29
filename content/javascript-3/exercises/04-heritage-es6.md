---
layout: exercise
title: Hériter avec extends
duration: 8
difficulty: 1
goal: Retrouver le résultat de l'héritage ES5 en trois mots-clés.
---

Réécrire `Animal` et `Dog` avec `class`, `extends` et `super`.

```javascript {monaco-run} {height:'260px', autorun:false}
class Animal {
  // à vous
}

class Dog extends Animal {
  // à vous
}

console.log(new Animal("Generic").speak()) // "The animal makes a noise"
console.log(new Dog("Rex").speak())        // "Rex barks"
```

Essayez d'utiliser `this` dans le constructeur de `Dog` **avant** d'appeler `super()`. Que dit le message d'erreur ?
