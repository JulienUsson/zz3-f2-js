---
layout: quiz
---

# `const volume = 0` — que valent ces deux lignes ?

```javascript
volume || 50
volume ?? 50
```

- **A.** 50 et 50
- **B.** 50 et 0
- **C.** 0 et 0

<v-click>

> ✅ **B** — `||` se déclenche sur tout ce qui est *falsy*, dont `0` et `""`. `??` ne réagit qu'à `null` et `undefined`.

</v-click>

---
layout: quiz
---

# `{ ...user }` copie l'objet sur quelle profondeur ?

- **A.** tous les niveaux
- **B.** un seul niveau

<v-click>

> ✅ **B** — les objets imbriqués restent **partagés**. C'est la source du bug de la référence partagée.

</v-click>

---
layout: quiz
---

# `const user = { name: "Alice" }` — puis `user.name = "Bob"` ?

- **A.** erreur, l'objet est constant
- **B.** ça marche

<v-click>

> ✅ **B** — `const` interdit de **réaffecter le nom**, pas de modifier l'objet pointé.

</v-click>

---
layout: quiz
---

# Laquelle de ces deux méthodes laisse le tableau d'origine intact ?

- **A.** `sort()`
- **B.** `toSorted()`

<v-click>

> ✅ **B** — même distinction pour `reverse()`/`toReversed()` et `splice()`/`toSpliced()`.

</v-click>

---
layout: quiz
---

# `function f(role = "user")` — que vaut `role` dans `f(null)` ?

- **A.** `"user"`
- **B.** `null`

<v-click>

> ✅ **B** — une valeur par défaut ne se déclenche que sur `undefined`. Même logique que `??`.

</v-click>
