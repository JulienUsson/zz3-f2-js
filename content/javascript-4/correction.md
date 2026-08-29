## Exercice 1 — Des valeurs par défaut

```javascript
function createUser(name, role = "user") {
  return { name, role };
}

console.log(createUser("Alice"));           // role: "user"
console.log(createUser("Bob", "admin"));    // role: "admin"
console.log(createUser("Carl", null));      // role: null  ⚠️
console.log(createUser("Dora", undefined)); // role: "user"
```

Une valeur par défaut ne se déclenche que si l'argument vaut **`undefined`**.
`null` est une valeur comme une autre : elle est passée telle quelle. C'est la
même distinction qu'entre `||` et `??`.

---

## Exercice 2 — Naviguer dans un objet incertain

```javascript
for (const user of users) {
  console.log(user.name, ":", user.address?.city ?? "Ville inconnue");
}
```

`?.` court-circuite dès qu'il rencontre `null` ou `undefined` et renvoie
`undefined`, au lieu de lever `Cannot read properties of null`.

Le piège :

```javascript
const settings = { volume: 0, label: "" };

console.log(settings.volume || 50); // 50  ⚠️ on a perdu le volume à zéro
console.log(settings.volume ?? 50); // 0   ✅
```

`||` se déclenche sur toutes les valeurs *falsy* — `0`, `""`, `false`, `NaN`.
`??` ne se déclenche que sur `null` et `undefined`. Pour une valeur par défaut,
c'est presque toujours `??` qu'il faut.

---

## Exercice 3 — Déstructurer plutôt que répéter

```javascript
function describe({ firstname, lastname, city = "ville inconnue" }) {
  return `${firstname} ${lastname}, ${city}`;
}
```

Bonus :

```javascript
const [first, ...others] = [1, 2, 3, 4];
console.log(first, others); // 1 [2, 3, 4]
```

⚠️ La valeur par défaut `city = "..."` ne s'applique, là encore, que si la
propriété est absente ou vaut `undefined`.

---

## Exercice 4 — Copier en changeant une chose

```javascript
const admin = { ...user, role: "admin" };
const active = { ...user, active: true };
const numbers2 = [1, ...numbers, 4];
const merged = { ...{ a: 1 }, ...{ b: 2 } };
```

L'ordre décide qui gagne :

```javascript
{ ...user, role: "admin" }  // "admin" écrase la valeur de user
{ role: "admin", ...user }  // user écrase "admin" — presque jamais ce qu'on veut
```

Le spread ne copie **qu'un niveau**. Les objets imbriqués restent partagés :
c'est exactement le sujet des exercices suivants.

---

## Exercice 5 — Accepter n'importe quel nombre d'arguments

```javascript
function max(...numbers) {
  return numbers.length === 0 ? 0 : Math.max(...numbers);
}
```

Le même `...` fait deux choses opposées :

- **à la déclaration** (rest) : rassemble les arguments dans un tableau ;
- **à l'appel** (spread) : étale un tableau en arguments séparés.

Ici les deux cohabitent dans quatre lignes.

---

## Exercice 6 — Construire une phrase

```javascript
console.log(
  `Bonjour ${user.firstname} ${user.lastname},
vous avez ${user.age} ans.
L'an prochain vous en aurez ${user.age + 1}.`,
);
```

Les retours à la ligne sont pris tels quels — plus besoin de `\n`. Et `${}`
accepte n'importe quelle expression, ici un calcul.

---

## Exercice 7 — Mutation cachée

`.push()` modifie le tableau sur place. Comme `user` ne contient qu'une
**référence** vers ce tableau, l'utilisateur d'origine est altéré — et la
fonction retourne le même objet, pas un nouveau.

```javascript
function addTag(user, tag) {
  return {
    ...user,
    tags: [...user.tags, tag], // nouveau tableau, pas un push
  };
}

const updated = addTag(users[0], "editor");
console.log(updated === users[0]);           // false
console.log(updated.tags === users[0].tags); // false
console.log(users[0].tags);                  // ["admin"] — intact
```

---

## Exercice 8 — Une copie qui n'en est pas une

`const newState = state` ne crée aucun objet : les deux noms désignent la
**même adresse mémoire**. `newState.counter++` modifie donc l'original, et
`===` compare les références — d'où `true`.

`const` interdit de réaffecter le nom, pas de modifier l'objet pointé.

```javascript
function increment(state) {
  return { ...state, counter: state.counter + 1 };
}

const oldState = { counter: 0 };
const newState = increment(oldState);

console.log(oldState.counter);      // 0
console.log(newState.counter);      // 1
console.log(oldState === newState); // false
```

---

## Exercice 9 — Retirer sans splice

```javascript
function removeUserById(users, id) {
  return users.filter((user) => user.id !== id);
}
```

⚠️ La version d'origine avait un bug en plus d'être mutante : si l'`id`
n'existe pas, `findIndex` renvoie `-1`, et `splice(-1, 1)` supprime le
**dernier** élément. `filter` n'a pas ce problème.

---

## Exercice 10 — Incrémenter sans modifier

```javascript
function incrementScore(player) {
  return { ...player, score: player.score + 1 };
}
```

Le spread recopie toutes les autres propriétés : ajouter un champ à `player`
plus tard ne demandera aucune modification ici.

---

## Exercice 11 — Immutabilité profonde

```javascript
function updateLastname(state, newLastname) {
  return {
    ...state,
    user: {
      ...state.user,
      profile: { ...state.user.profile, lastname: newLastname },
    },
  };
}
```

Avec un seul niveau de spread, `state.user !== next.user` tombe : `user` reste
la même référence, et modifier son `profile` toucherait l'état d'origine. Il
faut cloner **chaque niveau du chemin** que l'on modifie — et seulement
celui-là.

---

## Exercice 12 — Le piège de la référence partagée

`settings: defaultSettings` ne copie rien : chaque utilisateur reçoit la même
référence. Ils partagent donc physiquement le même objet de réglages.

```javascript
function createUser(name) {
  return { name, settings: { ...defaultSettings } };
}

const user1 = createUser("Alice");
const user2 = createUser("Bob");

user1.settings.theme = "light";
console.log(user2.settings.theme);              // "dark"
console.log(user1.settings !== user2.settings); // true
```

⚠️ Ce clone reste **superficiel**. Si `defaultSettings` contenait lui-même un
objet imbriqué, il resterait partagé.

---

## Exercice 13 — Ne recréer que ce qui change

```javascript
function setUserOnline(state, userId) {
  return {
    ...state,
    users: state.users.map((user) =>
      user.id === userId
        ? { ...user, online: true } // seul celui-là est recréé
        : user,                     // les autres gardent leur référence
    ),
  };
}
```

Rendre `user` tel quel dans la branche `else` n'est pas une paresse d'écriture :
c'est ce qui permet à React de comparer les références et de ne réafficher que
la ligne modifiée. Recréer tous les objets « pour faire propre » ferait
retomber toute la liste.
