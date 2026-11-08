## 1. Côté API

`backend/src/orders.ts` :

```typescript
import { findPizzaById } from "./pizzas.js";
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

export function findAllOrders(): Order[] {
  return store.all();
}

export function findOrderById(id: number): Order | undefined {
  return store.all().find((order) => order.id === id);
}

function nextId(): number {
  const ids = store.all().map((order) => order.id);
  return ids.length === 0 ? 1 : Math.max(...ids) + 1;
}

/**
 * Le total est calculé ici, à partir des prix du référentiel — jamais à
 * partir d'un montant envoyé par le client, qui peut écrire ce qu'il veut.
 */
export function createOrder(customer: string, lines: OrderLine[]): Order {
  const total = lines.reduce((somme, ligne) => {
    const pizza = findPizzaById(ligne.pizzaId);
    return somme + (pizza ? pizza.price * ligne.quantity : 0);
  }, 0);

  const order: Order = {
    id: nextId(),
    customer,
    lines,
    // Les centimes des flottants : 2 × 8.5 + 11.5 doit faire 28.5, pas 28.499…
    total: Math.round(total * 100) / 100,
    createdAt: new Date().toISOString(),
  };

  store.save([...store.all(), order]);
  return order;
}
```

```typescript
/**
 * Valide le corps d'une commande. Renvoie un message d'erreur plutôt qu'un
 * simple `null` : le front peut l'afficher, et l'élève sait quoi corriger.
 */
export function parseOrderBody(
  body: unknown,
): { customer: string; lines: OrderLine[] } | string {
  if (typeof body !== "object" || body === null) return "Corps de requête invalide";
  const { customer, lines } = body as Record<string, unknown>;

  if (typeof customer !== "string" || customer.trim() === "") {
    return "Le nom du client est obligatoire";
  }
  if (!Array.isArray(lines) || lines.length === 0) {
    return "La commande doit contenir au moins une ligne";
  }

  const propres: OrderLine[] = [];
  for (const ligne of lines) {
    if (typeof ligne !== "object" || ligne === null) return "Ligne de commande invalide";
    const { pizzaId, quantity } = ligne as Record<string, unknown>;

    if (typeof pizzaId !== "number" || !findPizzaById(pizzaId)) {
      return `La pizza ${String(pizzaId)} n'existe pas`;
    }
    if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity <= 0) {
      return "Les quantités doivent être des entiers positifs";
    }
    propres.push({ pizzaId, quantity });
  }

  return { customer: customer.trim(), lines: propres };
}
```

**Le total est calculé ici, jamais reçu du client.** C'est la ligne la plus
importante de l'étape : si le montant venait du navigateur, n'importe qui
commanderait à 0 € avec trois lignes de `curl`. On y reviendra en séance
sécurité, mais le réflexe se prend maintenant — *ne jamais faire confiance à
ce qui arrive du client*.

`Math.round(total * 100) / 100` répare les centimes : sans lui,
2 × 8.5 + 11.5 peut donner 28.499999999999996. C'est le `0.1 + 0.2 !== 0.3`
de Javascript 1, et il touche de l'argent ici.

`parseOrderBody` renvoie **un message** plutôt qu'un simple `null` : le front
peut l'afficher, donc l'utilisateur sait quoi corriger. Un 400 muet ne dit
rien à personne.

Les routes, dans `backend/src/server.ts` :

```typescript
// ── Commandes ────────────────────────────────────────────────────────────

app.get("/api/orders", (request, response) => {
  response.json(findAllOrders());
});

app.get("/api/orders/:id", (request, response) => {
  const order = findOrderById(Number(request.params.id));
  if (!order) {
    response.status(404).json({ error: `Commande ${request.params.id} introuvable` });
    return;
  }
  response.json(order);
});

app.post("/api/orders", (request, response) => {
  const parsed = parseOrderBody(request.body);
  if (typeof parsed === "string") {
    response.status(400).json({ error: parsed });
    return;
  }
  response.status(201).json(createOrder(parsed.customer, parsed.lines));
});
```

## 2. Le panier

Dans `App.tsx` — l'état vit là parce que les cartes écrivent dedans et le
récapitulatif le lit :

```tsx
const [cart, setCart] = useState<OrderLine[]>([]);

  function addToCart(pizza: Pizza) {
    setCart((lignes) => {
      const existante = lignes.find((ligne) => ligne.pizzaId === pizza.id);
      // Jamais `push` : React compare les références pour décider de rendre.
      if (!existante) return [...lignes, { pizzaId: pizza.id, quantity: 1 }];
      return lignes.map((ligne) =>
        ligne.pizzaId === pizza.id ? { ...ligne, quantity: ligne.quantity + 1 } : ligne,
      );
    });
  }

  function changeQuantity(pizzaId: number, quantity: number) {
    if (quantity <= 0) {
      setCart((lignes) => lignes.filter((ligne) => ligne.pizzaId !== pizzaId));
      return;
    }
    setCart((lignes) =>
      lignes.map((ligne) => (ligne.pizzaId === pizzaId ? { ...ligne, quantity } : ligne)),
    );
  }

  const removeFromCart = (pizzaId: number) =>
    setCart((lignes) => lignes.filter((ligne) => ligne.pizzaId !== pizzaId));

  async function submitOrder() {
    setSending(true);
    setOrderError(null);
    try {
      const cree = await sendJson<Order>("/api/orders", "POST", { customer, lines: cart });
      setOrder(cree);
      setCart([]);
      setCustomer("");
    } catch (cause: unknown) {
      // Le panier est conservé : l'utilisateur peut réessayer.
      setOrderError(String(cause));
    } finally {
      setSending(false);
    }
  }
```

Trois choses.

**Aucune mutation.** Pas un seul `push`. Ajouter, c'est `[...lignes, …]` ;
modifier, c'est `map()` ; retirer, c'est `filter()`. React compare les
références : si vous modifiez le tableau existant, la référence ne change
pas et rien ne se rend.

**La forme fonctionnelle de `setCart`.** `setCart((lignes) => …)` plutôt que
`setCart([...cart, …])` : on part de la valeur à jour, pas de celle capturée
au rendu. Deux clics rapides sur « Ajouter » perdraient le premier sinon.

**Quantité à 0 = retrait.** Plutôt qu'une ligne à zéro, qui n'a pas de sens
dans un panier.

## Le composant `Cart`

`frontend/src/Cart.tsx` :

```tsx
import type { OrderLine, Pizza } from "./types.ts";

type CartProps = {
  lines: OrderLine[];
  pizzas: Pizza[];
  customer: string;
  sending: boolean;
  error: string | null;
  onCustomerChange: (customer: string) => void;
  onQuantityChange: (pizzaId: number, quantity: number) => void;
  onRemove: (pizzaId: number) => void;
  onSubmit: () => void;
};

export default function Cart({
  lines,
  pizzas,
  customer,
  sending,
  error,
  onCustomerChange,
  onQuantityChange,
  onRemove,
  onSubmit,
}: CartProps) {
  if (lines.length === 0) return <p>Votre panier est vide.</p>;

  // Le total n'est pas un état : c'est une valeur dérivée, recalculée à
  // chaque rendu. Un état de plus, c'est un état à garder synchronisé.
  const total = lines.reduce((somme, ligne) => {
    const pizza = pizzas.find((item) => item.id === ligne.pizzaId);
    return somme + (pizza ? pizza.price * ligne.quantity : 0);
  }, 0);

  return (
    <section className="cart">
      <h2>Votre panier</h2>
      <ul>
        {lines.map((ligne) => {
          const pizza = pizzas.find((item) => item.id === ligne.pizzaId);
          return (
            <li key={ligne.pizzaId}>
              <span>
                {pizza?.image} {pizza?.name}
              </span>
              <input
                type="number"
                min={1}
                value={ligne.quantity}
                aria-label={`Quantité ${pizza?.name}`}
                // La valeur d'un input est TOUJOURS une chaîne.
                onChange={(event) =>
                  onQuantityChange(ligne.pizzaId, Number(event.target.value))
                }
              />
              <button type="button" onClick={() => onRemove(ligne.pizzaId)}>
                Retirer
              </button>
            </li>
          );
        })}
      </ul>

      <p className="cart-total">
        Total : <strong>{total.toFixed(2)} €</strong>
      </p>

      <label>
        Votre nom
        <input
          value={customer}
          onChange={(event) => onCustomerChange(event.target.value)}
        />
      </label>

      <button type="button" disabled={sending || customer.trim() === ""} onClick={onSubmit}>
        {sending ? "Envoi…" : "Commander"}
      </button>

      {/* Le panier n'est PAS vidé quand l'envoi échoue : on ne fait pas
          recommencer son travail à l'utilisateur. */}
      {error && <p className="error">{error}</p>}
    </section>
  );
}
```

Le total est une **valeur dérivée**, recalculée au rendu — comme la liste
filtrée de l'étape 3, et pour la même raison.

## 3. Envoyer la commande

```tsx
async function submitOrder() {
  setSending(true);
  setOrderError(null);
  try {
    const cree = await sendJson<Order>("/api/orders", "POST", { customer, lines: cart });
    setOrder(cree);
    setCart([]);
    setCustomer("");
  } catch (cause: unknown) {
    // Le panier est conservé : l'utilisateur peut réessayer.
    setOrderError(String(cause));
  } finally {
    setSending(false);
  }
}
```

Le `finally` remet `sending` à `false` dans **les deux** cas. Sans lui, une
erreur laisse le bouton désactivé pour toujours, et l'utilisateur est coincé.

Et le panier n'est vidé que dans le `try`, après le succès : en cas d'erreur,
tout est encore là.

## 🎁 Bonus — garder le panier au rechargement

```tsx
const [cart, setCart] = useState<OrderLine[]>(() => {
  try {
    return JSON.parse(localStorage.getItem("panier") ?? "[]");
  } catch {
    return [];
  }
});

useEffect(() => {
  localStorage.setItem("panier", JSON.stringify(cart));
}, [cart]);
```

La fonction passée à `useState` n'est appelée qu'au premier rendu : lire le
`localStorage` à chaque rendu serait du gaspillage. Et le `try` est
obligatoire — en navigation privée, `localStorage` peut lever.
