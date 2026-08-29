---
layout: exercise
title: Mini-projet — un combat
duration: 30
difficulty: 3
goal: Assembler classes, héritage, champs privés et méthodes statiques.
---

**`Player`** : `name`, `level`, et des `hp` **non modifiables de l'extérieur**. Méthodes `attack()`, `takeDamage(amount)`, `isAlive()`.

**`Warrior extends Player`** : une `strength` en plus, `attack()` surchargée en `"Warrior attacks with strength X"`, et des dégâts supérieurs.

**`Player.compare(a, b)`** — statique : retourne le joueur du niveau le plus élevé, ou `null` en cas d'égalité.

Puis un script qui crée deux joueurs, les fait s'attaquer à tour de rôle, s'arrête quand l'un meurt et affiche le vainqueur.

```
Warrior attacks with strength 10
Player takes 10 damage
Player HP: 0
Player is dead
Winner is Conan
```

🎁 Pour aller plus loin : une classe `Mage`, des armes, de l'équipement qui réduit les dégâts reçus.
