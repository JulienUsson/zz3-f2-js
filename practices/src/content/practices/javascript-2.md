---
title: "Javascript 2"
slides: "javascript-2"
correctionDate: 2026-01-15
---

Avant de commencer, n'oubliez pas que la documentation de Javascript est disponible [ici](https://developer.mozilla.org/fr/docs/Web/JavaScript) ou [là](https://www.w3schools.com/js/default.asp). Nous utiliserons [CodeSandbox](https://codesandbox.io/s/vanilla) (fonctionne mieux avec Chrome/Chromium), un environnement en ligne pour coder et exécuter du Javascript.

---

## Exercice 1 : Comprendre les exceptions

En utilisant la fonction suivante sans la modifier :

- Regarder comment se comporte ce code lorsque l'exception est levée.
- Faites en sorte que le log `You're dead :(` s'affiche si l'exception est levée en utilisant `try {} catch(e) {}`.
- Faites en sorte que le log `You survived :D` s'affiche si l'exception n'est pas levée en utilisant le même `try {} catch(e) {}` que précedemment.

```javascript
function russianRoulette() {
  if (Math.random() < 0.5) {
    throw new Error("PAN");
  }
}

russianRoulette();
```

---

## Exercice 2 : Utiliser les promesses

Ecrire un script qui récupère une liste d'utilisateurs via [https://javascript.usson.dev/api/users.json](https://javascript.usson.dev/api/users.json) avec [axios](https://github.com/axios/axios#example)

```javascript
import axios from "axios";

axios.get("https://javascript.usson.dev/api/users.json");
```

et qui affiche les utilisateurs habitants en France. (Utiliser [filter()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter))

- En utilisant les [promesses](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses)
- En utilisant [async](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/async_function)/[await](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/await)

⚠️ Attention à l'aspect asynchrone du code ! Mettez des logs un peu partout et regarder l'ordre d'affichage.

⚠️ N'oubliez pas d'ajouter la bibliothèque `Axios` avec le bouton `Add dependency` sur CodeSandbox ou via `npm install --save axios` en local.

---

## Exercice 3 : Transformer un callback en promesse

La fonction [setTimeout()](https://developer.mozilla.org/fr/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) permet d'exécuter du code après x ms de façon asynchrone. Malheureusement, à l'époque de la création de cette fonction, les promesses n'existaient pas !

Créer une fonction wrappant setTimeout() dans une promesse puis écrire un programme qui affiche le dialogue suivant :

```
- Toc toc
**attendre 500 millisecondes**
- Qui est là?
**attendre 10 secondes**
- C'est Internet Explorer
```

- En utilisant [setTimeout()](https://developer.mozilla.org/fr/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)
- En utilisant [async](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/async_function)/[await](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/await) et votre nouvelle fonction

---

## Exercice 4 : Gestion des erreurs

Écrire un script qui récupère la liste d'utilisateurs

Si la requête fonctionne, afficher `Users loaded`.

Si la requête échoue, afficher `Something went wrong` sans faire planter le programme.

Ajouter un finally qui affiche `Request finished`.

- En utilisant les [promesses](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses)
- En utilisant [async](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/async_function)/[await](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/await) avec [try/catch/ finally](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/try...catch)

ℹ️ Pour tester le cas d’erreur, vous pouvez volontairement casser l’URL de l’API.

---

## Exercice 5 : Paralléliser des promesses avec Promise.all

Écrire un script qui récupère la liste des utilisateurs une seconde [https://javascript.usson.dev/api/users2.json](https://javascript.usson.dev/api/users2.json) puis fusionne les deux tableaux en un seul et affiche le nombre total d’utilisateurs.

- En utilisant [Promise.all](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

⚠️ Vérifiez que les deux requêtes partent bien en même temps.

---

## Exercice 6 : Créer une fonction retry avec promesse

Créer une fonction `retry(fn, attempts)` qui :

- Exécute une fonction retournant une promesse
- Réessaie automatiquement en cas d’échec
- Échoue définitivement après attempts tentatives

```javascript
retry(fetchUsers, 3)
  .then(() => console.log("Success"))
  .catch(() => console.log("Failed after 3 attempts"));
```

ℹ️ Pour tester le cas d’erreur, vous pouvez volontairement casser l’URL de l’API.

---

## Exercice 7 : Timeout avec Promise.race

Écrire une fonction `fetchWithTimeout(promise, ms)` qui :

- prend une promesse
- échoue si elle met plus de ms millisecondes à se résoudre

```javascript
fetchWithTimeout(fetchUsers(), 2000)
  .then(() => console.log("Success"))
  .catch(() => console.log("Timeout"));
```

- En utilisant [Promise.race](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

---

## Exercice 8 : Promise.allSettled

Lancer 3 requêtes API en parallèle :

- API 1 → OK
- API 2 → erreur
- API 3 → OK

Afficher :

- le nombre de succès
- le nombre d’échecs

- En utilisant [Promise.allSettled](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

## Exercice 9 : Retry avec délai exponentiel (backoff)

Améliorer la fonction `retry` :

- attendre 1s avant la 2ᵉ tentative
- 2s avant la 3ᵉ
- 4s avant la 4ᵉ

---

## Exercice 10 : Limiter la concurrence

Écrire une fonction `parallelLimit(tasks, limit)` qui :

- prend un tableau de fonctions retournant des promesses
- n’exécute jamais plus de limit promesses en parallèle

```javascript
parallelLimit([() => fetchUser(), () => fetchUser(), () => fetchUser()], 2);
```

ℹ️ [Promise.race](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) peut être utile ici.

---

## Autres ressources

- [Comprendre les promesses en js](https://frank.taillandier.me/2017/03/23/comprendre-les-promesses-en-javascript/) [FR]
- [Javascript event loop explained](https://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/) [EN]
- [Concurrence et boucle d'événements](https://developer.mozilla.org/fr/docs/Web/JavaScript/Concurrence_et_boucle_des_%C3%A9v%C3%A9nements) [FR]
- [Async/await](https://blog.xebia.fr/2017/11/14/asyncawait-une-meilleure-facon-de-faire-de-lasynchronisme-en-javascript/) [FR]
