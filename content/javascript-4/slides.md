---
title: Javascript 4
theme: slidev-theme-javascript
addons:
  - slidev-addon-javascript
layout: cover
defaults:
  layout: center
---

# Javascript 4

Un peu de sucre dans JavaScript


---
src: ./quiz.md
---

---

# Valeurs par défaut

```javascript {monaco-run} {height:'auto'}
function greet(name = "World") {
  console.log(`Hello ${name}`)
}

greet()
greet("Alice")
```

- Par défaut, les paramètres non fournis sont `undefined`

---
src: ./exercises/01-valeurs-par-defaut.md
---

---

# Elvis operator

Nom inspiré de `?:` dans d’autres langages

```javascript {monaco-run} {height:'auto'}
let user = { name: "Alice", address: { city: "Paris" } }
console.log(user.address?.city)
console.log(user.contact?.phone)
```

---

# Nullish coalescing

Valeur par défaut **si la valeur est null ou undefined**

```javascript {monaco-run} {height:'auto'}
let foo = null ?? "default"
console.log(foo)
let bar = 0 ?? 42
console.log(bar)
```

---

# Optional chaining + Nullish coalescing

```javascript {monaco-run} {height:'auto'}
let user = { name: "Alice", address: null }
let city = user.address?.city ?? "Unknown"
console.log(city)
```

---

# Nullish assignment

```javascript {monaco-run} {height:'auto'}
let theme = null
theme ??= "dark"
console.log(theme)
```

➡️ Affecte seulement si `null` ou `undefined`

---
src: ./exercises/02-nullish.md
---

---

# Destructuring

```javascript {monaco-run} {height:'auto'}
let user = { firstname: "Alice", lastname: "Smith", age: 25 }
let { age, ...name } = user
console.log(age, JSON.stringify(name))

let numbers = [1,2,3,4,5]
let [one, ...rest] = numbers
console.log(one, rest)
```

---
src: ./exercises/03-destructuring.md
---

---

# Array spread operator

```javascript {monaco-run} {height:'auto'}
let arr1 = [2, 3]
let arr2 = [1, ...arr1, 4]
console.log(arr2)
```

---

# Object spread operator

```javascript {monaco-run} {height:'auto', autorun:false}
let obj1 = { a: 1, b: 2 }
let obj2 = { ...obj1, b: 1, c: 3 }
console.log(JSON.stringify(obj2))
```


```javascript {monaco-run} {height:'auto', autorun:false}
let obj1 = { a: 1, b: 2 }
let obj2 = {  b:2, c: 3, ...obj1 }
console.log(JSON.stringify(obj2))
```

---
src: ./exercises/04-spread.md
---

---

# Rest operator

```javascript {monaco-run} {height:'auto'}
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b)
}
console.log(sum(1, 2, 3, 4))
```

---
src: ./exercises/05-rest.md
---

---

# Template strings

```javascript {monaco-run} {height:'auto'}
let name = "Alice"
let age = 25

let sentence = `My name is ${name}
and I am ${age} years old`

console.log(sentence)
```

---
src: ./exercises/06-template-strings.md
---

---

# L’immutabilité

Un objet **immutable** ne change jamais.

➡️ On crée une **nouvelle valeur** au lieu de modifier l’existante.

---

# Pourquoi l’immutabilité ?

- Moins de bugs
- Plus prévisible
- Plus simple à tester
- Indispensable en React (On verra ça plus tard)

---

# Exemple mutable

```javascript {monaco-run} {height:'auto', autorun:false}
let user1 = { name: "Alice" }

let user2 = user1
user2.name = "Bob"

console.log(JSON.stringify(user1))
console.log(JSON.stringify(user2))
console.log(user1 === user2)
```

---

# Exemple immutable

```javascript {monaco-run} {height:'auto', autorun:false}
let user = { name: "Alice" }

let updatedUser = {
  ...user,
  name: "Bob"
}

console.log(JSON.stringify(user))
console.log(JSON.stringify(updatedUser))
console.log(user === updatedUser)
```

---
src: ./exercises/07-mutation-cachee.md
---

---
src: ./exercises/08-detection-de-mutation.md
---

---

# Immutabilité avec les tableaux

```javascript {monaco-run} {height:'auto'}
let numbers = [1, 2, 3]
let newNumbers = [...numbers, 4]

console.log(numbers)
console.log(newNumbers)
console.log(numbers === newNumbers)
```

---
src: ./exercises/09-refactor-array.md
---

---
src: ./exercises/10-refactor-object.md
---

---
src: ./exercises/11-immutabilite-profonde.md
---

---
src: ./exercises/12-reference-partagee.md
---

---
src: ./exercises/13-update-conditionnel.md
---

---
layout: question
---

Est-ce qu'on a tout vu de javascript ?

---

# Les autres concepts dont on ne parlera pas

- Proxy (méta-programmation)
- Generator function (itération / async avancé)
- Symbol (clé unique)
- Worker (multithreading navigateur)
- ...

➡️ Vous n’avez **PAS** besoin de tout connaître pour être un bon dev JS
