## Exercice 1 — La roulette russe

```javascript
function russianRoulette() {
  if (Math.random() < 0.5) {
    throw new Error("PAN");
  }
}

try {
  russianRoulette();
  // On n'arrive ici que si aucune exception n'a été levée
  console.log("You survived :D");
} catch (e) {
  console.log("You're dead :(");
}
```

L'exception interrompt la fonction comme un `return`. Si personne ne l'attrape,
elle remonte toute la pile — et le programme s'arrête.

---

## Exercice 2 — Première promesse

```javascript
const URL =
  "https://raw.githubusercontent.com/JulienUsson/zz3-f2-js/refs/heads/master/api/users.json";

console.log("avant");

fetch(URL)
  .then((response) => response.json())
  .then((users) => {
    const frenchUsers = users.filter((user) => user.location.country === "France");
    console.log("Utilisateurs en France :", frenchUsers);
  })
  .catch((error) => console.error("Erreur :", error));

console.log("après");
```

`avant` et `après` s'affichent **tous les deux** avant la liste : `fetch` rend la
main immédiatement, le `.then()` s'exécutera plus tard.

ℹ️ Avec [axios](https://github.com/axios/axios#example), la réponse est déjà
décodée : `axios.get(URL).then((response) => response.data)`.

---

## Exercice 3 — Emballer un callback

```javascript
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function joke() {
  console.log("- Toc toc");
  await delay(500);

  console.log("- Qui est là ?");
  await delay(10000);

  console.log("- C'est Internet Explorer");
}

joke();
```

`setTimeout` est plus vieux que les promesses : on l'emballe une fois, et on ne
revoit plus jamais son callback.

---

## Exercice 4 — Le même, en async/await

```javascript
const URL =
  "https://raw.githubusercontent.com/JulienUsson/zz3-f2-js/refs/heads/master/api/users.json";

async function showFrenchUsers() {
  const response = await fetch(URL);
  const users = await response.json();
  console.log(users.filter((user) => user.location.country === "France"));
}

showFrenchUsers();
```

Le code se lit de haut en bas, mais il est **exactement** aussi asynchrone que la
version précédente : `await` ne bloque que la fonction où il se trouve.

---

## Exercice 5 — Quand la requête échoue

```javascript
async function loadUsers() {
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error(response.status);
    console.log("Users loaded");
  } catch (error) {
    console.log("Something went wrong");
  } finally {
    console.log("Request finished");
  }
}
```

⚠️ `fetch` ne rejette **pas** sur un 404 ou un 500 : il faut tester
`response.ok` soi-même. C'est le piège classique.

La même chose avec les promesses :

```javascript
fetch(URL)
  .then((response) => {
    if (!response.ok) throw new Error(response.status);
    console.log("Users loaded");
  })
  .catch(() => console.log("Something went wrong"))
  .finally(() => console.log("Request finished"));
```

---

## Exercice 6 — Deux requêtes en parallèle

```javascript
const BASE =
  "https://raw.githubusercontent.com/JulienUsson/zz3-f2-js/refs/heads/master/api";

async function countAllUsers() {
  console.time("parallèle");
  const [users, users2] = await Promise.all([
    fetch(`${BASE}/users.json`).then((r) => r.json()),
    fetch(`${BASE}/users2.json`).then((r) => r.json()),
  ]);
  console.timeEnd("parallèle");

  console.log(`Total : ${[...users, ...users2].length}`);
}
```

Écrit avec deux `await` à la suite, on paie la somme des deux temps ; avec
`Promise.all`, le plus long des deux.

---

## Exercice 7 — Abandonner au bout de N secondes

```javascript
function fetchWithTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms),
  );
  return Promise.race([promise, timeout]);
}
```

La promesse perdante n'est **pas** annulée : elle continue jusqu'au bout, son
résultat est simplement ignoré. Pour vraiment interrompre une requête, il faut
un [AbortController](https://developer.mozilla.org/fr/docs/Web/API/AbortController).

---

## Exercice 8 — Compter les succès et les échecs

```javascript
async function report() {
  const results = await Promise.allSettled([
    Promise.resolve(1),
    Promise.reject(new Error("boom")),
    Promise.resolve(3),
  ]);

  const success = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;
  console.log(`Succès : ${success}, Échecs : ${failed}`);
}
```

Avec `Promise.all`, le premier échec rejette tout : on perd les deux succès.

---

## Exercice 9 — Réessayer en cas d'échec

```javascript
async function retry(fn, attempts) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      // La dernière tentative a échoué : on laisse l'erreur remonter
      if (attempt === attempts) throw error;
    }
  }
}
```

La boucle se lit mieux que la récursion, et le nombre de tentatives restantes
n'a pas besoin d'être transporté d'appel en appel.

---

## Exercice 10 — Espacer les tentatives

```javascript
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function retry(fn, attempts) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === attempts) throw error;
      // 1re attente 1 s, puis 2 s, puis 4 s…
      await delay(2 ** (attempt - 1) * 1000);
    }
  }
}
```

Pourquoi doubler ? Si le serveur est saturé, le marteler toutes les secondes
aggrave son cas. Le backoff exponentiel laisse au service le temps de repartir,
et répartit les clients qui réessaient tous en même temps.

---

## Exercice 11 — Limiter la concurrence

```javascript
async function parallelLimit(tasks, limit) {
  const results = [];
  const running = new Set();

  for (const [index, task] of tasks.entries()) {
    const promise = task().then((value) => {
      running.delete(promise);
      return value;
    });

    results[index] = promise;
    running.add(promise);

    // On n'avance que quand une place se libère
    if (running.size >= limit) {
      await Promise.race(running);
    }
  }

  return Promise.all(results);
}
```

Trois idées :

- `results[index]` garde l'**ordre d'entrée**, alors que les tâches finissent
  dans le désordre ;
- `running` est l'ensemble des tâches en vol, et chacune s'en retire elle-même ;
- `Promise.race(running)` est ce qui fait attendre juste ce qu'il faut : la
  première place libre.

⚠️ Tel quel, une tâche qui échoue reste dans `running`. À vous de voir comment
la retirer aussi dans ce cas — `.finally()` est votre ami.
