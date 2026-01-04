---
title: Frontend
theme: ./theme
layout: cover
defaults:
  layout: center
---

# Les frameworks frontend

Choisir ses armes

---

# Pourquoi parler des concurrents de React ?

React est **très populaire**, mais ce n’est **pas la seule solution** pour faire du frontend moderne.

Il existe :

* des frameworks **plus complets**
* des approches **plus simples**
* des modèles **plus performants**
* des philosophies différentes

👉 Important de **savoir qu’ils existent**.

---

# Angular

* Framework **complet** développé par Google.
* TypeScript **obligatoire**
* Très structuré
* Beaucoup de concepts (modules, services, DI…)
* 👍 Très utilisé en **entreprise**
* 👎 Courbe d’apprentissage élevée

---

# Exemple Angular

```ts
@Component({
  selector: 'app-counter',
  template: `
    <p>Count: {{ count }}</p>
    <button (click)="increment()">+</button>
  `
})
export class CounterComponent {
  count = 0

  increment() {
    this.count++
  }
}
```

➡️ Très déclaratif, très encadré.

---

# Vue.js

* souvent vu comme un **compromis entre React et Angular**
* Simple à prendre en main
* HTML, CSS et JS regroupés
* Très populaire en Europe & Asie
* 👍 Lisible, intuitif
* 👎 Moins répandu que React en très gros projets

---

# Exemple Vue

```vue
<template>
  <p>Count: {{ count }}</p>
  <button @click="count++">+</button>
</template>

<script setup>
import { ref } from "vue"

const count = ref(0)
</script>
```

➡️ Très proche du HTML natif.

---

# Svelte

* pas de framework runtime
* Compile le code au build
* Pas de Virtual DOM
* Très peu de JavaScript envoyé au navigateur
* 👍 Performances excellentes
* 👎 Écosystème plus petit

---

# Exemple Svelte

```svelte
<script>
  let count = 0
</script>

<p>Count: {count}</p>
<button on:click={() => count++}>+</button>
```

➡️ Pas de hooks, pas de JSX, très direct.

---

# SolidJS

* Très proche de React **dans la syntaxe**, mais avec un moteur différent.
* JSX comme React
* Pas de Virtual DOM
* Réactivité fine (signals)
* 👍 Très performant
* 👎 Communauté plus petite

---

# Exemple SolidJS

```jsx
import { createSignal } from "solid-js"

function Counter() {
  const [count, setCount] = createSignal(0)

  return (
    <>
      <p>Count: {count()}</p>
      <button onClick={() => setCount(count() + 1)}>
        +
      </button>
    </>
  )
}
```

➡️ Ressemble à React, mais fonctionne autrement.

---

# Comparaison rapide

| Framework | Type        | Philosophie           |
| --------- | ----------- | --------------------- |
| React     | Librairie   | Flexible, écosystème  |
| Angular   | Framework   | Structuré, entreprise |
| Vue       | Framework   | Simple, progressif    |
| Svelte    | Compilateur | Pas de runtime        |
| Solid     | Librairie   | Réactivité fine       |
