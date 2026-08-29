## Exercice 1 — Annoter et laisser deviner

```typescript
let age = 31
let firstname = "Julien"
let isAdmin = false

let city = "Clermont"
city = "Lyon"
```

Trois erreurs : `"31"` n'est pas un `number`, et `1` n'est pas un `boolean`
(Typescript refuse la conversion implicite que Javascript accepterait).
`city = 63` échoue aussi, alors qu'aucun type n'est écrit : c'est l'inférence.

Toutes les annotations de l'énoncé étaient du bruit. Typescript déduit le type
de la valeur initiale, et une annotation qui répète ce qu'il sait déjà se
contente de vieillir mal.

En survolant `city`, on lit `string` — pas `"Clermont"`. La nuance compte :

```typescript
let ville = "Clermont"    // string  : on pourra réaffecter une autre chaîne
const cite = "Clermont"   // "Clermont" : la valeur ne changera jamais
```

Là où l'annotation reste utile : quand il n'y a pas de valeur initiale
(`let resultat: number`), quand on veut un type plus large que la valeur
(`let statut: string = "actif"`), et sur les **signatures de fonction**, qui
sont un contrat.

---

## Exercice 2 — Tableau ou tuple ?

```typescript
const scores: number[] = [1, 2, 3]
const scoresBis: Array<number> = [1, 2, 3] // exactement le même type

const names: string[] = ["Alice", "Bob"]
// names.push(42)  ❌ Argument of type 'number' is not assignable to 'string'

const person: [string, number] = ["Julien", 31]
// const inverse: [string, number] = [31, "Julien"]  ❌ dans cet ordre, non
```

`number[]` et `Array<number>` sont deux écritures du même type. Un **tableau**,
c'est « n fois la même chose, longueur libre » ; un **tuple**, c'est « ces
types-là, dans cet ordre, et pas un de plus ».

Sauf que :

```typescript
const coordinates: [number, number] = [45.7, 3.1]
coordinates.push(99) // ✅ accepté — le tuple a maintenant trois éléments
```

C'est un trou connu. Le type tuple hérite des méthodes de `Array`, et son
`push` accepte l'union des types du tuple — ici `number`. La longueur n'est
donc vérifiée qu'à l'assignation, pas après.

`readonly` bouche le trou en supprimant les méthodes qui mutent :

```typescript
const coordinates: readonly [number, number] = [45.7, 3.1]
// coordinates.push(99)  ❌ Property 'push' does not exist on type 'readonly [number, number]'
```

---

## Exercice 3 — any contre unknown

```typescript
function parseWithUnknown(data: unknown): string | null {
  if (typeof data === "string") return data.toUpperCase()
  return null
}
```

**1.** `parseWithAny(42)` compile sans un mot, puis échoue à l'exécution :

```
TypeError: data.toUpperCase is not a function
```

L'erreur n'a pas disparu, elle a changé de moment. Elle est passée du build —
où elle coûte dix secondes — à la production, où elle coûte un incident.

**2.** À l'intérieur du `if`, Typescript sait que `data` est une `string` : le
`typeof` a **restreint** le type, et `.toUpperCase()` redevient légal. C'est le
*narrowing*, le mécanisme qu'on retrouve à l'exercice 6.

`any` dit « ne vérifie rien ». `unknown` dit « je ne sais pas encore, prouve-le
moi d'abord ». Le second est pénible pour exactement la bonne raison.

---

## Exercice 4 — Typer une fonction

```typescript
function divide(a: number, b: number): number {
  if (b === 0) throw new Error("Division par zéro")
  return a / b
}

function greet(name?: string): void {
  console.log(`Hello ${name ?? "World"}`)
}
```

Le `?` de `name?: string` en fait un paramètre facultatif : son type est
`string | undefined`, et `??` fournit la valeur de repli. Attention à ne pas
écrire `||` ici — il remplacerait aussi la chaîne vide, qui est pourtant un
prénom passé volontairement.

**3.** Sans annotation de retour, Typescript infère `number` : le survol
affiche `function divide(a: number, b: number): number`. Alors pourquoi
l'écrire ?

Parce que l'inférence suit le code, y compris quand il devient faux. Le jour où
quelqu'un ajoute `if (b === 0) return "erreur"`, la version inférée change
silencieusement de type — `string | number` — et l'erreur ressort chez
l'appelant, loin de la cause. La version annotée échoue à la ligne fautive.

Un `throw` ne change pas le type de retour : une fonction qui lève ne retourne
pas, la branche est simplement absente de l'inférence.

---

## Exercice 5 — Décrire la forme d'un objet

```typescript
// 1. Type inline : lisible une fois, insupportable trois fois
const user: { firstname: string; lastname: string; age: number } = {
  firstname: "Julien",
  lastname: "Usson",
  age: 31,
}

// 2. et 3. La même forme, nommée et réutilisable, avec email facultatif
interface User {
  firstname: string
  lastname: string
  age: number
  email?: string
}

const julien: User = { firstname: "Julien", lastname: "Usson", age: 31 }

// 4. Un admin est un utilisateur, avec quelque chose en plus
interface Admin extends User {
  permissions: string[]
}
```

**5.** Une propriété non déclarée est refusée :

```
Object literal may only specify known properties, and 'surnom' does not exist in type 'User'.
```

C'est l'*excess property check*, et il ne s'applique qu'aux **objets littéraux
assignés directement**. En passant par une variable intermédiaire, il disparaît :

```typescript
const brouillon = { firstname: "Ada", lastname: "Lovelace", age: 36, surnom: "AL" }
const ada: User = brouillon // ✅ accepté
```

Ce n'est pas une incohérence. Typescript vérifie la **compatibilité** :
`brouillon` a tout ce que `User` demande, donc il fait l'affaire. Le contrôle
supplémentaire sur les littéraux n'existe que pour attraper les fautes de
frappe, là où une propriété en trop ne peut être qu'une erreur.

---

## Exercice 6 — L'union discriminée

```typescript
type Circle = { kind: "circle"; radius: number }
type Square = { kind: "square"; side: number }
type Triangle = { kind: "triangle"; base: number; height: number }
type Shape = Circle | Square | Triangle

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2
    case "square":
      return shape.side ** 2
    case "triangle":
      return (shape.base * shape.height) / 2
    default: {
      const _exhaustif: never = shape
      return _exhaustif
    }
  }
}
```

**1.** Dans la branche `"circle"`, le survol de `shape` affiche `Circle` — pas
`Shape`. Le champ `kind`, typé avec des littéraux, sert de **discriminant** :
le tester suffit à Typescript pour éliminer les autres membres de l'union.
`shape.radius` n'existe que là, et il le sait.

**2.** Ajouter `Triangle` sans toucher à `area` ne provoque **aucune erreur**.
La fonction compile, et retourne `undefined` sur un triangle — le pire des
cas : un bug silencieux qu'aucun outil ne signale.

**3.** C'est ce que répare le `default`. Dans cette branche, Typescript a
éliminé tous les cas traités ; s'il n'en reste aucun, `shape` vaut `never`, et
l'assignation passe. S'il en reste un :

```
Type 'Triangle' is not assignable to type 'never'.
```

L'oubli devient une erreur de compilation, à la ligne exacte. C'est le motif le
plus rentable de Typescript : ajouter un cas à l'union fait apparaître la liste
de tout ce qu'il reste à mettre à jour.

C'est exactement la structure `Warrior | Mage` du mini-projet.

---

## Exercice 7 — Une fonction pour tous les types

```typescript
function first<T>(array: T[]): T | undefined {
  return array[0]
}

const n = first([1, 2, 3])   // number | undefined
const s = first(["a", "b"])  // string | undefined
```

`T` n'est pas un type, c'est un **paramètre** de type : il est rempli à chaque
appel, à partir de l'argument. Rien n'est écrit aux points d'appel, et pourtant
`n` et `s` ont des types différents.

**2.** Avec `any`, tout compile et rien ne protège :

```typescript
function first(array: any[]): any {
  return array[0]
}

const n = first([1, 2, 3])   // any
n.toUpperCase()              // ✅ compile. Et plante à l'exécution.
```

`any` ne fait pas que perdre l'information : il désactive la vérification en
aval, chez tous ceux qui utiliseront la valeur.

**Bonus.**

```typescript
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key])
}

const noms = pluck([{ nom: "Alice", age: 30 }], "nom") // string[]
// pluck([{ nom: "Alice", age: 30 }], "taille")  ❌ 'taille' n'est pas une clé
```

`K extends keyof T` contraint `K` aux clés qui existent vraiment, et `T[K]`
récupère le type de la valeur derrière cette clé. Une faute de frappe dans le
nom d'une propriété devient une erreur de compilation.

⚠️ `array[0]` sur un `T[]` est typé `T`, pas `T | undefined` : par défaut,
Typescript ne vérifie pas les bornes. Écrire `T | undefined` est donc plus
honnête que ce que le compilateur exige — c'est l'option `noUncheckedIndexedAccess`
qui le lui ferait exiger.

---

## Exercice 8 — Dériver un type d'un autre

```typescript
interface User {
  id: number
  name: string
  email: string
  password: string
}

type PublicUser = Omit<User, "password">
type UserPreview = Pick<User, "id" | "name">
type UserUpdate = Partial<Omit<User, "id">> & Pick<User, "id">
type ReadonlyUser = Readonly<User>
```

`Pick` garde les clés listées, `Omit` retire les clés listées, `Partial` rend
tout facultatif, `Readonly` rend tout immuable.

Le troisième mérite un mot : on rend facultatif **tout sauf** l'id, puis on
réintroduit l'id tel quel. L'intersection `&` fusionne les deux. Résultat :

```typescript
const maj: UserUpdate = { id: 1, name: "Alice" }  // ✅
// const maj: UserUpdate = { name: "Alice" }      ❌ Property 'id' is missing
```

**Et si on ajoute une propriété à `User` ?** Aucun de ces quatre types n'est à
modifier : ils sont *dérivés*, donc ils suivent. C'est tout l'intérêt. Écrits à
la main, il aurait fallu penser à les mettre à jour tous les quatre — et le
jour où on en oublie un, personne ne le voit.

Seule exception à surveiller : `Omit<User, "password">` ne proteste pas si la
propriété `password` disparaît un jour de `User`. `Pick`, lui, échoue.

---

## Exercice 9 — Interdire la mutation au build

```typescript
type Player = {
  readonly id: number
  readonly name: string
  readonly hp: number
}

const player: Player = { id: 1, name: "Alice", hp: 100 }
// player.hp = 50   ❌ Cannot assign to 'hp' because it is a read-only property.
```

**Pourquoi `players.push(player)` était-il accepté ?** Parce que `readonly`
porte sur les **propriétés de `Player`**, pas sur le tableau qui les contient.
`Player[]` reste un tableau ordinaire, parfaitement mutable. Les deux
protections sont indépendantes.

```typescript
const players: readonly Player[] = [player]
// players.push(player)  ❌ Property 'push' does not exist on type 'readonly Player[]'.
```

`readonly Player[]` — ou `ReadonlyArray<Player>`, c'est le même type — retire
`push`, `pop`, `splice` et compagnie. `map`, `filter` et `slice` restent : ils
ne mutent pas, ils retournent un nouveau tableau.

**1.** Modifier devient donc : construire.

```typescript
function damage(player: Player, amount: number): Player {
  return { ...player, hp: player.hp - amount }
}

const blesse = damage(player, 30) // { id: 1, name: "Alice", hp: 70 }
```

Le spread recopie tout, puis `hp` écrase la valeur reprise. `player` est
intact.

⚠️ `readonly` est vérifié **à la compilation seulement** : il disparaît du
Javascript produit. Un `Object.freeze()` protège à l'exécution, `readonly`
protège pendant qu'on écrit le code. Les deux ne servent pas au même moment.

En Javascript 4, l'immutabilité était une discipline qu'on s'imposait à la
main. Ici, oublier revient à ne pas compiler.

---

## Exercice 10 — Mini-projet : un tournoi typé

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
