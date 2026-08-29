---
title: "Pizzima — Étape 4 : le panier et la commande"
order: 85
hidden: true
---

**Séance 9.** Objectif : la première fonctionnalité qui traverse toute l'application. Le client compose un panier, l'envoie, et l'API l'enregistre.

C'est l'étape où votre projet devient une vraie application plutôt qu'un catalogue.

## 1. Côté API : accepter une commande

Créez `backend/data/orders.json` avec pour seul contenu `[]`, puis `backend/src/orders.ts` :

```typescript
import { createStore } from "./store.js";

export type OrderLine = {
  pizzaId: number;
  quantity: number;
};

export type Order = {
  id: number;
  customer: string;
  lines: OrderLine[];
  total: number;
  createdAt: string;
};

const store = createStore<Order>("orders.json");

export function findAllOrders(): Order[] { /* à vous */ }
export function findOrderById(id: number): Order | undefined { /* à vous */ }
export function createOrder(customer: string, lines: OrderLine[]): Order { /* à vous */ }
```

⚠️ **Le total se calcule sur le serveur**, à partir des prix du référentiel — jamais à partir d'un montant envoyé par le client. Sinon n'importe qui commande à 0 €. On en reparlera en séance sécurité.

Les routes :

```typescript
app.post("/api/orders", ...);      // 201 + la commande créée
app.get("/api/orders", ...);       // la liste (pour le BDE, étape 5)
app.get("/api/orders/:id", ...);   // le récapitulatif
```

Validez le corps comme à l'étape 2 : un `customer` non vide, au moins une ligne, des `quantity` entières et positives, et des `pizzaId` qui **existent vraiment**.

✅ **Point de contrôle intermédiaire :**

```bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customer":"Julien","lines":[{"pizzaId":1,"quantity":2},{"pizzaId":3,"quantity":1}]}'
# 201, et total = 2 × 8.50 + 11.50 = 28.50

curl -i -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customer":"Julien","lines":[{"pizzaId":999,"quantity":1}]}'
# 400 : la pizza n'existe pas
```

## 2. Côté front : le panier

Le panier est un état qui vit dans `App.tsx`, parce que plusieurs composants en dépendent : les cartes ajoutent dedans, le récapitulatif le lit.

```tsx
const [cart, setCart] = useState<OrderLine[]>([]);
```

Les opérations à écrire :

- **ajouter** une pizza (si elle est déjà dans le panier, incrémenter sa quantité)
- **changer** la quantité d'une ligne
- **retirer** une ligne
- **vider** le panier

⚠️ **Sans jamais muter `cart`.** `cart.push(...)` ne déclenchera aucun rendu : React compare les références (revoyez [l'immutabilité](/javascript-4/) et le shallow compare). Vos outils sont `map()`, `filter()` et le spread `[...cart, nouvelle]`.

Puis l'affichage : un composant `Cart` qui liste les lignes avec leur quantité, le total, et un bouton « Commander ». Le total affiché se recalcule à partir de `cart` et des prix — ce n'est pas un état, c'est une valeur dérivée.

## 3. Envoyer la commande

Un champ pour le nom du client, un bouton qui appelle :

```typescript
await sendJson<Order>("/api/orders", "POST", { customer, lines: cart });
```

`sendJson` est fourni dans `frontend/src/api.ts`.

Pendant l'envoi : le bouton est désactivé. Après : le panier est vidé et le récapitulatif de la commande s'affiche (numéro, lignes, total). En cas d'erreur : le message est affiché **et le panier est conservé** — on ne fait pas perdre son travail à l'utilisateur.

### ✅ Point de contrôle

Le parcours complet, dans le navigateur, sans toucher au terminal :

1. J'ajoute deux Margherita et une Quatre fromages.
2. Le panier affiche 3 pizzas et 28,50 €.
3. Je change la quantité, le total suit.
4. Je saisis mon nom, je commande.
5. Je vois le récapitulatif avec un numéro de commande.
6. `backend/data/orders.json` contient ma commande.
7. Je recharge la page : le catalogue est là, le panier est vide. C'est normal — on en fait un bonus.

## 🆘 Erreurs fréquentes

- **J'ajoute au panier, rien ne s'affiche** — vous avez muté le tableau (`push`) au lieu d'en créer un nouveau. Le grand classique.
- **La quantité passe à `NaN`** — la valeur d'un `<input>` est toujours une chaîne : `Number(event.target.value)`.
- **Le total est faux d'un centime** — les flottants, `0.1 + 0.2 !== 0.3`. Arrondissez à l'affichage avec `toFixed(2)`.
- **`400 Bad Request` sans savoir pourquoi** — faites renvoyer par votre API *quel* champ est invalide, et affichez ce message côté front.
- **Deux commandes ont le même id** — vous partez de `orders.length + 1` : après une suppression, ça se recoupe. Basez-vous sur le plus grand id existant.

## 🎁 Bonus

- Conservez le panier dans `localStorage` pour qu'il survive au rechargement.
- Affichez une pastille avec le nombre d'articles à côté du titre.
- Ajoutez un `status` à la commande (`"en préparation"`, `"livrée"`) — vous en aurez besoin à l'étape 5.
