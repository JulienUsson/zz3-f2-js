---
title: "Pizzima — Étape 1 : l'API répond"
order: 62
hidden: true
---

**Séance 6.** Objectif : comprendre l'application qu'on vous donne, et lui ajouter votre première route.

À la fin de cette étape, votre API sait répondre « voici toutes les pizzas » **et** « voici la pizza n°3 ».

## 1. Faire tourner le starter

Suivez [la page Pizzima](/practices/pizzima/) pour récupérer le projet et démarrer les deux serveurs. Ne passez pas à la suite tant que les six pizzas ne s'affichent pas.

## 2. Lire le code qu'on vous donne

Prenez dix minutes pour ouvrir ces quatre fichiers et répondre aux questions. C'est du temps gagné pour les quatre séances suivantes.

| Fichier                   | Question à laquelle il répond                                        |
| ------------------------- | -------------------------------------------------------------------- |
| `backend/src/server.ts`   | Quelle URL déclenche quel bout de code ?                              |
| `backend/src/pizzas.ts`   | D'où viennent les données, et quelle forme ont-elles ?                |
| `frontend/src/App.tsx`    | Quand l'appel à l'API est-il fait, et où le résultat est-il stocké ?  |
| `frontend/vite.config.ts` | Pourquoi `/api/pizzas` arrive-t-il sur le port 8080 ?                 |

## 3. Tester l'API sans le navigateur

Une API se teste **seule**. Dans un troisième terminal :

```bash
curl http://localhost:8080/api/pizzas
```

Vous pouvez aussi utiliser [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/) ou l'extension REST Client de VS Code — plus confortable dès qu'on envoie du JSON.

## 4. Récupérer une pizza par son id

C'est à vous. Dans `backend/src/pizzas.ts` :

```typescript
export function findPizzaById(id: number): Pizza | undefined {
  // Indice : store.all() vous donne le tableau, et find() est votre ami.
}
```

Puis dans `backend/src/server.ts` :

```typescript
app.get("/api/pizzas/:id", (request, response) => {
  // 1. Récupérer le paramètre : request.params.id
  // 2. ⚠️ C'est une chaîne de caractères ! Number(...) pour le convertir.
  // 3. Chercher la pizza.
  // 4. Introuvable ➡️ 404 avec un message. Trouvée ➡️ response.json(pizza).
});
```

⚠️ Placez cette route **avant** le `app.use(...)` qui renvoie le 404 : Express essaie les handlers dans l'ordre de déclaration.

### ✅ Point de contrôle

```bash
curl http://localhost:8080/api/pizzas/3
# {"id":3,"name":"Quatre fromages", ...}

curl -i http://localhost:8080/api/pizzas/999
# HTTP/1.1 404 Not Found

curl -i http://localhost:8080/api/pizzas/abc
# 404 aussi, et surtout pas un plantage du serveur
```

## 🆘 Erreurs fréquentes

- **`Cannot find module './pizzas'`** — il manque l'extension : `"./pizzas.js"`, même si le fichier est un `.ts`. C'est expliqué dans le README du starter.
- **La route renvoie toujours 404** — elle est déclarée après le handler 404 attrape-tout.
- **Comparaison qui échoue** — `request.params.id` vaut `"3"`, une chaîne. `"3" === 3` est `false` (revoyez la coercition, Javascript 1).
- **Le serveur ne redémarre pas** — regardez le terminal : `tsx watch` affiche l'erreur TypeScript qui l'empêche de repartir.

## 🎁 Bonus

- Ajoutez `GET /api/pizzas?search=fromage` qui filtre par nom (indice : `request.query.search`).
- Renvoyez un 400 plutôt qu'un 404 quand l'id n'est pas un nombre. Lequel des deux est le plus juste, à votre avis ?
