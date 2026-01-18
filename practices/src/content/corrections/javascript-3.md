---
title: "Javascript 3"
---

## Exercice 1 : Prototypes vs Classes

### Version ES5 (Prototypes)

```javascript
function User(firstname, lastname, age) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.age = age;
}

User.prototype.getFullName = function () {
  return this.firstname + " " + this.lastname;
};

User.prototype.isAdult = function () {
  return this.age >= 18;
};
```

### Version ES6+ (Classes)

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

---

## Exercice 2 : Encapsulation et propriétés privées

```javascript
class User {
  #password; // Déclaration de la propriété privée

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

---

## Exercice 3 : Héritage

### Version ES5

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  return "The animal makes a noise";
};

function Dog(name) {
  Animal.call(this, name); // Appelle le constructeur parent
}

// On lie les prototypes
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function () {
  return this.name + " barks";
};
```

### Version ES6+

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

---

## Exercice 4 : Polymorphisme

```javascript
const animals = [
  new Animal("Generic"),
  new Dog("Rex"),
  new Dog("Max"),
  new Animal("Unknown"),
];

animals.forEach((animal) => {
  // Le moteur JS appelle la bonne méthode selon le type réel de l'objet
  console.log(animal.speak());
});
```

---

## Exercice 5 : Méthodes statiques

### Version ES5

```javascript
function MathUtils() {}

MathUtils.add = function (a, b) {
  return a + b;
};

MathUtils.multiply = function (a, b) {
  return a * b;
};
```

### Version ES6+

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

---

## Exercice 6 : Getters et setters

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
    const parts = value.split(" ");
    this.firstname = parts[0] || "";
    this.lastname = parts[1] || "";
  }
}
```

---

## Exercice 7 : Refactor ES5 → ES6+

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

---

## Exercice 8 : Mini projet (Simulation de combat)

```javascript
class Player {
  #hp; // PV privés

  constructor(name, hp, level) {
    this.name = name;
    this.#hp = hp;
    this.level = level;
  }

  get hp() {
    return this.#hp;
  }

  attack() {
    console.log(`${this.name} attacks`);
    return 10; // Dégâts de base
  }

  takeDamage(amount) {
    this.#hp -= amount;
    if (this.#hp < 0) this.#hp = 0;
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
    const damage = 10 + this.strength;
    console.log(
      `${this.name} (Warrior) attacks with strength ${this.strength}`
    );
    return damage;
  }
}

// Script de simulation
const conan = new Warrior("Conan", 100, 5, 15);
const goblin = new Player("Goblin", 50, 2);

console.log("Fight Starts");

while (conan.isAlive() && goblin.isAlive()) {
  // Tour de Conan
  const dmg1 = conan.attack();
  goblin.takeDamage(dmg1);

  if (!goblin.isAlive()) {
    console.log(`${goblin.name} is dead.`);
    break;
  }

  // Tour du Goblin
  const dmg2 = goblin.attack();
  conan.takeDamage(dmg2);

  if (!conan.isAlive()) {
    console.log(`${conan.name} is dead.`);
    break;
  }
}

const winner = conan.isAlive() ? conan.name : goblin.name;
console.log(`Winner is ${winner}`);
```
