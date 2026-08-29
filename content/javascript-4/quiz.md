---
layout: quiz
---

# Le mot-clé `class` a-t-il introduit les classes en Javascript ?

- **A.** oui, depuis ES6
- **B.** non, c'est de la syntaxe par-dessus les prototypes

<v-click>

> ✅ **B** — sous le capot, rien n'a changé : `class` construit toujours une chaîne de prototypes.

</v-click>

---
layout: quiz
---

# Une méthode `static` s'appelle sur quoi ?

- **A.** une instance : `player.create()`
- **B.** la classe : `Player.create()`

<v-click>

> ✅ **B** — une méthode statique n'a pas de `this` pointant sur une instance. Typiquement une fabrique ou un utilitaire.

</v-click>

---
layout: quiz
---

# `user.#password` depuis l'extérieur de la classe ?

- **A.** ça marche, c'est juste une convention
- **B.** erreur de syntaxe

<v-click>

> ✅ **B** — les champs `#` sont **vraiment** privés, contrairement à l'ancienne convention `_password`.

</v-click>

---
layout: quiz
---

# Avec un getter `fullName`, on écrit :

- **A.** `user.fullName()`
- **B.** `user.fullName`

<v-click>

> ✅ **B** — un getter s'utilise comme une propriété. C'est tout son intérêt : on peut remplacer un champ par un calcul sans changer le code appelant.

</v-click>

---
layout: quiz
---

# Dans le constructeur d'une classe fille, `super()` doit être appelé :

- **A.** avant d'utiliser `this`
- **B.** n'importe où
- **C.** ce n'est pas obligatoire

<v-click>

> ✅ **A** — utiliser `this` avant `super()` lève une `ReferenceError`.

</v-click>
