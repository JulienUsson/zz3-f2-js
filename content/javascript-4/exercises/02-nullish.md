---
layout: exercise
title: Naviguer dans un objet incertain
duration: 8
difficulty: 2
goal: Choisir entre `||` et `??` en connaissance de cause.
---

Afficher la ville de chaque utilisateur, ou `"Ville inconnue"` — sans qu'aucun accès ne plante.

```javascript {monaco-run} {height:'280px', autorun:false}
const users = [
  { name: "Alice", address: { city: "Paris" } },
  { name: "Bob", address: null },
  { name: "Carl" },
]

for (const user of users) {
  // ?. et ??
}
```

Puis, ce piège :

```javascript {monaco-run} {height:'180px', autorun:false}
const settings = { volume: 0, label: "" }

console.log(settings.volume || 50)   // ?
console.log(settings.volume ?? 50)   // ?
```

`0` et `""` sont *falsy* mais pas *nullish* : c'est toute la différence entre les deux opérateurs.
