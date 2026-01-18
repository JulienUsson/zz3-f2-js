---
title: Javascript 2
theme: slidev-theme-javascript
addons:
  - slidev-addon-javascript
layout: cover
defaults:
  layout: center
---

# Javascript 2
Des promesses… pas toujours tenues

---
layout: two-cols-header
---

# Les modules

 - Chaque fichier est appelé module.
 - Un module peut exporter ou importer des fonctions, variables, etc...

::left::

```javascript {monaco} {height:'300px'}
// fichier1.js

// exports nommés (0 ou n par module) 
export function func1() {/* some code */ }
export function func2() {/* some code */ }

// Export par défaut (un seul par module)
export default function defaultFunc() {/* some code */ }
```

::right::

```javascript {monaco} {height:'300px'}
// fichier2.js

// Import nommé
import { func1 } from "./fichier1"

// On peut le renommer si besoin
import { func1 as toto } from "./fichier1"

// On peut tout importer sous un même nom
import * as Fichier1 from "./fichier1"
Fichier1.func1()

// Import du défaut
import defaultFunc from "./fichier1"

// On peut cumuler les deux
import defaultFunc, { func1, func2 } from "./fichier1"
```

---

# Les exceptions

```javascript {monaco-run} {height:'auto', autorun:false}
function readFile(file) {
    // Some code
    if("file don't exist") {
        throw new Error("Error: can't read file") 
        // Termine directement la fonction (comme un 'return')
    }
    // Some code
}

let text = ""
try {
    text = readFile("./foo.txt");  
} catch (err) {
    console.error(err)
    return
}
console.log(text)
// Si on catch pas, l'exception remonte la pile d'exécution jusqu'à trouver un catch
// Si l'exception remonte toute la pile c'est le crash...
```
---

# Javascript est non bloquant (asynchrone)

<img src="./assets/async.png" alt="Async" width="600px" />

---

# Les callbacks (deprécié)

```javascript {monaco-run} {height:'auto', autorun:false}
function readFile(path, callback) {
  setTimeout(() => callback(null, "Lorem ipsum..."), 500)
}

console.log("Foo")

readFile('./foo.txt', function (err, data) {
  if(err) return
  console.log(data);
});

console.log("Bar") 
```

---

# Les promesses (depuis 2015)

```javascript {monaco-run} {height:'auto', autorun:false}
function readFile(path, callback) {
  return new Promise((resolve) => setTimeout(() => resolve("Lorem ipsum..."), 500))
}

console.log("Foo")

readFile('./foo.txt')
    .then(function (data) {
        console.log(data)
    })
    .catch(function (err) {
        console.error("Impossible de lire le fichier")
    })

console.log("Bar")
```

---
monacoTypesSource: ata
---

# Transformer un callback en promesse

```javascript {monaco} {height:'auto'}
function customPromiseReadFile(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, data) {
            if(err) { 
                reject(err)
                return
            }
            resolve(data)
        })
    })
}
```

---

# La syntaxe async/await (sucre syntaxique)

```javascript {monaco} {height:'auto'}
async function getPostsPromise() {
  // On ne peut utiliser le mot-clé await que dans une fonction async
  try {
        let user = await fetchUser()
        let posts = await fetchUserPosts(user)
        return posts
    } catch(e) {
        console.error(e)
        throw e
    }
}

// Cette fonction à exactement le même comportement que la précédente
function getPostsPromise() {
    return new Promise(function (resolve, reject) {
        fetchUser().then(function (user) {
            fetchUserPosts(user).then(function (posts) {
                resolve(posts)
            })
        }).catch(function (e) {
            console.error(e)
            reject(e)
        })
    })
}
```

---

# Eviter les cascades

```javascript {monaco} {height:'auto'}
async function getUsersAndPostsCascade() {
  try {
        let users = await fetchUsers()
        let posts = await fetchPosts()
        return [users, posts]
    } catch(e) {
        console.error(e)
        throw e
    }
}

async function getUsersAndPosts() {
  try {
        let results = await Promise.all([fetchUsers(), fetchPosts()])
        let users = results[0]
        let posts = results[1]
        return [users, posts]
    } catch(e) {
        console.error(e)
        throw e
    }
}
```

---

# Pour résumer

Les promesses c'est comme la boîte de Schrödinger avec une valeur à la place d'un chat

<img src="./assets/box.png" alt="box" width='200px' />

et pour savoir ce qu'il y a dedans 
 * `.then()`
 * `.catch()`
 * `await`