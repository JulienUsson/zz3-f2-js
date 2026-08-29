---
title: "Pizzima — Étape 5 : l'espace BDE"
order: 86
hidden: true
---

**Séance 10.** Objectif : brancher le CRUD de l'étape 2 sur une interface, et rendre le projet présentable.

À la fin de cette séance, le cahier des charges est couvert entièrement.

## 1. Deux écrans

Il vous faut une façon de passer du catalogue à l'espace BDE. Le plus simple, sans installer de routeur :

```tsx
const [screen, setScreen] = useState<"catalogue" | "bde">("catalogue");
```

…et deux boutons dans l'en-tête. C'est du rendu conditionnel, rien de plus.

ℹ️ Une vraie application utiliserait [React Router](https://reactrouter.com/) pour avoir de vraies URLs (`/bde`, partageable, avec le bouton retour du navigateur). Si vous avez le temps, c'est un excellent bonus.

## 2. Gérer les pizzas

L'API sait déjà tout faire depuis l'étape 2 : il ne reste qu'à l'appeler.

- Un tableau des pizzas avec, sur chaque ligne, **Modifier** et **Supprimer**.
- Un formulaire de création (nom, description, prix, emoji) qui `POST`.
- Le même formulaire, pré-rempli, pour la modification (`PUT`).
- Une confirmation avant suppression (`DELETE`) — `window.confirm()` suffit.

Après chaque opération réussie, la liste affichée doit refléter le changement. Deux stratégies, choisissez et sachez la justifier :

| Stratégie                                          | Avantage            | Inconvénient                        |
| -------------------------------------------------- | ------------------- | ----------------------------------- |
| Recharger la liste depuis l'API                    | toujours juste      | un aller-retour réseau de plus      |
| Mettre à jour l'état local avec la réponse reçue   | instantané          | se désynchronise si on se trompe    |

⚠️ Les champs du formulaire sont des chaînes, y compris le prix. Convertissez avant d'envoyer, sinon votre validation serveur le refusera — et c'est très bien qu'elle le refuse.

## 3. Voir les commandes

Une liste des commandes (`GET /api/orders`), de la plus récente à la plus ancienne, avec le client, le détail des lignes (**nom** de la pizza, pas son id), le total et la date.

## 4. Les finitions

Ce qui sépare un TP d'un projet montrable :

- **`npm run typecheck` passe** dans `backend/` et dans `frontend/`. Aucun `any`, aucun `!`, aucun `as` non justifié.
- **Aucune erreur dans la console** du navigateur (F12).
- **`npm run build` passe** des deux côtés.
- **Un `README.md`** à la racine de votre projet : ce que fait l'application, comment la lancer, ce qui est fait et ce qui ne l'est pas.
- **Un historique git lisible**, un commit par fonctionnalité.

Passez aussi la [checklist de survie](/security/) de la séance sécurité sur votre code. Au minimum : le total est-il bien recalculé côté serveur ? Que se passe-t-il si on envoie une quantité négative ? Un `.env` traîne-t-il dans vos commits ?

### ✅ Point de contrôle — le cahier des charges

En tant que ZZ :

- [ ] je consulte la liste des pizzas
- [ ] je crée une commande
- [ ] je vois le récapitulatif de ma commande

En tant que membre du BDE :

- [ ] je crée, modifie et supprime une pizza
- [ ] je vois les commandes passées

Et :

- [ ] `npm run build` passe des deux côtés
- [ ] aucune erreur dans la console

## 🆘 Erreurs fréquentes

- **La liste ne se met pas à jour après une création** — vous avez appelé l'API mais pas touché à l'état React. L'écran n'est que le reflet de l'état.
- **Le prix part en `NaN`** — `Number("11,50")` vaut `NaN` : la virgule n'est pas un séparateur décimal en JavaScript.
- **`Warning: A component is changing an uncontrolled input to be controlled`** — le champ démarre avec `value={undefined}`. Initialisez votre état de formulaire avec des chaînes vides.
- **Tout casse après une suppression** — un composant affiche encore une pizza qui n'existe plus. Remettez la sélection à `null`.

## 🎁 Bonus, si vous voulez aller plus loin

- **React Router** pour de vraies URLs.
- **Des tests** sur les fonctions pures du backend (calcul du total, validation) avec [Vitest](https://vitest.dev/) — voir la séance [tests](/tests/).
- **Une vraie base de données** avec [SQLite](https://www.sqlite.org/) à la place du fichier JSON.
- **Un déploiement** sur [Netlify](https://www.netlify.com/) (front) et [Render](https://render.com/) (API) : votre application accessible depuis un vrai lien, à mettre dans votre CV.
