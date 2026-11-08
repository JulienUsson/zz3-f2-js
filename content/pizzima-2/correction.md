## 1. Les quatre opérations

```typescript
/** Le plus grand id existant + 1. Repart à 1 sur un store vide. */
function nextId(): number {
  const ids = store.all().map((pizza) => pizza.id);
  return ids.length === 0 ? 1 : Math.max(...ids) + 1;
}

export function createPizza(pizza: Omit<Pizza, "id">): Pizza {
  const created = { id: nextId(), ...pizza };
  // `save` attend le tableau complet : on en construit un nouveau.
  store.save([...store.all(), created]);
  return created;
}

export function updatePizza(id: number, pizza: Omit<Pizza, "id">): Pizza | undefined {
  if (!findPizzaById(id)) return undefined;
  const updated = { id, ...pizza };
  store.save(store.all().map((item) => (item.id === id ? updated : item)));
  return updated;
}

export function deletePizza(id: number): boolean {
  const reste = store.all().filter((pizza) => pizza.id !== id);
  // Rien n'a disparu : l'id n'existait pas.
  if (reste.length === store.all().length) return false;
  store.save(reste);
  return true;
}
```

Trois choses à retenir.

**L'id suivant, c'est le plus grand + 1 — pas `length + 1`.** Avec
`length + 1`, supprimez la dernière pizza puis créez-en une : la nouvelle
reprend un id déjà utilisé, et votre `find()` renverra la mauvaise.

**`store.save()` attend le tableau complet.** Il réécrit le fichier entier,
il ne connaît pas la notion de « cet élément a changé ». D'où `map()` pour
remplacer et `filter()` pour retirer — exactement les méthodes de Javascript 1.

**`deletePizza` compare les longueurs** pour savoir si quelque chose a
disparu. C'est ce qui permet de répondre 404 sur un id inexistant au lieu de
204 pour tout le monde.

## 2. Valider ce qui arrive

```typescript
/**
 * Valide le corps d'une requête.
 *
 * On part de `unknown` et non de `any` : le compilateur refuse alors de lire
 * la moindre propriété tant qu'on n'a pas prouvé la forme de la valeur.
 */
export function parsePizzaBody(body: unknown): Omit<Pizza, "id"> | null {
  if (typeof body !== "object" || body === null) return null;
  const { name, description, price, image } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim() === "") return null;
  if (typeof description !== "string") return null;
  if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) return null;
  if (typeof image !== "string") return null;

  return { name: name.trim(), description, price, image };
}
```

Le point important est le **premier mot** : `unknown`, pas `any`. Avec `any`,
`body.name.trim()` compile et plante à l'exécution sur un corps vide. Avec
`unknown`, Typescript refuse de lire la moindre propriété tant que vous
n'avez pas prouvé la forme — et c'est exactement ce que fait la suite de
vérifications.

`Number.isFinite(price)` n'est pas du zèle : `JSON.parse` accepte `1e999`,
qui vaut `Infinity`. Sans ce test, vous vendez une pizza à un prix infini.

Le `name.trim()` à la sortie est volontaire : on stocke la valeur nettoyée,
pas celle qu'on a reçue.

## 3. Les routes

```typescript
app.post("/api/pizzas", (request, response) => {
  const pizza = parsePizzaBody(request.body);
  if (!pizza) {
    response.status(400).json({ error: "Pizza invalide" });
    return;
  }
  response.status(201).json(createPizza(pizza));
});

app.put("/api/pizzas/:id", (request, response) => {
  const pizza = parsePizzaBody(request.body);
  if (!pizza) {
    response.status(400).json({ error: "Pizza invalide" });
    return;
  }
  const updated = updatePizza(Number(request.params.id), pizza);
  if (!updated) {
    response.status(404).json({ error: `Pizza ${request.params.id} introuvable` });
    return;
  }
  response.json(updated);
});

app.delete("/api/pizzas/:id", (request, response) => {
  if (!deletePizza(Number(request.params.id))) {
    response.status(404).json({ error: `Pizza ${request.params.id} introuvable` });
    return;
  }
  // 204 = No Content : surtout pas de corps.
  response.status(204).end();
});
```

Le `return` après chaque `response` n'est pas décoratif : sans lui, le
handler continue et tente une seconde réponse, d'où le
`Cannot set headers after they are sent`.

`response.status(204).end()` et non `.json(...)` : un 204 signifie *No
Content*, il ne doit rien contenir. Certains clients se fâchent si vous
renvoyez un corps quand même.

## 🎁 Bonus — refuser un doublon

```typescript
app.post("/api/pizzas", (request, response) => {
  const pizza = parsePizzaBody(request.body);
  if (!pizza) {
    response.status(400).json({ error: "Pizza invalide" });
    return;
  }
  const existe = findAllPizzas().some(
    (item) => item.name.toLowerCase() === pizza.name.toLowerCase(),
  );
  if (existe) {
    response.status(409).json({ error: `« ${pizza.name} » existe déjà` });
    return;
  }
  response.status(201).json(createPizza(pizza));
});
```

`409 Conflict` plutôt que 400 : la requête est bien formée, c'est l'état du
serveur qui s'y oppose. La nuance compte pour qui consomme votre API.
