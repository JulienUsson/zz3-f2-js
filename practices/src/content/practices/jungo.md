---
title: "Jungo"
image: "/jungo.png"
order: 60
---

## Règles

Les règles du jeu sont disponibles [ici](/regles-jungo.pdf) ou [ici](https://www.youtube.com/watch?v=EjJjfv1HHLY) en vidéo.

---

## Matériel (72 cartes)

- 64 cartes numéro (1 à 8 en 8 exemplaires0)
- 8 cartes doubles (1/2, 3/4, 5/6, 7/8 en 2 exemplaires)<br/>Une carte double prend la valeur que tu veux au moment où tu la joues

⚠️ Important : on ne peut JAMAIS changer l’ordre des cartes dans sa main

## Mise en place

- 3 joueurs → 10 cartes chacun
- 4 ou 5 joueurs → 8 cartes chacun

## Déroulement d’un tour

À ton tour, tu fais **UNE seule action** :

#### Option A : Jouer une combinaison

- Une combinaison doit être :
  - de **même valeur**
  - avec des cartes **adjacentes dans ta main**

- Pour battre une combinaison déjà posée :
  - soit **plus de cartes**
  - soit **même nombre de cartes mais valeur plus élevée**

- Après avoir battu une combinaison :
  - tu prends les cartes battues
  - tu les mets **dans ta main (où tu veux)** OU **dans la défausse**

#### Option B : Piocher

- Tu pioches **1 carte**, puis au choix :
  - tu l’ajoutes à ta main
  - tu la jettes
  - tu fais un **JUNGO** (voir ci-dessous)

## Le JUNGO

- Si la carte piochée permet de battre la combinaison sur la table :
  - tu poses la carte piochée
  - tu peux compléter avec des cartes adjacentes de ta main si besoin

- Possible **avec la carte piochée seule**

## Cas particuliers

- Si personne ne bat une combinaison :
  - le joueur qui l’a posée la défausse
  - et recommence avec la combinaison qu’il veut
- Pioche vide → on mélange la défausse pour en refaire une

## Fin de partie

Dès qu’un joueur n’a plus de cartes, il gagne

---

## Démarrer un projet Express TypeScript

- Exécuter les commandes suivantes dans un terminal :

```bash
mkdir jungo-backend
cd jungo-backend
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
  res.send("Hello Jungo!");
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
    "dev": "nodemon --watch 'src/**/*.ts' --exec 'node --loader ts-node/esm' src/server.ts"
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
npm create vite@latest jungo-frontend -- --template react-ts
cd jungo-frontend
npm install
npm run dev
```

- Ouvrir [http://localhost:5173](http://localhost:5173) dans un navigateur web.
