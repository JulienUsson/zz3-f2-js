---
title: "Javascript 1"
---

## Correction Exercice 1 : Additionner 42

```javascript
let numbers = [20, 30, 42, 66, 99];

// 1. En utilisant while
let i = 0;
let resWhile = [];
while (i < numbers.length) {
  resWhile.push(numbers[i] + 42);
  i++;
}

// 2. En utilisant for
let resFor = [];
for (let j = 0; j < numbers.length; j++) {
  resFor.push(numbers[j] + 42);
}

// 3. En utilisant for of
let resForOf = [];
for (let number of numbers) {
  resForOf.push(number + 42);
}

// 4. En utilisant map()
let resMap = numbers.map((number) => number + 42);
```

---

## Correction Exercice 2 : Calculer la somme

```javascript
let numbers = [20, 30, 42, 66, 99];

// 1. En utilisant for of
let sumForOf = 0;
for (let number of numbers) {
  sumForOf += number;
}

// 2. En utilisant reduce()
let sumReduce = numbers.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);
```

---

## Correction Exercice 3 : Afficher les valeurs

```javascript
let colors = ["blue", "red", "green", "yellow", "cyan"];

// En utilisant forEach()
colors.forEach((color) => console.log(color));
```

---

## Correction Exercice 4 : Trouver un utilisateur spécifique

```javascript
let users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 28 },
  { name: "Bastien", age: 22 },
  { name: "Raphaël", age: 28 },
  { name: "Alexandre", age: 42 },
  { name: "Julien", age: 55 },
];

// En utilisant find()
let julien31 = users.find((user) => user.name === "Julien" && user.age === 31);
```

---

## Correction Exercice 5 : Filtrer les moins de 26 ans

```javascript
let users = [
  { name: "Julien", age: 26 },
  { name: "Louise", age: 24 },
  { name: "Bastien", age: 22 },
  { name: "Raphaël", age: 28 },
  { name: "Alexandre", age: 42 },
  { name: "Julien", age: 31 },
];

// En utilisant filter()
// Note: On demande strictement moins de 26 ans, donc 26 n'est pas inclus
let youngUsers = users.filter((user) => user.age < 26);
```

---

## Correction Exercice 6 : Récupérer uniquement les prénoms

```javascript
let users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 24 },
  { name: "Bastien", age: 22 },
];

// En utilisant map()
let names = users.map((user) => user.name);
```

---

## Correction Exercice 7 : Vérifier si au moins un a plus de 40 ans

```javascript
let users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 24 },
  { name: "Alexandre", age: 42 },
];

// En utilisant some()
let hasSenior = users.some((user) => user.age > 40);
```

---

## Correction Exercice 8 : Vérifier si tout le monde est majeur

```javascript
let users = [
  { name: "Louise", age: 24 },
  { name: "Bastien", age: 22 },
  { name: "Raphaël", age: 28 },
];

// En utilisant every()
let allAdults = users.every((user) => user.age >= 18);
```

---

## Correction Exercice 9 : Trier les utilisateurs

```javascript
let users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 24 },
  { name: "Bastien", age: 22 },
];

// 1. En utilisant sort() (Attention : modifie le tableau original)
let sortedByAge = [...users].sort((a, b) => a.age - b.age);

// 2. En utilisant toSorted() (Nouveauté ES2023 : ne modifie pas l'original)
let toSortedByAge = users.toSorted((a, b) => a.age - b.age);

// 3. En ordre décroissant
let sortedDescending = users.toSorted((a, b) => b.age - a.age);
```

---

## Correction Exercice 10 : Chaînage (Filter & Map)

```javascript
let users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 24 },
  { name: "Bastien", age: 22 },
  { name: "Alexandre", age: 42 },
];

// Récupérer noms (< 30 ans) en majuscules sans variable intermédiaire
let result = users
  .filter((user) => user.age < 30)
  .map((user) => user.name.toUpperCase());

console.log(result); // ["LOUISE", "BASTIEN"]
```
