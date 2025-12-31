---
title: "Javascript 2"
slides: "javascript-2"
---

Avant de commencer, n'oubliez pas que la documentation de Javascript est disponible [ici](https://developer.mozilla.org/fr/docs/Web/JavaScript) ou [là](https://www.w3schools.com/js/default.asp). Nous utiliserons [CodeSandbox](https://codesandbox.io/s/vanilla), un environnement en ligne pour coder et exécuter du Javascript.

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

Ecrire un script qui récupère 100 users via [randomuser](https://randomuser.me/api/?results=100) avec [axios](https://github.com/axios/axios#example) et qui les affichent.

- En utilisant les [promesses](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses)
- En utilisant [async](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/async_function)/[await](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/await)

⚠️ Attention à l'aspect asynchrone du code ! Mettez des logs un peu partout et regarder l'ordre d'affichage.

⚠️ N'oubliez pas d'ajouter la bibliothèque `Axios` avec le bouton `Add dependency` sur CodeSandbox ou via `npm install --save axios` en local.

---

## Exercice 3 : Utiliser les promesses

Ecrire un script qui récupère 100 users et qui affiche les users habitants en France. (Utiliser [filter()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter))

- En utilisant les [promesses](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses)
- En utilisant [async](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/async_function)/[await](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/await)

---

## Exercice 4 : Utiliser les promesses

Ecrire un script qui récupère 100 users et qui stocke dans un second tableau uniquement le prénom et le nom (`{firstname: "Julien", lastname: "Usson"}`)de tous les users dont le timezone est Paris. (Utiliser [filter()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter), [map()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/map) et [forEach()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/forEach))

- En utilisant les [promesses](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses)
- En utilisant [async](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/async_function)/[await](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/await)

---

## Exercice 5 : Transformer un callback en promesse

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
- En utilisant les [promesses](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses) et votre nouvelle fonction
- En utilisant [async](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/async_function)/[await](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/await) et votre nouvelle fonction

---

## Exercice 6 : Gestion des erreurs

Écrire un script qui récupère 100 users depuis l’API [randomuser](https://randomuser.me/api/?results=100).

Si la requête fonctionne, afficher `Users loaded`.

Si la requête échoue, afficher `Something went wrong` sans faire planter le programme.

Ajouter un finally qui affiche `Request finished`.

- En utilisant les [promesses](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses)
- En utilisant [async](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/async_function)/[await](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/await) avec [try/catch/ finally](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/try...catch)

ℹ️ Pour tester le cas d’erreur, vous pouvez volontairement casser l’URL de l’API.

---

## Exercice 7 : Paralléliser des promesses avec Promise.all

Écrire un script qui récupère en parallèle 50 users et 50 autres users puis fusionne les deux tableaux en un seul et affiche le nombre total d’utilisateurs.

- En utilisant [Promise.all](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

⚠️ Vérifiez que les deux requêtes partent bien en même temps.

---

## Exercice 8 : Créer une fonction retry avec promesse

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

## Autres ressources

- [Comprendre les promesses en js](https://frank.taillandier.me/2017/03/23/comprendre-les-promesses-en-javascript/) [FR]
- [Javascript event loop explained](https://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/) [EN]
- [Concurrence et boucle d'événements](https://developer.mozilla.org/fr/docs/Web/JavaScript/Concurrence_et_boucle_des_%C3%A9v%C3%A9nements) [FR]
- [Async/await](https://blog.xebia.fr/2017/11/14/asyncawait-une-meilleure-facon-de-faire-de-lasynchronisme-en-javascript/) [FR]
