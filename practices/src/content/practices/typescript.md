---
title: "Typescript"
slides: "typescript"
correctionDate: 2026-01-29
---

Avant de commencer, n'oubliez pas que la documentation de Javascript est disponible [ici](https://developer.mozilla.org/fr/docs/Web/JavaScript) ou [là](https://www.w3schools.com/js/default.asp) et que la documentation de Typescript est disponible [ici](https://www.typescriptlang.org/docs/). Nous utiliserons [CodeSandbox](https://codesandbox.io/p/sandbox/vanilla-ts) (fonctionne mieux avec Chrome/Chromium), un environnement en ligne pour coder et exécuter du Typescript.

---

## Mini-projet

### Contraintes globales

- ❌ mutation
- ❌ any
- ❌ ! operator
- ❌ as
- toute erreur doit être bloquée **au build ou au runtime** (`throw new Error()`)
- Les `console.log()` sont vos amis pour voir ce qu'il se passe

### Contexte

Tournoi à élimination directe :

- liste initiale de joueurs
- chaque tour produit une **nouvelle liste**
- on recommence jusqu’à n’avoir **qu’un vainqueur**

### Étape 1 — Modélisation des joueurs

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

- Créer un type `Mage` similaire à `Warrior` avec un attribut `mana`
- Créer un type `Player` qui est une union de `Warrior` et `Mage`
- Créer une fonction `displayPlayer` pour afficher les infos d’un joueur (ℹ️ Utiliser un `switch` sur le role)

### Étape 2 — Calcul de puissance

```ts
function getPower(player: Player): number;
```

- En fonction du role (`switch`), retourner :
  - WARRIOR → level + strength
  - MAGE → level + mana

### Étape 3 — Modélisation des matchs

```ts
type Match = {
  readonly id: number;
  readonly player1: Player;
  readonly player2: Player;
  readonly winner?: Player;
};
```

- Créer une fonction `displayMatch` pour afficher les infos d’un match

### Étape 4 — Création d’un match

```ts
function createMatch(id: number, player1: Player, player2: Player): Match;
```

- `player1.id !== player2.id`

### Étape 5 — Résolution d’un match

```ts
function resolveMatch(match: Match): Match;
```

- si pas de `winner` → calculer le vainqueur
  - comparer les puissances
  - en cas d’égalité, le joueur avec le plus de hp gagne
- si déjà un `winner` → retourner tel quel
- le `winner` est forcément `player1` ou `player2`

### Étape 6 — Extraction du vainqueur

```ts
function extractWinner(match: Match): Player;
```

- le match doit avoir un `winner`

### Étape 7 — Un tour de tournoi

```ts
function playRound(players: readonly Player[]): readonly Player[];
```

- nombre de joueurs pair
- appariement séquentiel
- création → résolution → extraction des winners

### Étape 8 — Tournoi complet

```ts
function runTournament(players: readonly Player[]): Player;
```

- appelle `playRound` tant que `players.length > 1`
- s’arrête avec un seul joueur
- retourne le vainqueur final

### Étape 9 — Refacto final

Pour se rendre compte de l’intérêt de Typescript, refactorer le code pour que:

- Le type `Match` s’inspire de la modélisation des joueurs.
  - Tous les matchs possèdent un id, un player1 et un player2.
  - Un match peut être en cours (`PendingMatch`) ou terminé (`FinishedMatch`).
  - Un match terminé possède un attribut supplémentaire `winner`.
- `createMatch` → retourne toujours un `PendingMatch`
- `resolveMatch` → prend un `PendingMatch` et retourne toujours un `FinishedMatch`
- `extractWinner` → ne manipule plus que des `FinishedMatch`

### Étape 10 — Bonus

- Ajouter une nouvelle classe de joueur (archer, soigneur, etc.)
- Ajouter un système de points d’expérience et de niveaux pour les joueurs
- Ajouter une interface utilisateur simple pour visualiser le tournoi
- ...
