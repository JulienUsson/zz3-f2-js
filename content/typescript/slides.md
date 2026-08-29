---
title: Typescript
theme: slidev-theme-javascript
addons:
  - slidev-addon-javascript
layout: cover
defaults:
  layout: center
---

# Typescript

Javascript avec des types


---
src: ./quiz.md
---

---

# Typescript is Javascript that scales

* TypeScript n’est **pas un nouveau langage** :
* c’est un **sur-ensemble de JavaScript**
* tout code JS valide est du TS valide
* mais avec un **système de types statiques**

---

# Javascript

* créé en **1995**
* typage dynamique
* permissif

➡️ parfait pour de petits scripts

---

# L’ère des grosses applications JS

À partir des années 2010 :
* explosion des SPA
* frameworks (AngularJS, Backbone, Ember, ...)
* bases de code **massives**
* bugs découverts **uniquement à l’exécution**

➡️ Besoin de :

* sécurité
* refactoring fiable
* auto-complétion intelligente

---

# Naissance de TypeScript

* Créé par **Microsoft**
* Première version : **2012**
* Lead architecte : *Anders Hejlsberg*
  * créateur de C#
  * Turbo Pascal

🎯 Apporter des **types optionnels** à JavaScript sans le casser

---

# Pourquoi TypeScript a gagné ?

* pas intrusif
* adoption progressive possible
* compilation vers JS standard
* excellent tooling (VS Code)

---

# Le problème
 
```javascript {monaco-run} {height:'auto', autorun:false}
function add(a, b) {
  return a + b;
}

console.log(add(1, "2"))
```

---

# La solution: TypeScript

```typescript {monaco} {height:'auto', autorun:false}
function add(a: number, b: number) {
  return a + b;
}

console.log(add(1, "2"))
```

* analysé **avant exécution**
* ajoute une couche de vérification
* n’existe plus après compilation


---

# TypeScript ne s’exécute pas

* le navigateur **ne comprend pas** TypeScript
* TypeScript est **transpilé** en JavaScript
* ➡️ Zéro impact runtime
* ➡️ Zéro coût performance

```typescript {monaco-run} {height:'auto', autorun:false}
function add(a: number, b: number) {
  return a + b;
}

console.log(add(1, "2"))
```

---

# Typescript c'est elle

<img src="./assets/square-hole.png" alt="Square hole meme" width="400"/>

---

# Typage dynamique (JS)

```javascript {monaco} {height:'auto'}
let value = 42;
value = "hello";
value = true;
```

* flexible
* dangereux à grande échelle

---

# Typage statique (TS)

```typescript {monaco} {height:'auto'}
let value: number = 42;
value = "hello";
```

* prévisible
* refactor safe
* lisible

---

# Inférence de type

* TypeScript **devine** les types quand c’est possible.
* C'est la grande force de TypeScript !

```typescript {monaco} {height:'auto'}
let age = 31;
```

* Pas besoin de tout typer explicitement<br/>➡️ moins verbeux

---

# Types primitifs

```typescript {monaco} {height:'auto'}
let age: number = 31;
let name: string = "Julien";
let isAdmin: boolean = true;

enum E {
  A,
  B,
}
```

---
src: ./exercises/01-types-primitifs.md
---

---

# Tableaux

```typescript {monaco} {height:'auto'}
let scores: number[] = [10, 20, 30];
```

ou

```typescript {monaco} {height:'auto'}
let scores: Array<number> = [10, 20, 30];
```

---

# Tuples

```ts
let user: [string, number] = ["Julien", 31];
```

➡️ tableau à structure fixe

---
src: ./exercises/02-tableaux-tuples.md
---

---

# Any: le type qui désactive le typage

```typescript {monaco} {height:'auto'}
let data: any = 42;
data = "hello";
data = {};
```

* ⚠️ Désactive totalement TypeScript
* ~~À éviter~~ **À ne jamais utiliser** en prod

---

# Unknown (le type sécurisé)

```typescript {monaco} {height:'auto'}
let data: unknown;

if (typeof data === "string") {
  console.log(data.toUpperCase());
}
```

* sécurisé
* oblige à vérifier

---
src: ./exercises/03-any-unknown.md
---

---

# Typage des fonctions

```typescript {monaco} {height:'auto'}
function add(a: number, b: number): number {
  return a + b;
}

let multiply = (a: number, b: number): number => {
  return a * b;
};

function greet(name?: string) {
  console.log(`Hello ${name ?? "World"}`);
}
```

---
src: ./exercises/04-fonctions.md
---

---

# Typage des objets

```typescript {monaco} {height:'auto'}
let user: {
  firstname: string;
  age: number;
} = {
  firstname: "Julien",
  age: 31,
};
```

---

# Interfaces

```typescript {monaco} {height:'auto'}
interface User {
  firstname: string;
  age: number;
}

let user: User = {
  firstname: "Julien",
  age: 31,
};
```

recommandé pour :
* objets
* API publiques

---

# Extends interface

```typescript {monaco} {height:'auto'}
interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  permissions: string[];
}
```

 * `Admin` possède **tout ce que User a**, plus ses propres propriétés
 * logique proche de l’héritage en POO

---
src: ./exercises/05-objets-interfaces.md
---

---

# Type

```ts
type HasName = {
  name: string;
};

type Id = number | string;
type Result = 'success' | 'error';

type HasId = {
  id: Id;
};

type Entity = HasId & HasName;
```

* similaire aux interfaces
* plus puissant (unions, intersections)
* recommandé pour la typage avancé

---
src: ./exercises/06-union-discriminee.md
---

---

# Generics \<T>

* écrire du code **réutilisable**
* sans perdre le typage
* sans `any`

```typescript {monaco} {height:'auto'}
function identity<T>(arg: T): T {
  return arg;
}
```

---
src: ./exercises/07-generics.md
---

---

# Utility Types

```typescript {monaco} {height:'auto'}
interface User {
  id: number
  name: string
  email: string
}

type UserPreview = Pick<User, "id" | "name">
type UserWithoutEmail = Omit<User, "email">
type UserUpdate = Partial<User>

```

[Et pleins d'autres...](http://typescriptlang.org/docs/handbook/utility-types.html)

---
src: ./exercises/08-utility-types.md
---

---
src: ./exercises/09-readonly-immutabilite.md
---

---
src: ./exercises/10-mini-projet-tournoi.md
---

---
layout: question
---

Et cette fois, on a tout vu de typescript ?

---

# Les autres concepts dont on ne parlera pas

- Type Guards
- Decorators
- Polymorphisme
- Mapped Types
- ...

➡️ Vous n’avez **PAS** besoin de tout connaître pour être un bon dev TS
