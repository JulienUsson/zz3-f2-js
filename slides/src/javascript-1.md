---
title: Javascript 1
theme: ./theme
layout: cover
defaults:
  layout: center
---

# Javascript 1
console.log("Hello World !")

---

# Javascript en quelques mots

 * Langage interprété
 * S'exécute dans un navigateur (Chrome, Firefox, ...)
 * Impératif, orienté objet, fonctionnel
 * Créé le 4 decembre 1995
 * Standardisé sous le nom d'ECMAScript
 * N'a **AUCUN** rapport avec Java !!!

---

# Pourquoi utiliser Javascript?

 * Simple à utiliser/apprendre
 * Plein de concepts sympas (fonctionnel, asynchrone)
 * Très populaire (Premier sur [Stackoverflow Survey 2025](https://survey.stackoverflow.co/2025/technology#most-popular-technologies))
  <br/>➡️ Très grosse communauté (pleins de libs, tutos, etc...)

--- 

# l'ECMAScript

 * Avant ES5, une version tous les 3-5ans
 * A partir d'ES6 (ES2015), une version tous les ans ([TC39](https://tc39.es/))
 * Tous les navigateurs modernes supportent ES6
 * mais ne supportent **pas** toutes les nouveautés ([Caniuse](https://caniuse.com/es6))
 * Aujourd'hui ES2025

---
layout: question
---

Comment on utilise les dernières versions de Javascript ?

---

# les transpileurs

 * Historiquement [BabelJS](https://babeljs.io/)
 * Aujourd'hui [SWC](https://swc.rs/)
 * Permet de transformer un langage en un autre
 * Ne pas confondre avec un compilateur
 * ES2025 ➡️ ES6, plus de soucis de compatibilité !
 * Les [polyfills](https://developer.mozilla.org/fr/docs/Glossary/Polyfill) permettent également une meilleure rétrocompatibilité

---

![transpileurs](./assets/transpileurs.png)

---

# Quelques langages

 * TypeScript (5ème ["Admired and Desired"](https://survey.stackoverflow.co/2025/technology#admired-and-desired)) 
 * ReasonML
 * CoffeeScript
 * et pleins d'autres...

---
layout: question
---

Et ça ressemble à quoi ?

---

# Les variables

```javascript {monaco} {height:'auto'}
// Déclarer une variable
let var1 = "toto"
let var2 = 2
let var3 = 3.5
let var4 = null
let var5 = undefined

var1 = 5
var1 = "tutu"

// Déclarer une constante
const const1 = "titi"
// const1 = "tata" /!\ IMPOSSIBLE
```
⚠️ Le mot-clé `var` a été déprécié.

---

# Les conditions

```javascript {monaco-run} {height:'auto'}
let i = 0

if( i === 0 ) {
  console.log("i === 0")
} else {
  console.log("i !== 0") 
}

console.log('i == "0"', i == "0")
console.log('i == 0', i == 0)
console.log('i === "0"', i === "0")
console.log('i === 0', i === 0)
```
⚠️ Attention à la coercition

---

<img alt="Javascript coercion" src="./assets/coercion.png" width="500px" />

[Understanding Javascript Coercion in 5 Easy Steps](https://medium.com/@ashbygreg/understanding-javascript-coercion-in-5-easy-steps-347f9f1a4e36)

---

# Les boucles

```javascript {monaco} {height:'auto'}
let i = 0
while ( i < 10 ) {
    console.log(i)
    i++
}

for ( let j = 0; j < 10; j++ ) {
    console.log(j)
}
```

---

# Les fonctions

```javascript {monaco} {height:'auto'}
function add(val1, val2) {
    return val1 + val2
}
console.log(add(1, 2))

const add2 = function (val1, val2) {
    return val1 + val2
}
console.log(add2(1, 2))

const add3 = (val1, val2) => {
    return val1 + val2
}
console.log(add3(1, 2))

const add4 = (val1, val2) => val1 + val2
console.log(add4(1, 2))

const add5 = add4
console.log(add5(1, 2))
```

---

# Les closures

Une **closure** est une fonction qui :

* Est définie dans une autre fonction
* Se souvient de son **scope lexical**, même après exécution

➡️ En JavaScript, **les fonctions capturent leur environnement**.

---

# Exemple simple de closure

```javascript {monaco-run} {height:'auto'}
function counter() {
  let count = 0

  return function () {
    count++
    return count
  }
}

const increment = counter()
console.log(increment())
console.log(increment())
```

* `count` n’est plus accessible directement
* Mais il est **retenu en mémoire**

---

# Les tableaux

```javascript {monaco-run} {height:'auto', autorun:false}
const tableau = [1, 2, "toto", "tutu", 3.4]
console.log('tableau.length', tableau.length) 
console.log('tableau[0]', tableau[0]) 
console.log('tableau.at(-1)', tableau.at(-1)) 

tableau.push('titi'); console.log(tableau)
tableau.pop(); console.log(tableau)

console.log('tableau.indexOf("toto")', tableau.indexOf("toto"))
console.log('tableau.includes("toto")', tableau.includes("toto"))

console.log('[0, 1, 2] === [0, 1, 2]', [0, 1, 2] === [0, 1, 2])
```

[Et d'autres methodes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)


---

# Les objets

```javascript {monaco-run} {height:'auto', autorun:false}
const dictionnaire = {tutu: "toto", titi: 1, toto: "tutu"}
console.log(dictionnaire.tutu)
console.log(dictionnaire.titi)
console.log(dictionnaire["tutu"])
console.log(dictionnaire["tu" + "tu"])

console.log(Object.keys(dictionnaire));
console.log(Object.values(dictionnaire));

console.log('{tutu: "toto"} === {tutu: "toto"}', {tutu: "toto"} === {tutu: "toto"})
```

[Et d'autres methodes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

---

# Les collections

```javascript {monaco-run} {height:'auto', autorun:false}
const collection = [ {toto: 3, tutu: 2}, {toto: 5, tutu: 2}, {toto: 7, tutu: 1}]
console.log(collection[0].toto)
console.log(collection[0]["toto"])

const users = [{name: "toto", age: 18}, {name: "titi", age: 22}, {name: "tutu", age: 16}]

const uppercaseUsers = users.map(user => user.name.toUpperCase())
console.log(JSON.stringify(uppercaseUsers))
const majorUsers = users.filter(user => user.age >= 18)
console.log(JSON.stringify(majorUsers))
const toto = users.find(user => user.name === "toto")
console.log(JSON.stringify(toto))
```