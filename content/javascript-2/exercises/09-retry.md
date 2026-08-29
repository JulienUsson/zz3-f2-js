---
layout: exercise
title: Réessayer en cas d'échec
duration: 12
difficulty: 3
goal: Composer vos propres utilitaires à partir des promesses.
---

Écrire `retry(fn, attempts)` qui exécute `fn` (retournant une promesse), réessaie tant qu'elle échoue, et abandonne après `attempts` tentatives.

```javascript {monaco-run} {height:'280px', autorun:false}
let calls = 0
function flaky() {
  calls++
  return calls < 3 ? Promise.reject(new Error("boom")) : Promise.resolve("ok")
}

async function retry(fn, attempts) {
  // à vous
}

retry(flaky, 5)
  .then((value) => console.log("Success", value, "après", calls, "appels"))
  .catch(() => console.log("Failed after 5 attempts"))
```
