## Exercice 1 — Un User à l'ancienne

```javascript
function User(firstname, lastname, age) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.age = age;
}

// Sur le prototype : une seule fonction, partagée par toutes les instances
User.prototype.getFullName = function () {
  return this.firstname + " " + this.lastname;
};

User.prototype.isAdult = function () {
  return this.age >= 18;
};

const a = new User("Julien", "Usson", 31);
const b = new User("Louise", "Martin", 28);
console.log(a.getFullName === b.getFullName); // true
```

Si les méthodes étaient déclarées **dans** le constructeur, cette comparaison
vaudrait `false` : chaque instance aurait sa propre copie.

---

## Exercice 2 — Hériter à la main

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  return "The animal makes a noise";
};

function Dog(name) {
  Animal.call(this, name); // 1. le constructeur parent, sur notre `this`
}

Dog.prototype = Object.create(Animal.prototype); // 2. la chaîne de prototypes
Dog.prototype.constructor = Dog; // 3. réparer le constructeur

Dog.prototype.speak = function () {
  return this.name + " barks";
};
```

Sans la ligne 3, `new Dog("Rex").constructor.name` vaut `"Animal"` : en
remplaçant `Dog.prototype`, on a perdu la propriété `constructor` d'origine.
C'est sans conséquence la plupart du temps, mais c'est le genre de détail que
`class` gère à votre place.

---

## Exercice 3 — Le même User, en classe

```javascript
class User {
  constructor(firstname, lastname, age) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
  }

  getFullName() {
    return `${this.firstname} ${this.lastname}`;
  }

  isAdult() {
    return this.age >= 18;
  }
}
```

`a.getFullName === b.getFullName` vaut toujours `true` : les méthodes d'une
classe vont sur le prototype, exactement comme en ES5. Seule l'écriture change.

---

## Exercice 4 — Hériter avec extends

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return "The animal makes a noise";
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks`;
  }
}
```

Trois lignes de plomberie ES5 remplacées par `extends`. `Dog` n'a même pas
besoin de constructeur : sans lui, celui du parent est appelé tel quel.

Utiliser `this` avant `super()` lève une `ReferenceError` : l'objet n'existe
pas encore tant que le constructeur parent n'a pas tourné.

---

## Exercice 5 — Le bon speak() au bon moment

```javascript
const animals = [
  new Animal("Generic"),
  new Dog("Rex"),
  new Dog("Max"),
  new Animal("Unknown"),
];

for (const animal of animals) {
  // Une seule ligne d'appel, deux comportements
  console.log(animal.speak());
}
```

Le code appelant ne sait pas — et n'a pas besoin de savoir — s'il manipule un
`Animal` ou un `Dog`.

---

## Exercice 6 — Des méthodes sans instance

```javascript
class MathUtils {
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }
}
```

En ES5, on les posait directement sur la fonction :

```javascript
function MathUtils() {}
MathUtils.add = function (a, b) { return a + b; };
```

`new MathUtils().add(1, 2)` échoue : `add` appartient à la **classe**, pas au
prototype, donc pas aux instances.

---

## Exercice 7 — fullName qui se lit et s'écrit

```javascript
class User {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  get fullName() {
    return `${this.firstname} ${this.lastname}`;
  }

  set fullName(value) {
    const [firstname = "", ...rest] = value.trim().split(" ");
    this.firstname = firstname;
    this.lastname = rest.join(" ");
  }
}
```

Avec `"Jean"` tout seul, `lastname` devient `""` — pas `undefined`. Et le reste
est rejoint, donc `"Jean de La Fontaine"` garde `"de La Fontaine"` comme nom.

---

## Exercice 8 — Un mot de passe vraiment privé

```javascript
class User {
  #password;

  constructor(firstname, lastname, age, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.#password = password;
  }

  setPassword(pwd) {
    this.#password = pwd;
  }

  checkPassword(pwd) {
    return this.#password === pwd;
  }
}
```

`user.#password` depuis l'extérieur est une **erreur de syntaxe** — le code ne
compile même pas. Et `console.log(user)` ne montre pas le champ. Avec l'ancienne
convention `_password`, les deux fonctionnaient : ce n'était qu'un panneau
« ne pas toucher ».

⚠️ Privé ne veut pas dire sécurisé : un mot de passe en clair en mémoire reste
un mot de passe en clair. On en reparle à la séance sécurité.

---

## Exercice 9 — Traduire du vieux code

```javascript
class Vehicle {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
  }

  accelerate(value) {
    this.speed += value;
  }

  describe() {
    return `${this.brand} is going at ${this.speed} km/h`;
  }

  static isVehicle(obj) {
    return obj instanceof Vehicle;
  }
}

class Car extends Vehicle {
  constructor(brand, speed, doors) {
    super(brand, speed);
    this.doors = doors;
  }

  describe() {
    return `${this.brand} car with ${this.doors} doors going at ${this.speed} km/h`;
  }
}
```

`Vehicle.isVehicle(new Car(...))` vaut toujours `true` : `instanceof` remonte la
chaîne de prototypes, et `extends` la branche correctement — comme le faisait
`Object.create` à la main.

---

## Exercice 10 — Mini-projet : un combat

```javascript
class Player {
  #hp;

  constructor(name, hp, level) {
    this.name = name;
    this.#hp = hp;
    this.level = level;
  }

  // Lecture seule : on peut consulter les PV, pas les écrire
  get hp() {
    return this.#hp;
  }

  attack() {
    console.log(`${this.name} attacks`);
    return 10;
  }

  takeDamage(amount) {
    this.#hp = Math.max(0, this.#hp - amount);
    console.log(`${this.name} takes ${amount} damage. HP: ${this.#hp}`);
  }

  isAlive() {
    return this.#hp > 0;
  }

  static compare(p1, p2) {
    if (p1.level > p2.level) return p1;
    if (p2.level > p1.level) return p2;
    return null;
  }
}

class Warrior extends Player {
  constructor(name, hp, level, strength) {
    super(name, hp, level);
    this.strength = strength;
  }

  attack() {
    console.log(`${this.name} (Warrior) attacks with strength ${this.strength}`);
    return 10 + this.strength;
  }
}

const conan = new Warrior("Conan", 100, 5, 15);
const goblin = new Player("Goblin", 50, 2);

// Tant que les deux sont debout, chacun frappe à son tour
let attacker = conan;
let defender = goblin;

while (conan.isAlive() && goblin.isAlive()) {
  defender.takeDamage(attacker.attack());
  [attacker, defender] = [defender, attacker];
}

const loser = conan.isAlive() ? goblin : conan;
console.log(`${loser.name} is dead`);
console.log(`Winner is ${conan.isAlive() ? conan.name : goblin.name}`);
```

Le `takeDamage` du parent sert aux deux classes : seul `attack()` est surchargé.
Et comme `#hp` est privé avec un getter en lecture seule, personne ne peut
tricher en écrivant `player.hp = 9999`.
