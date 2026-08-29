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
src: ./quiz.md
---

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
src: ./exercises/01-exceptions-roulette.md
---

---

# Un seul thread

Javascript exécute **une seule chose à la fois**. Cliquez sur le compteur,
puis lancez chacune des deux attentes :

<Latence :seconds="3" />

➡️ Même durée, deux comportements opposés. Une opération lente (réseau, disque,
base de données) **ne peut donc pas** attendre sur place : c'est le problème que
tout le reste de la séance résout.

---

# Ce qui se passe dans les deux cas

```javascript {monaco-run} {height:'auto', autorun:false}
// Version bloquante : le thread est confisqué pendant 3 secondes.
const fin = Date.now() + 3000
while (Date.now() < fin) { /* rien d'utile, mais personne d'autre ne passe */ }
console.log("bloquant : terminé")
```

```javascript {monaco-run} {height:'auto', autorun:false}
// Version asynchrone : on rend la main, on sera rappelé dans 3 secondes.
setTimeout(() => console.log("asynchrone : terminé"), 3000)
console.log("asynchrone : la suite s'exécute tout de suite")
```

Dans le second cas, les 3 secondes ne sont pas passées **dans** notre code :
c'est le navigateur qui les compte, et qui nous rappelle après.

---

# Attendre, ça coûte combien ?

Le processeur travaille en **nanosecondes**. Le réseau répond en **centaines de
millisecondes**. Pour saisir l'écart, ramenons tout à l'échelle humaine, en
posant *1 ns = 1 seconde* :

| Opération | Temps réel | À l'échelle humaine |
|---|---|---|
| Lire le cache L1 du processeur | 1 ns | **1 seconde** |
| Lire la RAM | 100 ns | 1 min 40 |
| Lire un SSD | 100 µs | 1 journée |
| Aller-retour réseau, même datacenter | 0,5 ms | 6 jours |
| Aller-retour Paris → New York | 70 ms | 2 ans |
| Une requête HTTP réelle | 300 ms | **9 ans** |

➡️ Un `fetch()`, pour le processeur, c'est neuf ans d'attente. La vraie question
n'est pas « comment aller plus vite », c'est **« qu'est-ce qu'on fait pendant
ce temps-là ? »**

---

# La boucle d'événements

<img src="./assets/async.png" alt="Async" width="520px" />

Le thread exécute la pile. Quand elle est vide, il prend la tâche suivante :
d'abord les **microtâches** (promesses), puis les **macrotâches** (`setTimeout`, événements).

---

# Prédisez, puis exécutez

Dans quel ordre ces quatre lignes vont-elles s'afficher ?

```javascript {monaco-run} {height:'auto', autorun:false}
console.log("1")
setTimeout(() => console.log("2"), 0)
Promise.resolve().then(() => console.log("3"))
console.log("4")
```

<v-click>

> `1` `4` `3` `2` — le code synchrone d'abord, **en entier**. Puis les microtâches.
> Et enfin les macrotâches : `setTimeout(..., 0)` n'est pas « tout de suite »,
> c'est « dès que le thread n'a plus rien d'autre à faire ».

</v-click>

---
src: ./exercises/02-ordre-execution.md
---

---

# Les callbacks (déprécié)

Avant 2015, « préviens-moi quand c'est prêt » s'écrivait en passant une fonction.

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

# …et le callback hell

Sur un seul appel ça va. Sur quatre à la suite :

```javascript {monaco} {height:'320px'}
readFile("./users.json", function (err, users) {
  if (err) return console.error(err)
  fetchProfile(users[0], function (err, profile) {
    if (err) return console.error(err)
    fetchPosts(profile, function (err, posts) {
      if (err) return console.error(err)
      savePosts(posts, function (err) {
        if (err) return console.error(err)
        console.log("enfin !")
      })
    })
  })
})
```

➡️ Le code part en diagonale, et la gestion d'erreur est recopiée à **chaque** niveau.

---
layout: two-cols-header
---

# Une promesse, c'est quoi ?

Un objet que vous avez **tout de suite**, qui représente une valeur que vous
n'avez **pas encore**.

::left::

<img src="./assets/box.png" alt="box" width='170px' />

Comme la boîte de Schrödinger, avec une valeur à la place du chat.

::right::

Elle a exactement trois états :

 * `pending` — en attente
 * `fulfilled` — tenue, avec une valeur
 * `rejected` — rompue, avec une erreur

⚠️ Le passage de `pending` vers l'un des deux autres est **définitif** : une
promesse ne change d'état qu'une fois, et ne revient jamais en arrière.

---

# Ouvrir la boîte

```javascript {monaco-run} {height:'auto', autorun:false}
function readFile(path) {
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

`.then()` pour la valeur, `.catch()` pour l'erreur.

---

# Pourquoi ça s'écrit à plat

Le point qui change tout : **`.then()` retourne une nouvelle promesse.**

```javascript {monaco-run} {height:'auto', autorun:false}
const p = Promise.resolve(2)
const q = p.then((n) => n * 10)

console.log(p === q) // false : then() a fabriqué une NOUVELLE promesse

// D'où le chaînage, à plat, au lieu de la pyramide des callbacks :
Promise.resolve(2)
  .then((n) => n * 10)
  .then((n) => n + 1)
  .then((n) => console.log(n))
```

ℹ️ Un seul `.catch()` en fin de chaîne attrape l'erreur de **n'importe quel** maillon.

---
src: ./exercises/03-promesses-then.md
---

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
src: ./exercises/04-callback-vers-promesse.md
---

---

# La syntaxe async/await (sucre syntaxique)

`await` met la fonction en pause jusqu'à ce que la promesse soit tenue. On ne
peut l'utiliser que dans une fonction `async` — laquelle retourne **toujours**
une promesse.

```javascript {monaco} {height:'auto'}
async function getPosts() {
  const user = await fetchUser()
  const posts = await fetchUserPosts(user)
  return posts
}

// Exactement le même programme, écrit avec .then()
function getPosts() {
  return fetchUser()
    .then((user) => fetchUserPosts(user))
}
```

⚠️ Le `return` de la deuxième version n'est pas décoratif : c'est lui qui
raccroche la promesse interne à la chaîne. Sans lui, l'erreur s'échappe.

---
src: ./exercises/05-async-await.md
---

---
src: ./exercises/06-chaine-cassee.md
---

---

# Gérer l'erreur

Avec `async`/`await`, on retrouve le `try`/`catch` du début de séance.

```javascript {monaco} {height:'auto'}
async function getPosts() {
  try {
    const user = await fetchUser()
    return await fetchUserPosts(user)
  } catch (e) {
    console.error(e)
    throw e // on relance : à l'appelant de décider quoi faire
  } finally {
    console.log("dans tous les cas")
  }
}
```

➡️ Une promesse rejetée que personne n'attrape, c'est un `unhandledRejection` :
le programme continue, mais l'erreur est perdue.

---
src: ./exercises/07-gestion-des-erreurs.md
---

---

# Mesurer la différence

Trois requêtes, l'une après l'autre puis toutes en même temps. Les barres sont
mesurées **chez vous**, en direct.

```javascript {monaco-run} {height:'auto', autorun:false}
const URL = "https://raw.githubusercontent.com/JulienUsson/zz3-f2-js/refs/heads/master/api/users.json"
const get = (n) => fetch(`${URL}?${n}`, { cache: "no-store" })

async function mesure(label, fn) {
  const debut = performance.now()
  await fn()
  const ms = Math.round(performance.now() - debut)
  console.log(label.padEnd(13) + "█".repeat(Math.round(ms / 15)) + ` ${ms} ms`)
}

async function main() {
  await get("chauffe") // la 1re requête paie la connexion : on ne la mesure pas

  await mesure("1 requête", () => get(1))
  await mesure("3 à la suite", async () => { for (const n of [2, 3, 4]) await get(n) })
  await mesure("3 ensemble", () => Promise.all([get(5), get(6), get(7)]))
}
main()
```

⚠️ `await` dans une boucle, c'est **une attente après l'autre**. `Promise.all`,
c'est la même attente, une seule fois.

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
src: ./exercises/08-promise-all.md
---

---

# Promise.race — le premier qui répond

`race()` se résout — ou rejette — avec **la première** promesse à se terminer.

```javascript {monaco-run} {height:'auto', autorun:false}
const delay = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms))

Promise.race([delay(300, "rapide"), delay(1000, "lent")]).then(console.log)
```

⚠️ Les perdantes continuent de s'exécuter : `race()` ne les annule pas.

Usage typique : mettre un **timeout** sur une opération qui n'en a pas.

---
src: ./exercises/09-promise-race-timeout.md
---

---

# Promise.allSettled — tout attendre, échecs compris

`all()` rejette dès qu'une promesse échoue. `allSettled()` attend tout le monde
et décrit chaque issue.

```javascript {monaco-run} {height:'auto', autorun:false}
const ok = Promise.resolve(1)
const ko = Promise.reject(new Error("boom"))

Promise.allSettled([ok, ko]).then((results) => console.log(results))
```

* `{ status: "fulfilled", value }`
* `{ status: "rejected", reason }`

ℹ️ Il existe aussi `Promise.any()` : la première **réussite**, en ignorant les échecs.

---
src: ./exercises/10-promise-allsettled.md
---

---

# Composer ses propres utilitaires

Une promesse est une valeur comme une autre : on peut écrire des fonctions qui
en prennent et en rendent.

```javascript {monaco-run} {height:'auto', autorun:false}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function twice(fn) {
  await fn()
  await fn()
}

twice(async () => {
  console.log("tic")
  await delay(300)
})
```

➡️ C'est tout ce qu'il faut pour écrire `retry`, un backoff, ou une limite de
parallélisme : les trois **bonus** en fin de page d'exercices.

---

# Pour résumer

Un seul thread, donc on ne peut pas attendre sur place.

Une promesse est une **boîte** qu'on reçoit tout de suite, pour une valeur qui
arrivera plus tard — `pending`, puis `fulfilled` **ou** `rejected`, une fois pour toutes.

Pour l'ouvrir :
 * `.then()` / `.catch()`, qui retournent eux-mêmes des promesses — d'où le chaînage à plat
 * `await` dans une fonction `async`, avec `try`/`catch` — la même chose, écrite verticalement

Et le piège à retenir : dans une chaîne, **on retourne toujours la promesse**.
