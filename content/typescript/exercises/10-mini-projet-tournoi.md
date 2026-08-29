---
layout: exercise
title: Mini-projet — un tournoi typé
duration: 60
difficulty: 3
goal: Assembler unions discriminées, readonly et utility types sur un vrai programme.
---

Un tournoi à élimination directe : une liste de joueurs, chaque tour produit une **nouvelle** liste, jusqu'au vainqueur.

**Règles du jeu :** ❌ mutation · ❌ `any` · ❌ `!` · ❌ `as` — et toute erreur doit être bloquée **au build ou au runtime** (`throw new Error()`). Les `console.log()` sont vos amis.

### Étape 1 — Modéliser les joueurs

```ts
type BasePlayer = {
  readonly id: number;
  readonly name: string;
  readonly level: number;
  readonly hp: number;
};

type Warrior = BasePlayer & {
  readonly role: "WARRIOR";
  readonly strength: number;
};
```

Créer `Mage` (avec `mana`), puis `Player = Warrior | Mage`, puis `displayPlayer` qui affiche les infos — avec un `switch` sur `role`.

### Étape 2 — Calculer la puissance

```ts
function getPower(player: Player): number;
```

WARRIOR → `level + strength`, MAGE → `level + mana`.

### Étape 3 — Modéliser les matchs

```ts
type Match = {
  readonly id: number;
  readonly player1: Player;
  readonly player2: Player;
  readonly winner?: Player;
};
```

Plus une fonction `displayMatch`.

### Étape 4 — Créer un match

```ts
function createMatch(id: number, player1: Player, player2: Player): Match;
```

Avec `player1.id !== player2.id`.

### Étape 5 — Résoudre un match

```ts
function resolveMatch(match: Match): Match;
```

Sans `winner`, on le calcule : la plus grande puissance gagne, et à égalité, le plus de `hp`. Avec un `winner`, on retourne le match tel quel. Le vainqueur est forcément `player1` ou `player2`.

### Étape 6 — Extraire le vainqueur

```ts
function extractWinner(match: Match): Player;
```

Le match doit avoir un `winner`.

### Étape 7 — Un tour

```ts
function playRound(players: readonly Player[]): readonly Player[];
```

Nombre de joueurs pair, appariement séquentiel : création → résolution → extraction.

### Étape 8 — Le tournoi

```ts
function runTournament(players: readonly Player[]): Player;
```

Appelle `playRound` tant qu'il reste plus d'un joueur, et retourne le vainqueur.

### Étape 9 — La refacto qui justifie TypeScript

Remplacer `winner?: Player` par **deux types distincts** : un match est soit `PendingMatch`, soit `FinishedMatch` — et seul le second a un `winner`.

- `createMatch` retourne toujours un `PendingMatch`
- `resolveMatch` prend un `PendingMatch` et retourne toujours un `FinishedMatch`
- `extractWinner` ne manipule plus que des `FinishedMatch`

Comptez les vérifications que vous pouvez **supprimer** après cette étape : le compilateur cesse de vous demander de prouver ce que la signature garantit déjà. C'est l'étape la plus intéressante des dix.

### Étape 10 — Bonus

Une nouvelle classe de joueur (archer, soigneur…), un système d'expérience et de niveaux, une interface pour visualiser le tournoi.
