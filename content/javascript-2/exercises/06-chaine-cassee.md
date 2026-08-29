---
layout: exercise
title: La chaîne cassée
duration: 10
difficulty: 2
goal: Comprendre pourquoi il faut *retourner* la promesse dans un `.then()`.
---

Ces deux fonctions sont censées faire la même chose. L'une remonte bien l'erreur, l'autre ne se termine **jamais**.

Exécutez, observez, puis réparez `versionThen` en ajoutant **un seul mot**.

```javascript {monaco-run} {height:'320px', autorun:false}
const fetchUser = async () => ({ id: 1 })
const fetchPosts = async () => { throw new Error("serveur HS") }

async function versionAsync() {
  const user = await fetchUser()
  return await fetchPosts(user)
}

function versionThen() {
  return new Promise((resolve, reject) => {
    fetchUser()
      .then((user) => {
        fetchPosts(user).then((posts) => resolve(posts))
      })
      .catch(reject)
  })
}

versionAsync().catch((e) => console.log("async →", e.message))
versionThen().catch((e) => console.log("then  →", e.message))
setTimeout(() => console.log("--- 1 s plus tard ---"), 1000)
```
