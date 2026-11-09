---
title: "Pizzima"
order: 61
---

Le TP fil rouge. À la fin, vous aurez **une vraie application web** : un site React qui parle à une API Express, avec un catalogue, un panier et des commandes.

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

**D'abord, Node.** Il faut **Node 22 LTS** (Node 20.19 ou plus récent fait
l'affaire). Vérifiez :

```
node --version
```

Si la commande est inconnue ou affiche moins que `v20.19`, installez Node 22 LTS
depuis [nodejs.org](https://nodejs.org/) avant d'aller plus loin. Vite 8 refuse
de démarrer en dessous.

**Ensuite, le starter.** Une commande par ligne :

```
npx degit JulienUsson/zz3-f2-js/pizzima-starter pizzima
cd pizzima
```

Puis, dans **deux terminaux séparés** :

```
# Terminal 1 — l'API
cd backend
npm install
npm run dev
```

```
# Terminal 2 — le site
cd frontend
npm install
npm run dev
```

✅ **Vous êtes prêt quand** [http://localhost:5173](http://localhost:5173) affiche six pizzas.

Le `README.md` du starter décrit chaque fichier et explique les deux ou trois pièges (le proxy, l'extension `.js` dans les imports).

### 🆘 Si l'installation coince

- **`npx degit` échoue** (réseau de l'école, proxy, antivirus) — récupérez
  l'archive à la main : <https://github.com/JulienUsson/zz3-f2-js/archive/refs/heads/master.zip>,
  dézippez-la, et gardez uniquement le dossier `pizzima-starter`, renommé `pizzima`.
- **`npm install` s'arrête sur une erreur de version** — c'est Node. Relisez le
  `node --version` ci-dessus.
- **`EADDRINUSE: address already in use :::8080`** — un autre programme occupe
  le port 8080. Fermez-le, ou changez le `PORT` dans `backend/src/server.ts`
  (et le proxy dans `frontend/vite.config.ts`, qui pointe dessus).
- **Les deux serveurs doivent tourner en même temps**, chacun dans son terminal.
  Si vous fermez le terminal 1, le site affiche une liste vide.

## Les étapes

1. [**Étape 1 — L'API répond**](/practices/pizzima-1/) · lire les données, une pizza par son id
2. [**Étape 2 — Le CRUD complet**](/practices/pizzima-2/) · créer, modifier, supprimer, valider
3. [**Étape 3 — Le catalogue en React**](/practices/pizzima-3/) · composants, props, état
4. [**Étape 4 — Le panier et la commande**](/practices/pizzima-4/) · état partagé, POST vers l'API

Chaque étape se termine par un point de contrôle : si vous le passez, vous
pouvez enchaîner sereinement. Le corrigé d'une étape est publié le lendemain
de la séance — si vous n'avez pas fini, vous pouvez repartir de là.

### 🎁 Pour aller plus loin

[Étape 5 — L'espace BDE](/practices/pizzima-5/) · le back-office qui branche
le CRUD de l'étape 2 sur une interface. Elle n'est **pas au programme des
séances** : elle n'apporte pas de notion nouvelle, elle rebranche ce que vous
saurez déjà faire. Elle est là pour qui veut couvrir tout le cahier des
charges.

## Comment travailler

- **Versionnez.** `git init` dès l'étape 1, un commit par fonctionnalité. Vous pourrez revenir en arrière quand vous casserez quelque chose (ça arrivera).
- **Un truc à la fois.** Faites marcher le backend *avant* de toucher au React — la console du navigateur suffit pour l'interroger ([comment faire](/practices/pizzima-1/)). Quand ça ne marche pas, vous saurez de quel côté chercher.
- **Lisez les erreurs.** Le terminal de l'API et la console du navigateur (F12) disent presque toujours ce qui ne va pas.
- **Bloqué plus de 15 minutes ?** Appelez-moi. C'est le but d'être en salle.
