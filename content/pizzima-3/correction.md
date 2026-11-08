Le code ci-dessous est celui de l'application complète : il contient donc
aussi le panier (étape 4) et l'espace BDE (étape 5). Ne prenez que les
morceaux de cette étape — le reste arrivera.

## 1. Extraire un composant

`frontend/src/PizzaCard.tsx` :

```tsx
import type { Pizza } from "./types.ts";

type PizzaCardProps = {
  pizza: Pizza;
  onSelect: (pizza: Pizza) => void;
  onAdd: (pizza: Pizza) => void;
};

export default function PizzaCard({ pizza, onSelect, onAdd }: PizzaCardProps) {
  return (
    <li className="pizza">
      <button type="button" className="pizza-open" onClick={() => onSelect(pizza)}>
        <span className="pizza-image">{pizza.image}</span>
        <h2>{pizza.name}</h2>
        <p>{pizza.description}</p>
        <strong>{pizza.price.toFixed(2)} €</strong>
      </button>
      <button type="button" onClick={() => onAdd(pizza)}>
        Ajouter au panier
      </button>
    </li>
  );
}
```

(`onAdd` ne sert qu'à l'étape 4 : à l'étape 3, seul `onSelect` est nécessaire.)

Le composant ne sait pas ce qui se passe quand on clique : il **remonte**
l'information au parent par une prop. C'est le sens unique de React — les
données descendent par les props, les événements remontent par des fonctions.

## 2. Isoler le chargement des données

`frontend/src/usePizzas.ts` :

```typescript
import { useCallback, useEffect, useState } from "react";
import { getJson } from "./api.ts";
import type { Pizza } from "./types.ts";

/**
 * Un hook personnalisé : une fonction dont le nom commence par `use` et qui
 * appelle des hooks React. Il n'y a pas d'autre magie que ça.
 */
export function usePizzas() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // `useCallback` garde la même fonction d'un rendu à l'autre, sinon le
  // `useEffect` ci-dessous la verrait changer à chaque fois et boucler.
  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    getJson<Pizza[]>("/api/pizzas")
      .then(setPizzas)
      .catch((cause: unknown) => setError(String(cause)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(reload, [reload]);

  return { pizzas, loading, error, reload };
}
```

Le `useCallback` mérite un mot : sans lui, `reload` serait une nouvelle
fonction à chaque rendu, le `useEffect` la verrait changer, se relancerait,
provoquerait un rendu… et vous auriez la boucle infinie de la section
« erreurs fréquentes ».

Le `reload` exporté ne sert pas à l'étape 3 — il sert au bouton « Réessayer »
et à l'espace BDE, qui recharge la liste après chaque modification.

## 3. Rendre la page vivante

Les trois fonctionnalités sont des **valeurs dérivées** de l'état, pas des
états supplémentaires :

```tsx
const [search, setSearch] = useState("");
const [sort, setSort] = useState<"none" | "asc" | "desc">("none");
const [selected, setSelected] = useState<Pizza | null>(null);

  // Valeurs dérivées : recalculées au rendu, jamais stockées dans un état.
  const filtrees = pizzas.filter((pizza) =>
    pizza.name.toLowerCase().includes(search.trim().toLowerCase()),
  );
  // `toSorted` rend un nouveau tableau ; `sort` modifierait celui de l'état.
  const affichees =
    sort === "none"
      ? filtrees
      : filtrees.toSorted((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
```

C'est le point à retenir de l'étape : `affichees` n'est **pas** stocké. Un
état de plus, c'est un état à garder synchronisé — et un jour il ne l'est
plus. Ici, il se recalcule à chaque rendu à partir de `pizzas`, `search` et
`sort`, donc il est toujours juste par construction.

`toSorted()` et non `sort()` : `sort()` modifierait le tableau de l'état
sur place. React compare les références pour décider de rendre : muter ne
déclenche aucun rendu, et vous voyez l'ancienne liste.

## 4. Gérer les états qui ne sont pas « tout va bien »

```tsx
{loading && <p>Chargement…</p>}
{error && (
  <p className="error">
    {error}
    <br />
    L'API est-elle démarrée sur le port 8080 ?
    <button type="button" onClick={reload}>Réessayer</button>
  </p>
)}

{/* Deux messages distincts : « rien ne correspond » et « le catalogue est
    vide » ne veulent pas dire la même chose pour l'utilisateur. */}
{pizzas.length === 0 && <p>Le catalogue est vide.</p>}
{pizzas.length > 0 && affichees.length === 0 && (
  <p>Aucune pizza ne correspond à « {search} ».</p>
)}
```

Et le détail, qui n'est affiché que s'il y a quelque chose à afficher :

```tsx
{selected && (
  <section className="detail">
    <h2>{selected.image} {selected.name}</h2>
    <p>{selected.description}</p>
    <strong>{selected.price.toFixed(2)} €</strong>
    <button type="button" onClick={() => setSelected(null)}>Fermer</button>
  </section>
)}
```

Le `selected &&` avant est ce qui évite le
`Cannot read properties of null` : sans lui, React évalue `selected.name`
dès le premier rendu, alors que rien n'est sélectionné.
