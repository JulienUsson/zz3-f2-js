---
layout: exercise
title: Emballer un callback
duration: 10
difficulty: 2
goal: Transformer une API à callback en promesse.
---

`setTimeout()` est plus vieux que les promesses. Écrire `delay(ms)` qui retourne une promesse résolue après `ms`, puis l'utiliser pour jouer ce dialogue :

```
- Toc toc
   (500 ms)
- Qui est là ?
   (10 s — mettez 1 s pour tester)
- C'est Internet Explorer
```

```javascript {monaco-run} {height:'240px', autorun:false}
function delay(ms) {
  // à vous : un new Promise autour de setTimeout
}

// puis, dans une fonction async, enchaînez les trois répliques
```
