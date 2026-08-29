---
layout: quiz
---

# Dans quel ordre s'affichent ces trois logs ?

```javascript
console.log("A")
fetch(url).then(() => console.log("B"))
console.log("C")
```

- **A.** A, B, C
- **B.** A, C, B

<v-click>

> ✅ **B** — `fetch` rend la main immédiatement. Le `.then()` s'exécute plus tard, quand la réponse arrive.

</v-click>

---
layout: quiz
---

# Une requête répond `404`. Que fait `fetch` ?

- **A.** elle rejette, on part dans le `catch`
- **B.** elle réussit, il faut tester `response.ok`

<v-click>

> ✅ **B** — le piège classique. `fetch` ne rejette que sur une erreur **réseau**. Un 404 ou un 500 est une réponse valide à ses yeux.

</v-click>

---
layout: quiz
---

# `Promise.all([ok, ko, ok])` — que reçoit-on ?

- **A.** les deux résultats qui ont réussi
- **B.** une promesse rejetée

<v-click>

> ✅ **B** — le premier échec rejette l'ensemble, et on perd les succès. C'est `Promise.allSettled()` qu'il faut pour tout récupérer.

</v-click>

---
layout: quiz
---

# Peut-on écrire `await` en dehors d'une fonction `async` ?

- **A.** jamais
- **B.** oui, au niveau racine d'un module

<v-click>

> ✅ **B** — le *top-level await* est autorisé dans un module ES. Partout ailleurs, il faut une fonction `async`.

</v-click>

---
layout: quiz
---

# `Promise.race` : la promesse perdante est-elle annulée ?

- **A.** oui
- **B.** non, elle continue

<v-click>

> ✅ **B** — elle va jusqu'au bout, son résultat est simplement ignoré. Pour vraiment interrompre une requête, il faut un `AbortController`.

</v-click>
