---
title: "Pizzima — Étape 2 : le CRUD complet"
order: 63
correctionDate: 2026-11-11
hidden: true
---

**Étape 2**, enchaînée avec l'étape 1 dans la même séance. Objectif : le BDE doit pouvoir gérer son référentiel de pizzas. Créer, modifier, supprimer — et refuser proprement les données invalides.

Tout se passe côté backend. Le front ne bouge pas encore.

## 1. Les quatre opérations

Complétez `backend/src/pizzas.ts`. Les signatures sont imposées, l'implémentation est à vous.

```typescript
export function createPizza(pizza: Omit<Pizza, "id">): Pizza {
  // Générer un id (indice : le plus grand id existant + 1, et 1 si le store est vide)
  // Ajouter la pizza, appeler store.save(...), retourner la pizza créée
}

export function updatePizza(id: number, pizza: Omit<Pizza, "id">): Pizza | undefined {
  // undefined si l'id n'existe pas
}

export function deletePizza(id: number): boolean {
  // true si quelque chose a été supprimé, false sinon
}
```

⚠️ `store.save(...)` écrit sur le disque : il attend le **tableau complet**, pas seulement l'élément modifié. `map()` et `filter()` sont exactement les bons outils (Javascript 1).

ℹ️ `Omit<Pizza, "id">` veut dire « une Pizza sans son id » : c'est ce que le client envoie, l'id étant décidé par le serveur. Revoyez les [utility types](/typescript/).

## 2. Valider ce qui arrive

Le corps d'une requête, c'est du JSON envoyé par n'importe qui. `request.body` est typé `any` : **rien** ne garantit qu'il contient une pizza.

Écrivez une fonction de validation dans `backend/src/pizzas.ts` :

```typescript
export function parsePizzaBody(body: unknown): Omit<Pizza, "id"> | null {
  // Retourner null si ce n'est pas un objet avec :
  //   name: string non vide
  //   description: string
  //   price: number > 0
  //   image: string
}
```

Partez de `unknown`, pas de `any` : le compilateur vous forcera à vérifier avant d'utiliser. C'est tout l'intérêt (revoyez [Typescript](/typescript/)).

## 3. Les routes

```typescript
app.post("/api/pizzas", (request, response) => { /* 201 + la pizza créée */ });
app.put("/api/pizzas/:id", (request, response) => { /* 200 ou 404 */ });
app.delete("/api/pizzas/:id", (request, response) => { /* 204 ou 404 */ });
```

Les codes de retour comptent — c'est le contrat de votre API :

| Situation                        | Code                       |
| -------------------------------- | -------------------------- |
| Création réussie                 | `201 Created`              |
| Modification réussie             | `200 OK`                   |
| Suppression réussie              | `204 No Content` (sans corps) |
| Corps invalide                   | `400 Bad Request`          |
| Id inexistant                    | `404 Not Found`            |

### ✅ Point de contrôle

Dans la console du navigateur, sur <http://localhost:5173> (voir
[l'étape 1](/practices/pizzima-1/) si vous avez oublié comment). Un petit
raccourci à coller **une fois** par rechargement de page :

```javascript
const envoyer = (methode, url, corps) =>
  fetch(url, {
    method: methode,
    headers: { "Content-Type": "application/json" },
    body: corps && JSON.stringify(corps),
  }).then(async (r) => [r.status, await r.text()]);
```

Puis, une ligne à la fois :

```javascript
// Créer
await envoyer("POST", "/api/pizzas", { name: "Chorizo", description: "Tomate, mozzarella, chorizo", price: 11, image: "🌶️" })
// [201, '{"id":7,"name":"Chorizo",...}']

// Refuser n'importe quoi
await envoyer("POST", "/api/pizzas", { name: "" })
// [400, ...] — et le serveur tourne toujours

// Modifier
await envoyer("PUT", "/api/pizzas/7", { name: "Chorizo piquante", description: "Version qui pique", price: 12, image: "🌶️" })
// [200, ...]

// Supprimer, deux fois
await envoyer("DELETE", "/api/pizzas/7")   // [204, '']
await envoyer("DELETE", "/api/pizzas/7")   // [404, ...] la deuxième fois
```

> `r.text()` plutôt que `r.json()` : un `204 No Content` n'a pas de corps, et
> `r.json()` lèverait une erreur dessus. Le `7` est l'id renvoyé par la
> création — adaptez-le si le vôtre diffère.

Avec `curl` (macOS, Linux, ou Git Bash sous Windows), le même premier appel
tient sur une ligne :

```
curl -i -X POST http://localhost:8080/api/pizzas -H "Content-Type: application/json" -d '{"name":"Chorizo","description":"Tomate, mozzarella, chorizo","price":11,"image":"🌶️"}'
```

⚠️ Dans PowerShell, écrivez `curl.exe` et pas `curl` — [l'étape
1](/practices/pizzima-1/) explique pourquoi.

Ouvrez `backend/data/pizzas.json` : vos modifications doivent y être. Redémarrez l'API, elles sont toujours là.

## 🆘 Erreurs fréquentes

- **`request.body` vaut `undefined`** — soit `app.use(express.json())` manque, soit le client n'a pas envoyé l'en-tête `Content-Type: application/json`.
- **Le fichier JSON n'est pas mis à jour** — vous avez modifié le tableau sans appeler `store.save(...)`.
- **`Cannot set headers after they are sent`** — deux `response.json()` dans le même handler. Pensez à `return` après avoir répondu.
- **Le 204 renvoie du JSON** — un 204 est *No Content* : `response.status(204).end()`, sans corps.

## 🎁 Bonus

- Refusez deux pizzas de même nom avec un `409 Conflict`.
- Utilisez [zod](https://zod.dev/) pour la validation, et comparez avec votre `parsePizzaBody` écrit à la main.
