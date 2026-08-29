---
title: "Pizzima"
order: 61
---

Le TP fil rouge des séances 6 à 10. À la fin, vous aurez **une vraie application web** : un site React qui parle à une API Express, avec un catalogue, un panier, des commandes et un back-office.

## Le cahier des charges

En tant que ZZ, je peux :

- consulter la liste des pizzas
- créer une commande
- voir le récapitulatif de ma commande

En tant que membre du BDE, je peux :

- gérer le référentiel de pizzas (CRUD)
- voir les commandes passées

## Récupérer le starter

Le tooling (TypeScript, Vite, Express, le proxy) est déjà réglé, et une première fonctionnalité tourne de bout en bout. Vous partez donc d'une application qui marche, pas d'une page blanche.

```bash
npx degit JulienUsson/zz3-f2-js/pizzima-starter pizzima
cd pizzima
```

Puis, dans **deux terminaux séparés** :

```bash
# Terminal 1
cd backend && npm install && npm run dev

# Terminal 2
cd frontend && npm install && npm run dev
```

✅ **Vous êtes prêt quand** [http://localhost:5173](http://localhost:5173) affiche six pizzas.

Le `README.md` du starter décrit chaque fichier et explique les deux ou trois pièges (le proxy, l'extension `.js` dans les imports).

## Les étapes

Une étape par séance. Chacune se termine par un point de contrôle : si vous le passez, vous pouvez enchaîner sereinement.

1. [Étape 1 — L'API répond](/practices/pizzima-1/) · lire les données, une pizza par son id
2. [Étape 2 — Le CRUD complet](/practices/pizzima-2/) · créer, modifier, supprimer, valider
3. [Étape 3 — Le catalogue en React](/practices/pizzima-3/) · composants, props, état
4. [Étape 4 — Le panier et la commande](/practices/pizzima-4/) · état partagé, POST vers l'API
5. [Étape 5 — L'espace BDE](/practices/pizzima-5/) · le back-office, et les finitions

## Comment travailler

- **Versionnez.** `git init` dès l'étape 1, un commit par fonctionnalité. Vous pourrez revenir en arrière quand vous casserez quelque chose (ça arrivera).
- **Un truc à la fois.** Faites marcher le backend avec `curl` ou Postman *avant* de toucher au React. Quand ça ne marche pas, vous saurez de quel côté chercher.
- **Lisez les erreurs.** Le terminal de l'API et la console du navigateur (F12) disent presque toujours ce qui ne va pas.
- **Bloqué plus de 15 minutes ?** Appelez-moi. C'est le but d'être en salle.
