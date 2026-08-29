---
title: "Javascript 4"
correctionDate: 2026-01-29
---

Avant de commencer, n'oubliez pas que la documentation de Javascript est disponible [ici](https://developer.mozilla.org/fr/docs/Web/JavaScript) ou [là](https://www.w3schools.com/js/default.asp). Nous utiliserons [CodeSandbox](https://codesandbox.io/s/vanilla) (fonctionne mieux avec Chrome/Chromium), un environnement en ligne pour coder et exécuter du Javascript.

---

## Exercice 1 — Mutation cachée (niveau 🟡)

### Code existant

```js
const users = [
  { id: 1, name: "Alice", tags: ["admin"] },
  { id: 2, name: "Bob", tags: ["user"] },
];

function addTag(user, tag) {
  user.tags.push(tag);
  return user;
}
```

### Travail demandé

1. Expliquer **pourquoi ce code n’est PAS immutable**
2. Réécrire `addTag` pour qu’elle :
   - retourne un **nouvel utilisateur**
   - ne modifie jamais l’original

3. Vérifier avec `===` que :
   - l’utilisateur retourné est différent
   - le tableau `tags` est aussi différent

---

## Exercice 2 — Immutabilité profonde (niveau 🟠)

```js
const state = {
  user: {
    id: 1,
    profile: {
      firstname: "Julien",
      lastname: "Usson",
    },
  },
};
```

### Objectif

Créer une fonction :

```js
updateLastname(state, newLastname);
```

Résultat attendu :

- `state` reste strictement inchangé
- seul `lastname` est modifié
- **tous les niveaux** nécessaires sont clonés

### Vérifications attendues

```js
state !== newState;
state.user !== newState.user;
state.user.profile !== newState.user.profile;
```

---

## Exercice 3 — Refactor mutable → immutable (array) (niveau 🟠)

### Code interdit (mutable)

```js
function removeUserById(users, id) {
  const index = users.findIndex((u) => u.id === id);
  users.splice(index, 1);
  return users;
}
```

### Travail demandé

1. Réécrire la fonction en version **immutable**
2. L’ancienne version **ne doit plus exister**
3. Le tableau original doit rester inchangé

💡 Indice : `filter`

---

## Exercice 4 — Refactor mutable → immutable (object) (niveau 🟠)

```js
function incrementScore(player) {
  player.score += 1;
  return player;
}
```

### Contraintes

- `player` ne doit jamais être modifié
- retourner un nouvel objet
- ne pas répéter manuellement toutes les propriétés

---

## Exercice 5 — Piège classique : référence partagée (niveau 🔴)

```js
const defaultSettings = {
  theme: "dark",
  notifications: true,
};

function createUser(name) {
  return {
    name,
    settings: defaultSettings,
  };
}
```

### Problème

```js
const user1 = createUser("Alice");
const user2 = createUser("Bob");

user1.settings.theme = "light";
```

➡️ `user2` est impacté 😱

### Travail demandé

1. Expliquer **pourquoi**
2. Corriger le code pour garantir l’immutabilité
3. Vérifier que `user1.settings !== user2.settings`

---

## Exercice 6 — Update conditionnel immutable (niveau 🔴)

```js
const state = {
  users: [
    { id: 1, name: "Alice", online: false },
    { id: 2, name: "Bob", online: false },
  ],
};
```

Créer une fonction :

```js
setUserOnline(state, userId);
```

Résultat :

- retourne un **nouvel état**
- un seul user passe `online: true`
- tous les autres restent inchangés (référence conservée)

💡 Objectif caché : **ne pas tout recréer inutilement**

---

## Exercice 7 — Détection de mutation (niveau 🔥)

### Code à analyser

```js
const state = {
  counter: 0,
};

function increment(state) {
  const newState = state;
  newState.counter++;
  return newState;
}
```

### Travail demandé

1. Décrire précisément ce qui se passe en mémoire
2. Expliquer pourquoi `state === newState`
3. Réécrire la fonction correctement
4. Ajouter un test simple prouvant l’immutabilité
