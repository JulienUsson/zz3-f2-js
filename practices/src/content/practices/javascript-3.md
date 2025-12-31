---
title: "Javascript 3"
slides: "javascript-3"
---

Avant de commencer, n'oubliez pas que la documentation de Javascript est disponible [ici](https://developer.mozilla.org/fr/docs/Web/JavaScript) ou [là](https://www.w3schools.com/js/default.asp). Nous utiliserons [CodeSandbox](https://codesandbox.io/s/vanilla), un environnement en ligne pour coder et exécuter du Javascript.

---

## Exercice 1

Créer un objet `user` avec :

- un prénom
- un nom
- un âge
- une méthode `getFullName()` qui retourne `"Prénom Nom"`
- une méthode `isAdult()` qui retourne `true` si l'âge est supérieur ou égal à 18, `false` sinon

```javascript
// Exemple d'utilisation
const user = new User("Julien", "Usson", 31);
console.log(user.getFullName()); // "Julien Usson"
console.log(user.isAdult()); // true
```

- En utilisant le [prototype](https://developer.mozilla.org/fr/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object_prototypes) (ES5)
- En utilisant le mot-clé [class](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes) (ES6+)

---

## Exercice 2 : Encapsulation et propriétés privées

Rajouter une propriété privée `password` à l’objet `user` de l’exercice précédent.

- Ajouter une méthode `setPassword(pwd)` pour modifier le mot de passe
- Ajouter une méthode `checkPassword(pwd)` qui retourne `true` si le mot de passe est correct, `false` sinon

```javascript
// Exemple d'utilisation
const user = new User("Julien", "Usson", 31, "mySecretPwd");
console.log(user.checkPassword("wrongPwd")); // false
console.log(user.checkPassword("mySecretPwd")); // true
user.setPassword("newPwd");
console.log(user.checkPassword("mySecretPwd")); // false
console.log(user.checkPassword("newPwd")); // true
```

---

## Exercice 3 : Héritage

Créer une classe `Animal` avec :

- `name`
- une méthode `speak()` → `"The animal makes a noise"`

Créer une classe `Dog` qui hérite de `Animal` et qui surcharge `speak()` → `"Rex barks"`

```javascript
// Exemple d'utilisation
const animal = new Animal("Generic Animal");
console.log(animal.speak()); // "The animal makes a noise"

const dog = new Dog("Rex");
console.log(dog.speak()); // "Rex barks"
```

- En utilisant le [prototype](https://developer.mozilla.org/fr/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object_prototypes) (ES5)
- En utilisant le mot-clé [class](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes) (ES6+)

---

## Exercice 4 : Polymorphisme

À partir de l’exercice précédent :

- Créer un tableau contenant plusieurs `Animal` et `Dog`
- Boucler sur le tableau
- Appeler `speak()` sur chaque élément

💡 Observer que **la bonne méthode est appelée selon le type réel de l’objet**.

---

## Exercice 5 : Méthodes statiques

Créer une classe `MathUtils` avec :

- une méthode statique `add(a, b)`
- une méthode statique `multiply(a, b)`

- En utilisant le [prototype](https://developer.mozilla.org/fr/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object_prototypes) (ES5)
- En utilisant le mot-clé [static](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes/static) (ES6+)

## Exercice 6 : Getters et setters

Créer une classe `User` avec :

- `firstname`
- `lastname`

Ajouter :

- un getter `fullName`
- un setter `fullName` permettant de modifier prénom et nom à partir d’une seule chaîne

```js
user.fullName = "Jean Dupont";
console.log(user.firstname); // Jean
console.log(user.lastname); // Dupont
```

---

## Exercice 7 : Refactor ES5 → ES6+

Voici un code ES5 :

```javascript
function Vehicle(brand, speed) {
  this.brand = brand;
  this.speed = speed;
}

Vehicle.prototype.accelerate = function (value) {
  this.speed += value;
};

Vehicle.prototype.describe = function () {
  return this.brand + " is going at " + this.speed + " km/h";
};

Vehicle.isVehicle = function (obj) {
  return obj instanceof Vehicle;
};

function Car(brand, speed, doors) {
  Vehicle.call(this, brand, speed);
  this.doors = doors;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.describe = function () {
  return (
    this.brand +
    " car with " +
    this.doors +
    " doors going at " +
    this.speed +
    " km/h"
  );
};
```

- Réécrire ce code en **ES6+**

---

## Exercice 8 : Mini projet

### Créer un `Player`

Créer une classe `Player` qui prend :

- `name`
- `hp` (points de vie) **non modifiables directement**
- `level`

Le player doit avoir :

- une méthode `attack()` → affiche `"Player attacks"`
- une méthode `takeDamage(amount)` → enlève des points de vie
- une méthode `isAlive()` → retourne `true` si hp > 0

### Héritage : `Warrior`

Créer une classe `Warrior` qui :

- hérite de `Player`
- possède une propriété supplémentaire `strength`

Le `Warrior` :

- surcharge la méthode `attack()` pour afficher
  `"Warrior attacks with strength X"`
- inflige plus de dégâts qu’un Player classique

### Méthode statique

Ajouter une **méthode statique** sur `Player` :

```js
Player.compare(player1, player2);
```

Cette méthode :

- retourne le player avec le **niveau le plus élevé**
- ou `null` si égalité

### Simulation de combat

Écrire un script qui :

- crée au moins **2 joueurs** aléatoirement
- les fait s’attaquer tour à tour
- s’arrête quand l’un des deux est mort
- affiche le vainqueur

Exemple de logs attendus :

```
Warrior attacks with strength 10
Player takes 10 damage
Player HP: 0
Player is dead
Winner is Conan
```

### Améliorations possibles

- Ajouter une classe `Mage` avec des attaques magiques
- Ajouter des armes aux joueurs
- Ajouter de l’équipement (armure, casque, etc.) réduisant les dégâts reçus
- ...
