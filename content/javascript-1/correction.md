## Exercice 1 — Additionner 42

```javascript
const numbers = [20, 30, 42, 66, 99];

// 1. En utilisant while
let i = 0;
const resWhile = [];
while (i < numbers.length) {
  resWhile.push(numbers[i] + 42);
  i++;
}

// 2. En utilisant for
const resFor = [];
for (let j = 0; j < numbers.length; j++) {
  resFor.push(numbers[j] + 42);
}

// 3. En utilisant for of
const resForOf = [];
for (const number of numbers) {
  resForOf.push(number + 42);
}
```

---

## Exercice 2 — La somme d'un tableau

```javascript
const numbers = [20, 30, 42, 66, 99];

let sum = 0;
for (const number of numbers) {
  sum += number;
}
console.log(sum); // 257
```

---

## Exercice 3 — Trois façons d'écrire une fonction

```javascript
// 1. Déclaration de fonction
function multiply(a, b) {
  return a * b;
}

// 2. Fonction anonyme stockée dans une variable
const multiply2 = function (a, b) {
  return a * b;
};

// 3. Fonction fléchée, retour implicite
const multiply3 = (a, b) => a * b;

console.log(multiply(6, 7), multiply2(6, 7), multiply3(6, 7)); // 42 42 42
```

---

## Exercice 4 — Une closure qui compte

```javascript
function createCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const a = createCounter();
const b = createCounter();
console.log(a(), a(), a()); // 1 2 3
console.log(b()); // 1

// Bonus
const createAdder = (n) => (value) => value + n;
const add42 = createAdder(42);
console.log(add42(10)); // 52
```

Chaque appel à `createCounter()` crée un **nouvel** environnement : les deux compteurs
ont chacun leur propre `count`.

---

## Exercice 5 — Afficher chaque couleur

```javascript
const colors = ["blue", "red", "green", "yellow", "cyan"];

colors.forEach((color) => console.log(color));
```

---

## Exercice 6 — Manipuler un objet

```javascript
const user = { name: "Julien", age: 31, city: "Clermont-Ferrand" };

console.log(user.city);

user.job = "Développeur";

console.log(Object.keys(user)); // ["name", "age", "city", "job"]
console.log(Object.values(user)); // ["Julien", 31, "Clermont-Ferrand", "Développeur"]
```

---

## Exercice 7 — map()

```javascript
const users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 24 },
  { name: "Bastien", age: 22 },
];

const names = users.map((user) => user.name);
console.log(names); // ["Julien", "Louise", "Bastien"]

// Bonus : l'exercice 1 en une ligne
const numbers = [20, 30, 42, 66, 99];
console.log(numbers.map((number) => number + 42));
```

---

## Exercice 8 — filter()

```javascript
const users = [
  { name: "Julien", age: 25 },
  { name: "Louise", age: 24 },
  { name: "Bastien", age: 22 },
  { name: "Raphaël", age: 28 },
  { name: "Alexandre", age: 42 },
];

// « moins de 26 ans » : 26 n'est pas inclus
const youngUsers = users.filter((user) => user.age < 26);
```

---

## Exercice 9 — find()

```javascript
const users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 28 },
  { name: "Bastien", age: 22 },
  { name: "Alexandre", age: 42 },
  { name: "Julien", age: 55 },
];

const julien31 = users.find((user) => user.name === "Julien" && user.age === 31);

// Sans le critère sur l'âge, find() renvoie le PREMIER Julien (31 ans ici).
// Quand rien ne correspond, find() renvoie undefined.
console.log(users.find((user) => user.name === "Inconnu")); // undefined
```

---

## Exercice 10 — some() et every()

```javascript
const users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 24 },
  { name: "Alexandre", age: 42 },
];

console.log(users.some((user) => user.age > 40)); // true
console.log(users.every((user) => user.age >= 18)); // true
```

---

## Exercice 11 — Trier par âge

```javascript
const users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 24 },
  { name: "Bastien", age: 22 },
];

// 1. sort() MODIFIE le tableau d'origine : on le copie avant
const sortedByAge = [...users].sort((a, b) => a.age - b.age);

// 2. toSorted() (ES2023) retourne un nouveau tableau, l'original est intact
const toSortedByAge = users.toSorted((a, b) => a.age - b.age);

// 3. Ordre décroissant
const sortedDescending = users.toSorted((a, b) => b.age - a.age);
```

Si vous appelez `users.sort(...)` directement puis affichez `users`, il est trié :
c'est une **mutation**. On y reviendra en Javascript 4.

---

## Exercice 12 — reduce()

```javascript
const numbers = [20, 30, 42, 66, 99];

const sum = numbers.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);
console.log(sum); // 257

// Bonus : l'âge moyen
const users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 24 },
  { name: "Bastien", age: 22 },
];
const averageAge =
  users.reduce((total, user) => total + user.age, 0) / users.length;
```

---

## Exercice 13 — Enchaîner les méthodes

```javascript
const users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 24 },
  { name: "Bastien", age: 22 },
  { name: "Alexandre", age: 42 },
];

const result = users
  .filter((user) => user.age < 30)
  .map((user) => user.name.toUpperCase());

console.log(result); // ["LOUISE", "BASTIEN"]
```
