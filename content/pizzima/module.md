---
title: "Pizzima"
order: 61
---

Le TP fil rouge des séances 6 à 8. À la fin, vous aurez **une vraie application web** : un site React qui parle à une API Express, avec un catalogue, un panier et des commandes.

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

## Le calendrier

| Quand | Ce qu'on fait |
| --- | --- |
| **Mardi 10/11** — séance 6 | [Étape 1 — L'API répond](/practices/pizzima-1/) · lire les données, une pizza par son id<br>[Étape 2 — Le CRUD complet](/practices/pizzima-2/) · créer, modifier, supprimer, valider |
| **Mardi 17/11** — séances 7 et 8, d'affilée | [Étape 3 — Le catalogue en React](/practices/pizzima-3/) · composants, props, état<br>[Étape 4 — Le panier et la commande](/practices/pizzima-4/) · état partagé, POST vers l'API |
| **Mardi 24/11** — séance 9 | Partiel |

Chaque étape se termine par un point de contrôle : si vous le passez, vous
pouvez enchaîner sereinement. Le corrigé d'une étape est publié le lendemain
de la séance — si vous n'avez pas fini, vous pouvez repartir de là.

La séance du 17/11 est double : les deux étapes du front s'enchaînent sans
coupure d'une semaine. C'est la séance où l'application devient utilisable de
bout en bout, du clic sur une pizza à la commande enregistrée.

### 🎁 Pour aller plus loin

[Étape 5 — L'espace BDE](/practices/pizzima-5/) · le back-office qui branche
le CRUD de l'étape 2 sur une interface. Elle n'est **pas au programme des
séances** : elle n'apporte pas de notion nouvelle, elle rebranche ce que vous
saurez déjà faire. Elle est là pour qui veut couvrir tout le cahier des
charges.

## Comment travailler

- **Versionnez.** `git init` dès l'étape 1, un commit par fonctionnalité. Vous pourrez revenir en arrière quand vous casserez quelque chose (ça arrivera).
- **Un truc à la fois.** Faites marcher le backend avec `curl` ou Postman *avant* de toucher au React. Quand ça ne marche pas, vous saurez de quel côté chercher.
- **Lisez les erreurs.** Le terminal de l'API et la console du navigateur (F12) disent presque toujours ce qui ne va pas.
- **Bloqué plus de 15 minutes ?** Appelez-moi. C'est le but d'être en salle.
