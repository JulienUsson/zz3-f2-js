---
layout: exercise
title: Espacer les tentatives
duration: 10
difficulty: 3
goal: Ne pas marteler un serveur déjà en difficulté.
---

Améliorer `retry` pour attendre entre les tentatives : 1 s avant la 2ᵉ, 2 s avant la 3ᵉ, 4 s avant la 4ᵉ.

```javascript {monaco-run} {height:'260px', autorun:false}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function retry(fn, attempts) {
  // reprenez votre version, et intercalez un delay qui double à chaque tour
}
```

Affichez l'horodatage à chaque tentative pour vérifier les écarts. Pourquoi doubler plutôt qu'attendre toujours la même durée ?
