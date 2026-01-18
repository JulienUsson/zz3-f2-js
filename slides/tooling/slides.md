---
title: Tooling
theme: slidev-theme-javascript
addons:
  - slidev-addon-javascript
layout: cover
defaults:
  layout: center
---

# Le tooling

Formatter, builder, respirer

---

# À quoi sert le tooling ?

Le tooling permet de :

- écrire du JavaScript moderne
- organiser le code
- éviter les bugs avant l’exécution
- améliorer la DX (Developer Experience)
- livrer du code performant

---

# Panorama de l’écosystème

On va parler de :

- Bundlers
- Dev servers
- Transpileurs
- Linters
- Formatters
- Package managers
- Task runners & monorepos

---

# Le problème des imports

```js
import Button from "./Button"
import Header from "./Header"
````

* le navigateur ne comprend pas un graphe complexe
* trop de fichiers
* pas d’optimisation

---

# Les bundlers

Un **bundler** :

* analyse les imports
* construit un graphe de dépendances
* génère un ou plusieurs fichiers optimisés

---

# Webpack (historique)

* créé en 2014
* standard pendant des années
* extrêmement configurable

❌ configuration lourde
❌ lent sur gros projets

---

# Concurrents de Webpack

* Rollup
  → parfait pour les librairies
* Rolldown
  → réécriture de Rollup en Rust
* Parcel
  → zero-config
* esbuild
  → ultra rapide (Go)

---

# Limites des bundlers classiques

* rebuild complet
* HMR lent
* attente longue en dev

➡️ Mauvaise DX

---

# Vite

* utilise les ES modules natifs
* bundling uniquement en production
* démarrage instantané

✔ HMR ultra rapide
✔ config simple
✔ standard actuel

---

# Concurrents de Vite

* Webpack Dev Server
* Parcel
* Bun

---

# Les transpileurs

Problème :

* navigateurs ≠ mêmes fonctionnalités
* TypeScript
* JSX

➡️ Besoin de transformation

---

# Babel

* transpile JS moderne → JS compatible
* système de plugins & presets
* très mature

---

# Concurrents de Babel

* SWC
  → écrit en Rust, très rapide
* esbuild
  → transpilation + bundling
* tsc
  → TypeScript → JavaScript

---

# Problème du formatage

```js
function foo( a,b ){return{a:a,b:b}}
```

* lisible ?
* maintenable ?

---

# Prettier

* formatteur opinionated
* zéro débat de style
* fonctionne avec ESLint

✔ même format partout
✔ aucun choix à faire

---

# Concurrents de Prettier

* Biome
* Rome

---

# Package managers

* npm
  → historique, intégré à Node
* Yarn
  → plus rapide (historiquement)
* pnpm
  → stockage global, très rapide
* bun
  → tout en un (package manager + bundler + transpileur)

➡️ pnpm très utilisé en 2025

---

# Monorepos

Problèmes :

* plusieurs apps
* plusieurs packages
* dépendances croisées

---

# Solutions monorepo

* pnpm workspaces
* Nx
* Turborepo
* Lerna

---

# Stack moderne typique

Aujourd’hui, une stack courante :

* Vite
* TypeScript
* ESLint
* Prettier
* Vitest
* pnpm
