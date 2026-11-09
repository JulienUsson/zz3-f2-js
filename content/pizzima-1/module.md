---
title: "Pizzima — Étape 1 : l'API répond"
order: 62
correctionDate: 2026-11-11
hidden: true
---

**Étape 1.** Objectif : comprendre l'application qu'on vous donne, et lui ajouter votre première route.

À la fin de cette étape, votre API sait répondre « voici toutes les pizzas » **et** « voici la pizza n°3 ».

## 1. Faire tourner le starter

Suivez [la page Pizzima](/practices/pizzima/) pour récupérer le projet et démarrer les deux serveurs. Ne passez pas à la suite tant que les six pizzas ne s'affichent pas.

## 2. Lire le code qu'on vous donne

Prenez dix minutes pour ouvrir ces quatre fichiers et répondre aux questions. C'est du temps gagné pour la suite du TP.

| Fichier                   | Question à laquelle il répond                                        |
| ------------------------- | -------------------------------------------------------------------- |
| `backend/src/server.ts`   | Quelle URL déclenche quel bout de code ?                              |
| `backend/src/pizzas.ts`   | D'où viennent les données, et quelle forme ont-elles ?                |
| `frontend/src/App.tsx`    | Quand l'appel à l'API est-il fait, et où le résultat est-il stocké ?  |
| `frontend/vite.config.ts` | Pourquoi `/api/pizzas` arrive-t-il sur le port 8080 ?                 |

## 3. Interroger l'API à la main

Une API se teste **seule**, sans passer par l'interface. L'outil le plus simple,
et le seul qui soit identique sous Windows, macOS et Linux, vous l'avez déjà
sous les yeux : la **console du navigateur**.

Ouvrez <http://localhost:5173>, puis la console (`F12`, onglet *Console*), et
tapez :

```javascript
await fetch("/api/pizzas").then((r) => r.json())
```

La console affiche le tableau des six pizzas. C'est exactement ce que fait
`App.tsx` — en une ligne. Deux variantes vous serviront tout au long du TP :

```javascript
// Le code de statut plutôt que le corps
await fetch("/api/pizzas").then((r) => r.status)   // 200

// Les deux à la fois
await fetch("/api/pizzas").then(async (r) => [r.status, await r.json()])
```

> Le `/api/...` sans nom de domaine passe par le proxy de Vite, qui relaie vers
> le port 8080. C'est la même URL que dans votre code : si ça marche ici, ça
> marchera dans l'application.

**Si vous préférez un vrai client HTTP**, [Postman](https://www.postman.com/),
[Insomnia](https://insomnia.rest/) ou l'extension REST Client de VS Code font
très bien l'affaire, et `curl` aussi :

```
curl http://localhost:8080/api/pizzas
```

⚠️ **Sous Windows, dans PowerShell, `curl` n'est pas curl.** Windows PowerShell
5.1 définit un alias `curl` vers la cmdlet `Invoke-WebRequest`, qui ne comprend
ni `-X`, ni `-H`, ni `-d`
([doc Microsoft](https://learn.microsoft.com/en-us/windows/curl/)). Écrivez
`curl.exe` — avec l'extension — pour appeler le vrai programme. Et le `\` de
fin de ligne pour couper une commande en plusieurs lignes est une convention
*bash* : PowerShell ne la connaît pas. D'où la console du navigateur, qui évite
toute cette gymnastique.

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

Dans la console du navigateur, sur <http://localhost:5173> :

```javascript
await fetch("/api/pizzas/3").then((r) => r.json())
// {id: 3, name: "Quatre fromages", ...}

await fetch("/api/pizzas/999").then((r) => r.status)
// 404

await fetch("/api/pizzas/abc").then((r) => r.status)
// 404 aussi, et surtout pas un plantage du serveur
```

Après le troisième appel, regardez le terminal de l'API : il doit toujours
tourner, sans trace d'erreur.

## 🆘 Erreurs fréquentes

- **`Cannot find module './pizzas'`** — il manque l'extension : `"./pizzas.js"`, même si le fichier est un `.ts`. C'est expliqué dans le README du starter.
- **La route renvoie toujours 404** — elle est déclarée après le handler 404 attrape-tout.
- **Comparaison qui échoue** — `request.params.id` vaut `"3"`, une chaîne. `"3" === 3` est `false` (revoyez la coercition, Javascript 1).
- **Le serveur ne redémarre pas** — regardez le terminal : `tsx watch` affiche l'erreur TypeScript qui l'empêche de repartir.

## 🎁 Bonus

- Ajoutez `GET /api/pizzas?search=fromage` qui filtre par nom (indice : `request.query.search`).
- Renvoyez un 400 plutôt qu'un 404 quand l'id n'est pas un nombre. Lequel des deux est le plus juste, à votre avis ?
