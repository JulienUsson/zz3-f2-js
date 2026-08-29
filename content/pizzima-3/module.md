---
title: "Pizzima — Étape 3 : le catalogue en React"
order: 84
hidden: true
---

**Séance 8.** Objectif : arrêter d'avoir toute la page dans `App.tsx`, et faire réagir l'interface aux clics.

L'API ne bouge plus. Tout se passe dans `frontend/src/`.

## 1. Extraire un composant

`App.tsx` fait tout : charger, afficher la liste, afficher une carte. Découpez.

Créez `frontend/src/PizzaCard.tsx` :

```tsx
import type { Pizza } from "./types.ts";

type PizzaCardProps = {
  pizza: Pizza;
};

export default function PizzaCard({ pizza }: PizzaCardProps) {
  // Déplacez ici le contenu du <li> de App.tsx
}
```

Puis utilisez-le dans `App.tsx` :

```tsx
{pizzas.map((pizza) => (
  <PizzaCard key={pizza.id} pizza={pizza} />
))}
```

⚠️ La `key` reste sur l'élément retourné par le `map()`, jamais à l'intérieur du composant.

✅ **Point de contrôle intermédiaire :** la page est identique à l'écran, mais `App.tsx` a maigri.

## 2. Isoler le chargement des données

Le `useEffect` + les trois `useState` de `App.tsx` sont un motif que vous allez réécrire à chaque page. Sortez-le dans `frontend/src/usePizzas.ts` :

```typescript
import { useEffect, useState } from "react";
import { getJson } from "./api.ts";
import type { Pizza } from "./types.ts";

export function usePizzas() {
  // Déplacez ici les useState et le useEffect d'App.tsx
  return { pizzas, loading, error };
}
```

`App.tsx` devient alors :

```tsx
const { pizzas, loading, error } = usePizzas();
```

Une fonction dont le nom commence par `use` et qui appelle des hooks React est un **hook personnalisé**. Il n'y a pas d'autre magie que ça.

## 3. Rendre la page vivante

Trois fonctionnalités, dans l'ordre de difficulté :

1. **Un champ de recherche** qui filtre les pizzas affichées par nom. Un `useState` pour le texte saisi, un `filter()` au rendu. La liste complète ne doit pas être modifiée.
2. **Un tri** par prix croissant / décroissant. Rappel de Javascript 1 : `toSorted()` ne mutate pas, `sort()` si — et React n'aime pas qu'on modifie ce qu'il affiche.
3. **Le détail d'une pizza** : cliquer sur une carte sélectionne la pizza (`useState<Pizza | null>`) et affiche ses informations sous la liste. Un bouton ferme le détail.

## 4. Gérer les états qui ne sont pas « tout va bien »

Une interface honnête montre ce qui se passe :

- **pendant le chargement** : « Chargement… » (déjà là)
- **en cas d'erreur** : le message, et de quoi réessayer
- **si la recherche ne donne rien** : « Aucune pizza ne correspond », pas une page vide
- **si le catalogue est vide** : un message différent de celui de la recherche

Pour tester le cas d'erreur, arrêtez l'API et rechargez la page.

### ✅ Point de contrôle

- Taper « fromage » ne laisse que la Quatre fromages.
- Effacer la recherche fait revenir toutes les pizzas.
- Cliquer sur une carte affiche son détail, le bouton le referme.
- API éteinte ➡️ un message d'erreur lisible, pas une page blanche.
- `App.tsx` fait moins de 60 lignes.

## 🆘 Erreurs fréquentes

- **`Each child in a list should have a unique "key" prop`** — il manque la `key`, ou vous avez utilisé l'index du tableau plutôt que l'id.
- **La page se recharge en boucle** — un `useEffect` sans tableau de dépendances, ou dont les dépendances changent à chaque rendu.
- **Le champ ne se remplit pas quand on tape** — un `value={...}` sans `onChange` : le champ est contrôlé par React, qui le remet à sa valeur.
- **La liste se réordonne toute seule** — `sort()` a muté le tableau d'état. Utilisez `toSorted()`.
- **`Cannot read properties of null`** — vous affichez `selected.name` alors que `selected` vaut `null`. Testez avant : `{selected && <Detail ... />}`.

## 🎁 Bonus

- Extrayez la barre de recherche et le tri dans un composant `Filters`, et faites-les remonter au parent par des props.
- Affichez le nombre de résultats à côté du champ de recherche.
