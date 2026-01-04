---
title: React
theme: ./theme
layout: cover
defaults:
  layout: center
---

# ReactJS

Tout est composant

---

# Introduction

**React** est une bibliothèque JavaScript créée par **Facebook** en **2013**.

Objectif :
* Construire des **interfaces utilisateur**
* De manière **déclarative**
* En découpant l’UI en **composants réutilisables**

---

# Un peu d’historique

Avant React :

* jQuery
* manipulation directe du DOM
* code difficile à maintenir

Idée clé de React :

* L’interface est une fonction de l’état
* Quand l’état change, React met à jour le DOM
* plus besoin de manipuler le DOM soi-même

---

# Pourquoi React a gagné

(Deuxième sur [Stackoverflow Survey 2025](https://survey.stackoverflow.co/2025/technology#1-web-frameworks-and-technologies))

* Composants
* Virtual DOM
* Flux de données unidirectionnel
* Énorme écosystème

---

# React n’est PAS

* Un framework complet
* Une solution backend
* Un outil magique

➡️ React gère **la vue**, pas le reste

---


# Rappels HTML

Avant React, petit rappel sur **HTML**, le langage de structure du web.

---

# HTML : à quoi ça sert ?

HTML permet de :

* structurer une page
* donner du sens au contenu
* décrire des éléments (titres, paragraphes, boutons, formulaires)

➡️ React génère **du HTML**, mais via JavaScript.

---

# Structure minimale d’une page HTML

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Ma page</title>
  </head>
  <body>
    <h1>Hello world</h1>
  </body>
</html>
```

---

# Balises HTML courantes

```html
<h1>Titre principal</h1>
<p>Un paragraphe</p>
<button>Cliquer</button>
<input type="text" />
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

---

# Attributs HTML

```html
<input type="text" placeholder="Votre nom" />
<button disabled>Envoyer</button>
```

* Les attributs donnent des informations supplémentaires
* Toujours écrits dans la balise ouvrante

---

# Premier composant

```jsx
function App() {
  return <h1>Hello React 👋</h1>
}

export default App
```

* Un composant = **une fonction**
* Retourne du **JSX**

---

# Le JSX

Le JSX ressemble à du HTML mais **c’est du JavaScript**.

```jsx
const name = "Julien"

function App() {
  return <h1>Hello {name}</h1>
}
```

---

# Règles du JSX

* Un seul élément racine
* Expressions JS avec `{}`
* `className` au lieu de `class`

---

# Le DOM

Le **DOM** (Document Object Model) est :

* une représentation en mémoire de la page HTML
* coûteux à manipuler
* lent si on le modifie trop souvent

```js
document.querySelector("p").textContent = "Hello"
```

➡️ Chaque modification déclenche un recalcul du navigateur.

---

# Le Virtual DOM

React utilise un **Virtual DOM** :

* une copie légère du DOM en JavaScript
* recalculée à chaque changement d’état
* comparée à la version précédente (**diffing**)

➡️ React applique **le minimum de changements** au vrai DOM.

---

# Shallow equality vs Deep equality

Pour comparer l’ancien et le nouveau Virtual DOM, React **ne fait PAS** de comparaison profonde.

---


# Deep equality (comparaison profonde)

```js
{ name: "Alice", age: 30 } === { name: "Alice", age: 30 }
// false
```

Pour vérifier qu’ils sont identiques, il faudrait :

* parcourir toutes les clés
* comparer récursivement chaque valeur

❌ Très coûteux
❌ Impossible à l’échelle

---

# Shallow equality (comparaison superficielle)

React compare principalement :

* les **références** (`===`)
* pas le contenu profond

```js
const a = { name: "Alice" }
const b = a

a === b // true
```

➡️ Rapide
➡️ Prévisible

---

# Pourquoi React utilise le shallow compare

* Le Virtual DOM peut être **très grand**
* Comparer profondément chaque nœud serait trop lent
* Les références permettent une détection immédiate

➡️ **Performance avant tout**

---

# Lien direct avec l’immutabilité

Mutation :

```js
user.name = "Bob"
```

* même référence
* shallow compare = aucun changement détecté

Immutabilité :

```js
const newUser = { ...user, name: "Bob" }
```

* nouvelle référence
* changement détecté

---

# Pour résumer

* React **ne compare pas le contenu**, il compare les **références**.
* L’immutabilité permet à React de :
  * détecter les changements
  * optimiser le rendu
  * éviter des bugs subtils

➡️ **Pas une contrainte arbitraire** : une nécessité technique

---

# Composants réutilisables

```jsx
function Button() {
  return <button>Click me</button>
}

function App() {
  return (
    <div>
      <Button />
      <Button />
    </div>
  )
}
```

---

# Les props

Les props permettent de **paramétrer un composant**.

```jsx
interface ButtonProps {
  label: string
}

function Button({ label }: ButtonProps) {
  return <button>{label}</button>
}

function App() {
  return <Button label="Valider" />
}
```

---

# Les événements

```jsx
function App() {
  function handleClick() {
    alert("Clicked !")
  }

  return <button onClick={handleClick}>Click</button>
}
```

---

# L’état (useState)

Un composant peut avoir un **état interne**.

```jsx
import { useState } from "react"

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
```

---

# Règles du state

* Ne jamais modifier directement la valeur (immutable)
* Toujours passer par le setter
* Le state déclenche un **re-render**

---

# Rendu conditionnel

```jsx
function App() {
  const [logged, setLogged] = useState(false)

  return (
    <div>
      {logged ? <p>Bienvenue</p> : <p>Veuillez vous connecter</p>}
      <button onClick={() => setLogged(!logged)}>Toggle</button>
    </div>
  )
}
```

---

# Listes et map

```jsx
const todos = ["Apprendre React", "Faire une app", "Boire un café"]

function App() {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo}>{todo}</li>
      ))}
    </ul>
  )
}
```

---

# Exemple : Todo List

```jsx
function App() {
  const [todos, setTodos] = useState([])
  const [value, setValue] = useState("")

  function addTodo() {
    if (!value) return
    setTodos([...todos, value])
    setValue("")
  }

  return (
    <div>
      <h1>Todo List</h1>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  )
}
```

---

# TanStack Query

Dans une vraie application React, on a souvent besoin de :

* récupérer des données depuis une API
* gérer le chargement
* gérer les erreurs
* éviter de recharger inutilement les données

C’est là qu’intervient **TanStack Query**

---

# Utilisation de TanStack Query

```jsx
function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetch("/api/todos").then(res => res.json())
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <ul>
      {data.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  )
}
```

---

# Les autres concepts dont on ne parlera pas

* Component lifecycle
* useEffect
* Context
* Memoization
* ...

➡️ Avec ces bases, vous pouvez déjà créer **de vraies applications** 🚀

