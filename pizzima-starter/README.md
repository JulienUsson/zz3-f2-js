# Pizzima — starter

Le squelette du TP fil rouge. Tout le tooling est déjà réglé : vous écrivez des
fonctionnalités, pas des fichiers de configuration.

## Démarrer

Il faut **deux terminaux**, un par serveur.

**Terminal 1 — l'API :**

```bash
cd backend
npm install
npm run dev
```

➡️ <http://localhost:8080/api/pizzas> doit afficher la liste des pizzas en JSON.

**Terminal 2 — le site :**

```bash
cd frontend
npm install
npm run dev
```

➡️ <http://localhost:5173> doit afficher les 6 pizzas.

Si les deux marchent, vous avez déjà une application web complète : un site qui
appelle une API, qui lit des données. Le reste du TP consiste à l'étoffer.

## Ce qu'il y a dedans

```
backend/
  data/pizzas.json    les données (votre « base de données »)
  src/store.ts        lit/écrit le fichier JSON — fourni, à ne pas modifier
  src/pizzas.ts       le type Pizza et l'accès aux données
  src/server.ts       les routes HTTP
frontend/
  src/types.ts        le type Pizza, côté front
  src/api.ts          deux helpers pour appeler l'API — fournis
  src/App.tsx         le composant racine
  src/index.css       les styles
  vite.config.ts      la config Vite, dont le proxy /api
```

## Les commandes

| Dans `backend/`     |                                                       |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | démarre l'API et la redémarre à chaque sauvegarde      |
| `npm run typecheck` | vérifie les types sans rien compiler                   |
| `npm run build`     | compile le TypeScript dans `dist/`                     |
| `npm start`         | lance la version compilée                              |

| Dans `frontend/` |                                            |
| ---------------- | ------------------------------------------ |
| `npm run dev`    | démarre le site avec rechargement à chaud  |
| `npm run build`  | vérifie les types puis construit `dist/`   |

## Deux ou trois choses à savoir

**Le proxy.** Le front appelle `/api/pizzas`, pas
`http://localhost:8080/api/pizzas`. Vite se charge de transmettre la requête à
l'API (voir `vite.config.ts`). C'est ce qui vous évite les erreurs CORS, et
c'est aussi comme ça que ça se passe en production.

**L'extension `.js` dans les imports.** Côté backend, on écrit
`import { findAllPizzas } from "./pizzas.js"` alors que le fichier s'appelle
`pizzas.ts`. Ce n'est pas une faute : les modules ES demandent l'extension du
fichier **une fois compilé**. Votre éditeur vous le proposera automatiquement.

**Les données.** `data/pizzas.json` est réécrit quand vous appelez
`store.save(...)`. Si vous cassez le fichier, `git checkout` le remet en état.
