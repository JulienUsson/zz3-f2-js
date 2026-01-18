---
title: "Javascript 4"
---

## Exercice 1 — Mutation cachée (niveau 🟡)

### 1. Pourquoi ce code n’est PAS immutable ?

Le code est mutable car la méthode `.push()` modifie le tableau `tags` directement en mémoire (mutation "in-place"). Comme l'objet `user` contient une référence vers ce tableau, l'objet original est altéré.

### 2 & 3. Réécriture et vérification

```js
const users = [
  { id: 1, name: "Alice", tags: ["admin"] },
  { id: 2, name: "Bob", tags: ["user"] },
];

function addTag(user, tag) {
  return {
    ...user,
    tags: [...user.tags, tag], // On crée un nouveau tableau avec l'ancien contenu + le tag
  };
}

const user1 = users[0];
const newUser = addTag(user1, "editor");

// Vérifications
console.log(user1 === newUser); // false (L'objet est différent)
console.log(user1.tags === newUser.tags); // false (Le tableau interne est différent)
```

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

function updateLastname(state, newLastname) {
  return {
    ...state,
    user: {
      ...state.user,
      profile: {
        ...state.user.profile,
        lastname: newLastname,
      },
    },
  };
}

const newState = updateLastname(state, "Dupont");

// Vérifications
console.log(state !== newState); // true
console.log(state.user !== newState.user); // true
console.log(state.user.profile !== newState.user.profile); // true
```

---

## Exercice 3 — Refactor mutable → immutable (array) (niveau 🟠)

```js
function removeUserById(users, id) {
  return users.filter((u) => u.id !== id);
}
```

---

## Exercice 4 — Refactor mutable → immutable (object) (niveau 🟠)

```js
function incrementScore(player) {
  return {
    ...player,
    score: player.score + 1,
  };
}
```

---

## Exercice 5 — Piège classique : référence partagée (niveau 🔴)

### 1. Pourquoi ?

Dans la fonction `createUser`, la propriété `settings` reçoit la **référence** de l'objet `defaultSettings`. Tous les utilisateurs créés pointent vers le même emplacement mémoire pour leurs réglages. Modifier l'un modifie la source commune.

### 2 & 3. Correction et vérification

```js
const defaultSettings = {
  theme: "dark",
  notifications: true,
};

function createUser(name) {
  return {
    name,
    settings: { ...defaultSettings }, // On clone l'objet par défaut
  };
}

const user1 = createUser("Alice");
const user2 = createUser("Bob");

user1.settings.theme = "light";

console.log(user2.settings.theme); // "dark" (sauvé !)
console.log(user1.settings !== user2.settings); // true
```

---

## Exercice 6 — Update conditionnel immutable (niveau 🔴)

L'astuce ici est de retourner l'ancienne référence si l'élément n'est pas celui à modifier.

```js
const state = {
  users: [
    { id: 1, name: "Alice", online: false },
    { id: 2, name: "Bob", online: false },
  ],
};

function setUserOnline(state, userId) {
  return {
    ...state,
    users: state.users.map(
      (user) =>
        user.id === userId
          ? { ...user, online: true } // Nouveau clone pour l'user concerné
          : user // On garde la référence exacte pour les autres
    ),
  };
}
```

---

## Exercice 7 — Détection de mutation (niveau 🔥)

### 1. Analyse en mémoire

L'instruction `const newState = state;` ne crée pas de copie, mais une nouvelle variable qui pointe vers la **même adresse mémoire**. En faisant `newState.counter++`, on modifie directement l'objet original.

### 2. Pourquoi `state === newState` ?

Parce que les deux variables contiennent exactement la même adresse mémoire (référence). En Javascript, la comparaison `===` sur les objets compare les références, pas le contenu.

### 3 & 4. Correction et test

```js
function increment(state) {
  return {
    ...state,
    counter: state.counter + 1,
  };
}

// Test
const oldState = { counter: 0 };
const newState = increment(oldState);

console.log(oldState.counter); // 0
console.log(newState.counter); // 1
console.log(oldState === newState); // false (Immutabilité respectée)
```
