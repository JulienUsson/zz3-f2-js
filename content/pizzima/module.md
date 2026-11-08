---
title: "Pizzima"
order: 61
---

Le TP fil rouge des séances 7 à 9. À la fin, vous aurez **une vraie application web** : un site React qui parle à une API Express, avec un catalogue, un panier et des commandes.

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

**Ensuite, le starter.** Une commande par ligne, dans l'ordre :

```
npx degit JulienUsson/zz3-f2-js/pizzima-starter pizzima
cd pizzima
```

Puis, dans **deux terminaux séparés** — toujours une commande par ligne :

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

⚠️ **Ne collez pas `cd backend && npm install && npm run dev`.** Le `&&`
n'existe pas dans Windows PowerShell 5.1, celui qui s'ouvre par défaut sous
Windows ; il n'est arrivé qu'avec
[PowerShell 7](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_pipeline_chain_operators).
Une commande par ligne marche partout.

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


## Le calendrier

| Quand | Ce qu'on fait |
| --- | --- |
| **avant le 10/11**, chez vous | Récupérer le starter et le faire tourner (voir ci-dessous) |
| **Mardi 10/11** — séance 7 | [Étape 1 — L'API répond](/practices/pizzima-1/) · lire les données, une pizza par son id<br>[Étape 2 — Le CRUD complet](/practices/pizzima-2/) · créer, modifier, supprimer, valider |
| **Mardi 17/11** — séances 8 et 9, d'affilée | [Étape 3 — Le catalogue en React](/practices/pizzima-3/) · composants, props, état<br>[Étape 4 — Le panier et la commande](/practices/pizzima-4/) · état partagé, POST vers l'API |
| **Mardi 24/11** — séance 10 | Partiel |

⚠️ **L'installation se fait avant la séance du 10/11, pas pendant.** Le
programme est serré : une demi-heure passée à installer Node et à attendre
`npm install`, c'est une demi-heure en moins sur l'API. Si ça coince, venez
me voir avant, ou écrivez-moi.

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
- **Un truc à la fois.** Faites marcher le backend *avant* de toucher au React — la console du navigateur suffit pour l'interroger ([comment faire](/practices/pizzima-1/)). Quand ça ne marche pas, vous saurez de quel côté chercher.
- **Lisez les erreurs.** Le terminal de l'API et la console du navigateur (F12) disent presque toujours ce qui ne va pas.
- **Bloqué plus de 15 minutes ?** Appelez-moi. C'est le but d'être en salle.
