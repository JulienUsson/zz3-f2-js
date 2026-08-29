---
layout: exercise
title: Devinez l'ordre
duration: 5
difficulty: 1
goal: Se construire un modèle mental de la boucle d'événements.
---

**Avant d'exécuter**, écrivez sur papier l'ordre dans lequel les six lettres vont s'afficher. Ensuite seulement, lancez le code.

```javascript {monaco-run} {height:'280px', autorun:false}
console.log("A")

setTimeout(() => console.log("B"), 0)

async function go() {
  console.log("C")
  await null
  console.log("D")
}
go()

Promise.resolve().then(() => console.log("E"))

console.log("F")
```

Si votre prédiction est fausse, c'est le but de l'exercice : reprenez le schéma de la boucle d'événements et justifiez **chaque** position.
