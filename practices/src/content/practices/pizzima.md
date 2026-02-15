---
title: "Pizzima"
image: "/pizzima.png"
order: 60
---

## Cahier des charges

En tant que ZZ, je peux :

- Consulter la liste des pizzas
- Créer une commande
- Voir le récapitulatif de sa commande

En tant que membre du BDE, je peux :

- Gérer le référentiel de pizzas (CRUD)
- Voir les commandes passées

## Démarrer un projet Express TypeScript

- Exécuter les commandes suivantes dans un terminal :

```bash
mkdir pizzima-backend
cd pizzima-backend
npm init -y
npm install express
npm install -D typescript ts-node @types/node @types/express nodemon
npx tsc --init
```

- Créer le fichier `/src/server.ts` avec le contenu suivant :

```typescript
import express from "express";

const PORT = 8080;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Pizzima!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
```

- Modifier le fichier `package.json` comme suit :

```
{
  ...
  "main": "dist/server.js",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "nodemon --watch \"src/**/*.ts\" --exec \"node --loader ts-node/esm\" src/server.ts"
  },
  ...
}
```

- Exécuter la commande suivante dans un terminal :

```bash
npm run dev
```

- Tester l'API en ouvrant [http://localhost:8080](http://localhost:8080) dans un navigateur web.

ℹ️ Je vous conseille d'utiliser [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) pour tester votre API.

---

## Démarrer un projet React TypeScript

- Exécuter les commandes suivantes dans un terminal:

```bash
npm create vite@latest pizzima-frontend -- --template react-ts
cd pizzima-frontend
npm install
npm run dev
```

- Ouvrir [http://localhost:5173](http://localhost:5173) dans un navigateur web.
