## 1. Deux écrans

```tsx
const [screen, setScreen] = useState<"catalogue" | "bde">("catalogue");
```

```tsx
<nav>
  <button type="button" onClick={() => setScreen("catalogue")}>Catalogue</button>
  <button type="button" onClick={() => setScreen("bde")}>Espace BDE</button>
</nav>

{screen === "bde" && <Bde pizzas={pizzas} onChanged={reload} />}
{screen === "catalogue" && ( /* le catalogue de l'étape 3 */ )}
```

C'est du rendu conditionnel, rien d'autre. La limite est réelle et vaut
d'être dite aux élèves : l'URL ne change pas, donc on ne peut pas envoyer un
lien vers l'espace BDE, et le bouton retour du navigateur quitte le site.
C'est exactement le problème que React Router résout.

## 2. Gérer les pizzas

`frontend/src/Bde.tsx` :

```tsx
import { useState } from "react";
import { sendJson } from "./api.ts";
import type { Pizza } from "./types.ts";

type BdeProps = {
  pizzas: Pizza[];
  onChanged: () => void;
};

const VIDE = { name: "", description: "", price: "", image: "" };

export default function Bde({ pizzas, onChanged }: BdeProps) {
  // Les champs d'un formulaire sont des chaînes, prix compris.
  const [form, setForm] = useState(VIDE);
  const [editedId, setEditedId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function edit(pizza: Pizza) {
    setEditedId(pizza.id);
    setForm({
      name: pizza.name,
      description: pizza.description,
      price: String(pizza.price),
      image: pizza.image,
    });
  }

  function cancel() {
    setEditedId(null);
    setForm(VIDE);
  }

  async function submit() {
    setError(null);
    const corps = { ...form, price: Number(form.price) };
    try {
      if (editedId === null) await sendJson<Pizza>("/api/pizzas", "POST", corps);
      else await sendJson<Pizza>(`/api/pizzas/${editedId}`, "PUT", corps);
      cancel();
      // On recharge depuis l'API : toujours juste, au prix d'un aller-retour.
      onChanged();
    } catch (cause: unknown) {
      setError(String(cause));
    }
  }

  async function remove(pizza: Pizza) {
    if (!window.confirm(`Supprimer « ${pizza.name} » ?`)) return;
    setError(null);
    try {
      await sendJson<void>(`/api/pizzas/${pizza.id}`, "DELETE");
      onChanged();
    } catch (cause: unknown) {
      setError(String(cause));
    }
  }

  return (
    <section className="bde">
      <h2>Espace BDE</h2>

      <table>
        <thead>
          <tr>
            <th>Pizza</th>
            <th>Prix</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {pizzas.map((pizza) => (
            <tr key={pizza.id}>
              <td>
                {pizza.image} {pizza.name}
              </td>
              <td>{pizza.price.toFixed(2)} €</td>
              <td>
                <button type="button" onClick={() => edit(pizza)}>
                  Modifier
                </button>
                <button type="button" onClick={() => remove(pizza)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{editedId === null ? "Ajouter une pizza" : "Modifier la pizza"}</h3>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <input
          placeholder="Nom"
          aria-label="Nom"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
        <input
          placeholder="Description"
          aria-label="Description"
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
        />
        <input
          placeholder="Prix"
          aria-label="Prix"
          value={form.price}
          onChange={(event) => setForm({ ...form, price: event.target.value })}
        />
        <input
          placeholder="Emoji"
          aria-label="Emoji"
          value={form.image}
          onChange={(event) => setForm({ ...form, image: event.target.value })}
        />
        <button type="submit">{editedId === null ? "Créer" : "Enregistrer"}</button>
        {editedId !== null && (
          <button type="button" onClick={cancel}>
            Annuler
          </button>
        )}
      </form>

      {error && <p className="error">{error}</p>}
    </section>
  );
}
```

### Les trois points qui coincent

**Le prix est une chaîne.** Un `<input>` rend toujours du texte, même avec
`type="number"`. D'où le `Number(form.price)` au moment d'envoyer. Sans lui,
votre validation serveur renvoie 400 — et elle a raison : `"9.5"` n'est pas
un `number`.

**Un seul formulaire pour créer et modifier.** `editedId` à `null` veut dire
« création » ; un id dedans veut dire « modification ». Le même formulaire,
le même bouton, deux comportements — plutôt que deux composants quasi
identiques à maintenir en double.

**La stratégie de rafraîchissement.** Ici, `onChanged()` recharge la liste
depuis l'API après chaque opération. C'est le choix « toujours juste, un
aller-retour de plus ». L'autre stratégie — mettre à jour l'état local avec
la réponse reçue — est plus rapide à l'écran mais se désynchronise dès que
le serveur transforme ce qu'on lui envoie (ici, `parsePizzaBody` fait un
`trim()` sur le nom : la liste locale afficherait l'espace, la base non).

Les deux se défendent. Ce qui compte, c'est de savoir laquelle vous avez
choisie et pourquoi.

### `window.confirm` avant de supprimer

Il bloque le thread — c'est le `while (true)` de Javascript 2, en moins
grave — et on ne peut pas le styler. Pour un back-office de TP, il fait le
travail. Dans une vraie application, ce serait une boîte de dialogue à vous.

## 🎁 Bonus — de vraies URLs

Avec React Router, `screen` disparaît au profit de l'URL :

```tsx
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

<BrowserRouter>
  <nav>
    <Link to="/">Catalogue</Link>
    <Link to="/bde">Espace BDE</Link>
  </nav>
  <Routes>
    <Route path="/" element={<Catalogue />} />
    <Route path="/bde" element={<Bde />} />
  </Routes>
</BrowserRouter>
```

L'URL devient partageable, le bouton retour fonctionne, et l'état d'écran
n'est plus dupliqué dans React : il est déjà dans la barre d'adresse.
