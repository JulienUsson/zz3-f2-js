## 2. Lire le code qu'on vous donne

Les réponses, pour que vous puissiez vérifier les vôtres :

| Fichier | Ce qu'il fallait voir |
| --- | --- |
| `backend/src/server.ts` | Chaque `app.get(chemin, handler)` associe une URL à une fonction. Express les essaie **dans l'ordre de déclaration** — c'est pour ça que le 404 attrape-tout est déclaré en dernier. |
| `backend/src/pizzas.ts` | Les données viennent de `backend/data/pizzas.json`, lues une fois au démarrage par `createStore`. Une pizza a `id`, `name`, `description`, `price`, `image`. |
| `frontend/src/App.tsx` | L'appel est fait dans un `useEffect` au premier rendu (tableau de dépendances vide), et le résultat va dans l'état `pizzas` via `setPizzas`. |
| `frontend/vite.config.ts` | Vite est configuré pour transmettre toute requête commençant par `/api` au port 8080. Sans ce proxy, le navigateur appellerait le port 5173, où il n'y a pas d'API. |

## 4. Récupérer une pizza par son id

Dans `backend/src/pizzas.ts` :

```typescript
export function findPizzaById(id: number): Pizza | undefined {
  return store.all().find((pizza) => pizza.id === id);
}
```

Dans `backend/src/server.ts`, **avant** le `app.use(...)` du 404 :

```typescript
app.get("/api/pizzas/:id", (request, response) => {
  // `request.params.id` est TOUJOURS une chaîne : "3" === 3 vaut false.
  const id = Number(request.params.id);
  const pizza = findPizzaById(id);
  if (!pizza) {
    response.status(404).json({ error: `Pizza ${request.params.id} introuvable` });
    return;
  }
  response.json(pizza);
});
```

Sans oublier l'import en haut du fichier :

```typescript
import { findAllPizzas, findPizzaById } from "./pizzas.js";
```

### Pourquoi `/api/pizzas/abc` renvoie 404 et ne plante pas

`Number("abc")` vaut `NaN`. Et `NaN === 3` est `false`, comme toute comparaison
avec `NaN` — y compris `NaN === NaN`. Le `find()` ne trouve donc rien, et on
tombe naturellement dans la branche 404. Rien à écrire de plus.

C'est correct, mais pas le plus juste : un id qui n'est pas un nombre est une
requête malformée, donc un `400 Bad Request`. C'était le bonus, et la réponse
est que les deux se défendent — 404 dit « cette ressource n'existe pas », 400
dit « votre requête n'a pas de sens ». Les deux sont vrais ici.

## 🎁 Bonus — la recherche

```typescript
app.get("/api/pizzas", (request, response) => {
  const search = request.query.search;
  const pizzas = findAllPizzas();
  if (typeof search !== "string" || search === "") {
    response.json(pizzas);
    return;
  }
  const terme = search.toLowerCase();
  response.json(pizzas.filter((pizza) => pizza.name.toLowerCase().includes(terme)));
});
```

⚠️ `request.query.search` n'est pas forcément une chaîne : avec
`?search=a&search=b`, Express en fait un tableau. D'où le `typeof` avant de
s'en servir — le même réflexe que le `unknown` de Typescript.
