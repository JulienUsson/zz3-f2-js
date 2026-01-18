---
title: "Typescript"
---

## Correction du Mini-Projet TypeScript

### Étapes 1 & 2 — Modélisation et Puissance

Nous définissons les types de base et utilisons l'**union discriminante** via l'attribut `role` pour gérer les spécificités de chaque classe.

```typescript
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

type Mage = BasePlayer & {
  readonly role: "MAGE";
  readonly mana: number;
};

type Player = Warrior | Mage;

const displayPlayer = (player: Player): void => {
  switch (player.role) {
    case "WARRIOR":
      console.log(`[Guerrier] ${player.name} (Force: ${player.strength})`);
      break;
    case "MAGE":
      console.log(`[Mage] ${player.name} (Mana: ${player.mana})`);
      break;
  }
};

const getPower = (player: Player): number => {
  switch (player.role) {
    case "WARRIOR":
      return player.level + player.strength;
    case "MAGE":
      return player.level + player.mana;
  }
};
```

---

### Étapes 3 à 6 — Gestion des Matchs

Pour respecter la contrainte d'immuabilité, chaque modification (comme l'ajout d'un vainqueur) retourne un nouvel objet.

```typescript
type Match = {
  readonly id: number;
  readonly player1: Player;
  readonly player2: Player;
  readonly winner?: Player;
};

const displayMatch = (match: Match): void => {
  console.log(
    `Match ${match.id}: ${match.player1.name} vs ${match.player2.name}`
  );
  if (match.winner) {
    console.log(`Vainqueur: ${match.winner.name}`);
  }
};

const createMatch = (id: number, player1: Player, player2: Player): Match => {
  if (player1.id === player2.id) {
    throw new Error("Un joueur ne peut pas s'affronter lui-même");
  }
  return { id, player1, player2 };
};

const resolveMatch = (match: Match): Match => {
  if (match.winner) return match;

  const p1Power = getPower(match.player1);
  const p2Power = getPower(match.player2);

  let winner: Player;

  if (p1Power > p2Power) {
    winner = match.player1;
  } else if (p2Power > p1Power) {
    winner = match.player2;
  } else {
    // Égalité de puissance : on tranche par les HP
    winner =
      match.player1.hp >= match.player2.hp ? match.player1 : match.player2;
  }

  return { ...match, winner };
};

const extractWinner = (match: Match): Player => {
  if (!match.winner) {
    throw new Error(`Le match ${match.id} n'a pas encore de vainqueur`);
  }
  return match.winner;
};
```

---

### Étapes 7 & 8 — Logique du Tournoi

On utilise la récursion pour `runTournament` afin d'éviter les boucles `while` et les mutations.

```typescript
const playRound = (players: readonly Player[]): readonly Player[] => {
  if (players.length % 2 !== 0) {
    throw new Error(
      "Le nombre de joueurs doit être pair pour un tournoi à élimination directe"
    );
  }

  // Création des paires et résolution (0-1, 2-3, etc.)
  return players.reduce<readonly Player[]>((winners, player, index, array) => {
    if (index % 2 === 0) {
      const p1 = player;
      const p2 = array[index + 1];
      const match = createMatch(index, p1, p2);
      const resolvedMatch = resolveMatch(match);
      return [...winners, extractWinner(resolvedMatch)];
    }
    return winners;
  }, []);
};

const runTournament = (players: readonly Player[]): Player => {
  console.log(`--- Nouveau tour : ${players.length} joueurs restants ---`);

  if (players.length === 0) throw new Error("Aucun joueur dans le tournoi");
  if (players.length === 1) return players[0];

  const nextRoundPlayers = playRound(players);
  return runTournament(nextRoundPlayers);
};
```

---

### Étape 9 — Refactorisation (Union Discriminante de Matchs)

C'est ici que TypeScript brille : on sépare le type `Match` en deux états distincts.

```typescript
type BaseMatch = {
  readonly id: number;
  readonly player1: Player;
  readonly player2: Player;
};

type PendingMatch = BaseMatch & { readonly status: "PENDING" };
type FinishedMatch = BaseMatch & {
  readonly status: "FINISHED";
  readonly winner: Player;
};

type MatchV2 = PendingMatch | FinishedMatch;

const createMatchV2 = (
  id: number,
  player1: Player,
  player2: Player
): PendingMatch => {
  if (player1.id === player2.id) throw new Error("ID identiques");
  return { id, player1, player2, status: "PENDING" };
};

const resolveMatchV2 = (match: PendingMatch): FinishedMatch => {
  const p1Power = getPower(match.player1);
  const p2Power = getPower(match.player2);

  const winner = p1Power >= p2Power ? match.player1 : match.player2;

  return {
    ...match,
    status: "FINISHED",
    winner,
  };
};

const extractWinnerV2 = (match: FinishedMatch): Player => {
  // Ici, plus besoin de check "if (!match.winner)",
  // car le type FinishedMatch garantit la présence du winner.
  return match.winner;
};
```

---

### Exemple d'exécution

```typescript
const participants: readonly Player[] = [
  { id: 1, name: "Aragorn", level: 10, hp: 100, role: "WARRIOR", strength: 15 },
  { id: 2, name: "Gandalf", level: 10, hp: 80, role: "MAGE", mana: 20 },
  { id: 3, name: "Gimli", level: 8, hp: 120, role: "WARRIOR", strength: 12 },
  { id: 4, name: "Saruman", level: 9, hp: 70, role: "MAGE", mana: 18 },
];

try {
  const winner = runTournament(participants);
  console.log(`🏆 Le grand vainqueur est : ${winner.name}`);
} catch (e) {
  console.error(e);
}
```
