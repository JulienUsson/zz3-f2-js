---
title: Javascript 3
theme: slidev-theme-javascript
addons:
  - slidev-addon-javascript
layout: cover
defaults:
  layout: center
---

# Javascript 3

Un cours avec classe 😎


---
src: ./quiz.md
---

---

# JS est orienté objet

JavaScript est :

* Orienté **prototype** (et non classes à la Java)
* Tout est objet (ou presque)
* Les classes ES6 sont… du **sucre syntaxique**<br/>➡️ Avant ES6, pas de mot-clé `class`.

---
layout: question
---

Comment on faisait avant 2015 ?

---

# Les fonctions constructeurs

```javascript {monaco-run} {height:'auto'}
function User(name, age) {
  this.name = name
  this.age = age
}

let user1 = new User("Alice", 25)
console.log(user1.name)
```

* `User` est une fonction
* `new` crée un objet vide
* `this` fait référence à l’instance

---

# Ajouter des méthodes

```javascript {monaco-run} {height:'auto'}
function User(name, age) {
  this.name = name
  this.age = age
  this.sayHello = function () {
    console.log("Hello " + this.name)
  }
}

let user1 = new User("Alice", 25)
user1.sayHello()
```

❌ Problème :

* La fonction est recréée **pour chaque instance**
* Gaspillage de mémoire

---

# Le prototype

```javascript {monaco-run} {height:'auto'}
function User(name, age) {
  this.name = name
  this.age = age
}

User.prototype.sayHello = function () {
  console.log("Hello " + this.name)
}

let user1 = new User("Alice", 25)
user1.sayHello()
```

- Une seule méthode partagée
- Plus performant

---
src: ./exercises/01-constructeur-user.md
---

---

# Comment ça marche ?

```javascript
let user = new User("Bob", 30)

user.sayHello()
```

JavaScript cherche :

1. Dans l’objet `user`
2. Puis dans `User.prototype`
3. Puis dans `Object.prototype`

➡️ **Chaîne de prototypes**

---

# L’héritage

```javascript {monaco-run} {height:'auto'}
function User(name, age) {this.name = name; this.age = age}
User.prototype.sayHello = function () {console.log("Hello " + this.name)}

function Admin(name, age) {
  User.call(this, name, age)
}

Admin.prototype = Object.create(User.prototype)
Admin.prototype.constructor = Admin

Admin.prototype.deleteUser = function () {
  console.log("User deleted")
}

let admin = new Admin("Louise", 28)
admin.sayHello()
admin.deleteUser()
```

---
layout: question
---

On va vraiment devoir écrire tout ça ?

---
src: ./exercises/02-heritage-es5.md
---

---

# 2015: les classes arrivent 🎉

```javascript {monaco-run} {height:'auto'}
class User {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  sayHello() {
    console.log(`Hello ${this.name}`)
  }
}

let user = new User("Alice", 25)
user.sayHello()
```

- Plus lisible
- Plus proche des autres langages

---

# Important : ce sont toujours des prototypes

```javascript {monaco-run} {height:'auto'}
class User {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

console.log(typeof User)
```
* `class` = sucre syntaxique
* Même moteur
* Même prototype derrière

---

---
src: ./exercises/03-classe-user.md
---

---

# L’héritage avec ES6

```javascript {monaco-run} {height:'auto'}
class User {
  constructor(name, age) {this.name = name;this.age = age}
  sayHello() {console.log(`Hello ${this.name}`)}
}

class Admin extends User {
  constructor(name, age) {
    super(name, age)
  }

  deleteUser() {
    console.log("User deleted")
  }
}

let admin = new Admin("Louise", 28)
admin.sayHello()
admin.deleteUser()
```

---
src: ./exercises/04-heritage-es6.md
---

---
src: ./exercises/05-polymorphisme.md
---

---

# Méthodes statiques

```javascript {monaco-run} {height:'auto'}
class MathUtils {
  static add(a, b) {
    return a + b
  }
}

console.log(MathUtils.add(1, 2))
```

* Appelées sur la classe
* Pas sur les instances

---
src: ./exercises/06-methodes-statiques.md
---

---

# Getter / Setter

Les **getters** et **setters** permettent de contrôler l’accès aux propriétés d’un objet.

```javascript {monaco-run} {height:'auto'}
class User {
  constructor(name) {
    this._name = name
  }

  get name() {
    return this._name.toUpperCase()
  }

  set name(value) {
    if (value.length < 2) {
      throw new Error("Name too short")
    }
    this._name = value
  }
}

let user = new User("Alice")
user.name = "Bob"
console.log(user.name)
```

---
src: ./exercises/07-getter-setter.md
---

---

# Champs privés (ES2022)

```javascript {monaco-run} {height:'auto'}
class BankAccount {
  #balance = 0

  deposit(amount) {
    this.#balance += amount
  }

  showBalance() {
    console.log(this.#balance)
  }
}

let account = new BankAccount()
account.deposit(100)
account.showBalance()
// console.log(account.#balance)
```

* Avant ES2022 : convention `_balance`
* Vraiment privés
* Inaccessibles depuis l’extérieur

---
src: ./exercises/08-champs-prives.md
---

---
src: ./exercises/09-refactor-es5-es6.md
---

---
src: ./exercises/10-mini-projet-combat.md
---

---
layout: question
---

Est-ce que les classes JS sont-elles vraiment des classes ?
