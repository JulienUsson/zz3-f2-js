---
layout: quiz
---

# Que vaut `[1, 5, 10].sort()` ?

- **A.** `[1, 5, 10]`
- **B.** `[1, 10, 5]`
- **C.** une erreur

<v-click>

> ✅ **B** — sans callback, `sort()` compare les valeurs **comme des chaînes**. Et `"10"` vient avant `"5"`.

</v-click>

---
layout: quiz
---

# Après `users.sort(...)`, que contient `users` ?

- **A.** le tableau d'origine, intact
- **B.** le tableau trié

<v-click>

> ✅ **B** — `sort()` **modifie** le tableau. C'est `toSorted()` qui en retourne un nouveau.

</v-click>

---
layout: quiz
---

# `find()` retourne quoi quand rien ne correspond ?

- **A.** `[]`
- **B.** `null`
- **C.** `undefined`

<v-click>

> ✅ **C** — et il retourne **un élément**, pas un tableau. C'est `filter()` qui retourne un tableau, vide le cas échéant.

</v-click>

---
layout: quiz
---

# `[10, 20].reduce((a, b) => a + b)` — que manque-t-il ?

- **A.** rien, ça marche
- **B.** la valeur de départ

<v-click>

> ✅ **A** — ça marche, le premier élément sert de départ. Mais sur un tableau **vide**, ça lève une exception : d'où l'habitude de toujours écrire `, 0`.

</v-click>

---
layout: quiz
---

# Deux compteurs créés par `createCounter()` partagent-ils leur valeur ?

- **A.** oui
- **B.** non

<v-click>

> ✅ **B** — chaque appel crée un **nouvel environnement**. C'est tout l'intérêt d'une closure.

</v-click>
