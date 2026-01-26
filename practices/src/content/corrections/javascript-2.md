---
title: "Javascript 2"
---

## Exercice 1 : Comprendre les exceptions

```javascript
function russianRoulette() {
  if (Math.random() < 0.5) {
    throw new Error("PAN");
  }
}

try {
  russianRoulette();
  // Si aucune erreur n'est levée, le code continue ici
  console.log("You survived :D");
} catch (e) {
  // Si une erreur est levée, on entre dans ce bloc
  console.log("You're dead :(");
}
```

---

## Exercice 2 : Utiliser les promesses

### Version avec `.then()` (Promesses classiques)

```javascript
import axios from "axios";

axios
  .get(
    "https://raw.githubusercontent.com/JulienUsson/zz3-f2-js/refs/heads/master/api/users.json",
  )
  .then((response) => {
    const users = response.data;
    const frenchUsers = users.filter(
      (user) => user.location.country === "France",
    );
    console.log("Utilisateurs en France :", frenchUsers);
  })
  .catch((err) => console.error("Erreur :", err));

console.log("Ceci s'affichera probablement AVANT la liste des utilisateurs.");
```

### Version avec `async / await`

```javascript
async function getFrenchUsers() {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/JulienUsson/zz3-f2-js/refs/heads/master/api/users.json",
    );
    const frenchUsers = response.data.filter(
      (user) => user.location.country === "France",
    );
    console.log("Utilisateurs en France (async) :", frenchUsers);
  } catch (err) {
    console.error(err);
  }
}

getFrenchUsers();
```

---

## Exercice 3 : Transformer un callback en promesse

### Création du wrapper (Promisification)

```javascript
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
```

### Script avec `async / await`

```javascript
async function joke() {
  console.log("- Toc toc");
  await wait(500);

  console.log("- Qui est là?");
  await wait(10000); // 10 secondes

  console.log("- C'est Internet Explorer");
}

joke();
```

---

## Exercice 4 : Gestion des erreurs

```javascript
async function fetchWithHandling() {
  try {
    await axios.get(
      "https://raw.githubusercontent.com/JulienUsson/zz3-f2-js/refs/heads/master/api/users.json",
    );
    console.log("Users loaded");
  } catch (error) {
    console.log("Something went wrong");
  } finally {
    console.log("Request finished");
  }
}

fetchWithHandling();
```

---

## Exercice 5 : Paralléliser avec `Promise.all`

```javascript
async function fetchInParallel() {
  try {
    // On lance les deux promesses en même temps
    const [res1, res2] = await Promise.all([
      axios.get(
        "https://raw.githubusercontent.com/JulienUsson/zz3-f2-js/refs/heads/master/api/users.json",
      ),
      axios.get(
        "https://raw.githubusercontent.com/JulienUsson/zz3-f2-js/refs/heads/master/api/users2.json",
      ),
    ]);

    const allUsers = [].concat(res1.data).concat(res2.data);
    console.log(`Nombre total d'utilisateurs : ${allUsers.length}`);
  } catch (e) {
    console.error("Échec d'une des requêtes");
  }
}
```

---

## Exercice 6 & 9 : Fonction Retry (avec backoff exponentiel)

Voici la version améliorée (Ex 9) qui couvre aussi l'exercice 6.

```javascript
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

async function retry(fn, attempts) {
  try {
    return await fn();
  } catch (error) {
    if (attempts <= 1) throw error;

    // Calcul du délai exponentiel (Ex 9)
    // Tentative 2 -> 1s, Tentative 3 -> 2s, Tentative 4 -> 4s
    const delay = Math.pow(2, 4 - attempts) * 1000;

    console.log(`Échec, nouvelle tentative dans ${delay}ms...`);
    await wait(delay);

    return retry(fn, attempts - 1);
  }
}
```

---

## Exercice 7 : Timeout avec `Promise.race`

On fait la course entre la requête et un chronomètre qui rejette la promesse.

```javascript
function fetchWithTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms),
  );

  return Promise.race([promise, timeout]);
}

// Utilisation :
fetchWithTimeout(axios.get("..."), 2000)
  .then(() => console.log("Succès"))
  .catch((err) => console.log(err.message));
```

---

## Exercice 8 : `Promise.allSettled`

Contrairement à `Promise.all`, cette fonction attend que toutes les promesses soient terminées (qu'elles aient réussi ou échoué).

```javascript
async function checkMultipleApis() {
  const requests = [
    axios.get("URL_OK"),
    axios.get("URL_ERREUR"),
    axios.get("URL_OK_BIS"),
  ];

  const results = await Promise.allSettled(requests);

  const success = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;

  console.log(`Succès : ${success}, Échecs : ${failed}`);
}
```

---

## Exercice 10 : Limiter la concurrence

C'est l'exercice le plus complexe. On utilise un "pool" de promesses actives.

```javascript
async function parallelLimit(tasks, limit) {
  const activeTasks = {}; // Objet pour suivre les tâches en cours
  const allPromises = []; // Tableau pour stocker les promesses de résultats

  for (let i = 0; i < tasks.length; i++) {
    // 1. Si on atteint la limite de concurrence, on attend qu'une tâche finisse
    if (Object.keys(activeTasks).length >= limit) {
      // Promise.race attend un itérable (on transforme les valeurs de l'objet en tableau)
      await Promise.race(Object.values(activeTasks));
    }

    // 2. On lance la tâche (une fonction retournant une promesse)
    // On ajoute un .then() pour se retirer de l'objet activeTasks dès que c'est fini
    const p = tasks[i]().then((res) => {
      delete activeTasks[i];
      return res; // On retourne le résultat pour Promise.all
    });

    // 3. On enregistre la promesse dans l'objet (pour le suivi de la limite)
    activeTasks[i] = p;

    // 4. On stocke la promesse dans notre tableau de résultats
    allPromises.push(p);
  }

  // On attend que toutes les tâches stockées soient résolues
  return Promise.all(allPromises);
}
```
