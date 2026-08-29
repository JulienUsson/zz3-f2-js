---
layout: exercise
title: Hériter à la main
duration: 10
difficulty: 3
goal: Voir précisément ce que `extends` fera à votre place.
---

Créer `Animal(name)` avec `speak()` → `"The animal makes a noise"`, puis `Dog` qui en hérite et surcharge `speak()` → `"Rex barks"`.

```javascript {monaco-run} {height:'280px', autorun:false}
function Animal(name) {
  this.name = name
}
Animal.prototype.speak = function () {
  return "The animal makes a noise"
}

function Dog(name) {
  // 1. appeler le constructeur parent
}
// 2. brancher la chaîne de prototypes
// 3. surcharger speak()

console.log(new Animal("Generic").speak()) // "The animal makes a noise"
console.log(new Dog("Rex").speak())        // "Rex barks"
```

Oubliez volontairement la ligne `Dog.prototype.constructor = Dog` : que vaut `new Dog("Rex").constructor.name` ?
