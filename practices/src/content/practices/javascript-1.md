---
title: "Javascript 1"
slides: "javascript-1"
---

Avant de commencer, n'oubliez pas que la documentation de Javascript est disponible [ici](https://developer.mozilla.org/fr/docs/Web/JavaScript) ou [là](https://www.w3schools.com/js/default.asp). Nous utiliserons [CodeSandbox](https://codesandbox.io/s/vanilla) (fonctionne mieux avec Chrome/Chromium) (fonctionne mieux avec Chrome/Chromium), un environnement en ligne pour coder et exécuter du Javascript.

---

## Exercice 1 :

Ecrire un script qui additionne 42 à chaque élément du tableau.

```javascript
const numbers = [20, 30, 42, 66, 99];
// Résultat attendu : [62, 72, 84, 108, 141]
```

- En utilisant [while](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/while)
- En utilisant [for](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/for)
- En utilisant [for of](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/for...of)
- En utilisant [map()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

---

## Exercice 2 :

Ecrire un script qui calcule la somme d'un tableau.

```javascript
const numbers = [20, 30, 42, 66, 99];
// Résultat attendu : 257
```

- En utilisant [for of](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/for...of)
- En utilisant [reduce()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

---

## Exercice 3 :

Ecrire un script qui affiche dans la console, toutes les valeurs du tableau.

```javascript
const colors = ["blue", "red", "green", "yellow", "cyan"];
// Résultat attendu : blue red green yellow cyan
```

- En utilisant [forEach()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

---

## Exercice 4 :

Ecrire un script qui récupère l'objet `{name: "Julien", age: 31}` du tableau.

```javascript
const users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 28 },
  { name: "Bastien", age: 22 },
  { name: "Raphaël", age: 28 },
  { name: "Alexandre", age: 42 },
  { name: "Julien", age: 55 },
];
// Résultat attendu : {name: "Julien", age: 31}
```

- En utilisant [find()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

---

## Exercice 5 :

Ecrire un script qui récupère les personnes ayant moins de 26ans du tableau.

```javascript
const users = [
  { name: "Julien", age: 26 },
  { name: "Louise", age: 24 },
  { name: "Bastien", age: 22 },
  { name: "Raphaël", age: 28 },
  { name: "Alexandre", age: 42 },
  { name: "Julien", age: 31 },
];
// Résultat attendu : [{name: "Julien", age: 26}, {name: "Louise", age: 24}, {name: "Bastien", age: 22}]
```

- En utilisant [filter()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

---

## Exercice 6

Écrire un script qui retourne un tableau contenant uniquement les prénoms des utilisateurs.

```javascript
const users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 24 },
  { name: "Bastien", age: 22 },
];
// Résultat attendu : ["Julien", "Louise", "Bastien"]
```

- En utilisant [map()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

---

## Exercice 7

Écrire un script qui vérifie si **au moins une personne** a plus de 40 ans.

```javascript
const users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 24 },
  { name: "Alexandre", age: 42 },
];
// Résultat attendu : true
```

- En utilisant [some()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

---

## Exercice 8

Écrire un script qui vérifie si **toutes les personnes** sont majeures.

```javascript
const users = [
  { name: "Louise", age: 24 },
  { name: "Bastien", age: 22 },
  { name: "Raphaël", age: 28 },
];
// Résultat attendu : true
```

- En utilisant [every()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

---

## Exercice 9

Écrire un script qui trie les utilisateurs par âge croissant.

```javascript
const users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 24 },
  { name: "Bastien", age: 22 },
];
// Résultat attendu :
// [
//   { name: "Bastien", age: 22 },
//   { name: "Louise", age: 24 },
//   { name: "Julien", age: 31 }
// ]
```

- En utilisant [sort()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- En utilisant [toSorted()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)
- En ordre décroissant

---

## Exercice 10

À partir du tableau suivant, récupérer les noms des personnes de moins de 30 ans, en majuscules sans passer par une variable intermédiaire.

```javascript
const users = [
  { name: "Julien", age: 31 },
  { name: "Louise", age: 24 },
  { name: "Bastien", age: 22 },
  { name: "Alexandre", age: 42 },
];
// Résultat attendu : ["LOUISE", "BASTIEN"]
```

- En utilisant [filter()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) et [map()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
