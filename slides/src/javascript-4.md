---
title: Javascript 4
theme: ./theme
layout: cover
defaults:
  layout: center
---

# Javascript 4

Un peu de sucre dans JavaScript

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

# Elvis operator

Nom inspiré de `?:` dans d’autres langages

```javascript {monaco-run} {height:'auto'}
const user = { name: "Alice", address: { city: "Paris" } }
console.log(user.address?.city)
console.log(user.contact?.phone)
```

---

# Nullish coalescing

Valeur par défaut **si la valeur est null ou undefined**

```javascript {monaco-run} {height:'auto'}
const foo = null ?? "default"
console.log(foo)
const bar = 0 ?? 42
console.log(bar)
```

---

# Optional chaining + Nullish coalescing

```javascript {monaco-run} {height:'auto'}
const user = { name: "Alice", address: null }
const city = user.address?.city ?? "Unknown"
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

# Destructuring

```javascript {monaco-run} {height:'auto'}
const user = { firstname: "Alice", lastname: "Smith", age: 25 }
const { age, ...name } = user
console.log(age, JSON.stringify(name))

const numbers = [1,2,3,4,5]
const [one, ...rest] = numbers
console.log(one, rest)
```

---

# Array spread operator

```javascript {monaco-run} {height:'auto'}
const arr1 = [2, 3]
const arr2 = [1, ...arr1, 4]
console.log(arr2)
```

---

# Object spread operator

```javascript {monaco-run} {height:'auto', autorun:false}
const obj1 = { a: 1, b: 2 }
const obj2 = { ...obj1, b: 1, c: 3 }
console.log(JSON.stringify(obj2))
```


```javascript {monaco-run} {height:'auto', autorun:false}
const obj1 = { a: 1, b: 2 }
const obj2 = {  b:2, c: 3, ...obj1 }
console.log(JSON.stringify(obj2))
```

---

# Rest operator

```javascript {monaco-run} {height:'auto'}
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b)
}
console.log(sum(1, 2, 3, 4))
```

---

# Template strings

```javascript {monaco-run} {height:'auto'}
const name = "Alice"
const age = 25

const sentence = `My name is ${name}
and I am ${age} years old`

console.log(sentence)
```

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
const user1 = { name: "Alice" }

const user2 = user1
user2.name = "Bob"

console.log(JSON.stringify(user1))
console.log(JSON.stringify(user2))
console.log(user1 === user2)
```

---

# Exemple immutable

```javascript {monaco-run} {height:'auto', autorun:false}
const user = { name: "Alice" }

const updatedUser = {
  ...user,
  name: "Bob"
}

console.log(JSON.stringify(user))
console.log(JSON.stringify(updatedUser))
console.log(user === updatedUser)
```

---

# Immutabilité avec les tableaux

```javascript {monaco-run} {height:'auto'}
const numbers = [1, 2, 3]
const newNumbers = [...numbers, 4]

console.log(numbers)
console.log(newNumbers)
console.log(numbers === newNumbers)
```

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
