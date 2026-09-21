<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

/**
 * Ajoute un bouton « plein écran » à chaque éditeur de code des slides.
 *
 * Slidev rend lui-même la barre d'outils de l'éditeur (`.slidev-monaco-container`
 * ➡️ `div.absolute.right-1.top-1`) et n'offre pas de point d'extension : on y
 * glisse donc le bouton depuis le DOM. Un `MutationObserver` rattrape les
 * éditeurs des slides suivantes, montées après coup par le routeur.
 *
 * On passe par l'API Fullscreen du navigateur plutôt que par du CSS : Slidev
 * met à l'échelle les slides (`transform` sur `.slidev-slide-content`), et un
 * élément `position: fixed` se cale alors sur cet ancêtre transformé, pas sur
 * la fenêtre. L'API, elle, sort l'élément du flux et ignore les
 * transformations — et rend Échap gratuitement.
 *
 * Le redimensionnement est suivi par Monaco grâce à `automaticLayout`, activé
 * dans l'addon.
 */
const MARQUE = 'data-course-plein-ecran'
let observer: MutationObserver | undefined

function equiper(barre: Element) {
  if (barre.hasAttribute(MARQUE)) return
  barre.setAttribute(MARQUE, '')

  const conteneur = barre.closest('.slidev-monaco-container')
  if (!conteneur?.requestFullscreen) return

  const bouton = document.createElement('button')
  bouton.type = 'button'
  bouton.title = 'Plein écran'
  bouton.className = 'slidev-icon-btn course-plein-ecran-btn'
  bouton.innerHTML = '<span class="sr-only">Plein écran</span><span aria-hidden="true">⛶</span>'
  bouton.addEventListener('click', () => {
    if (document.fullscreenElement === conteneur) document.exitFullscreen()
    else conteneur.requestFullscreen().catch(() => {})
  })

  // Avant le bouton « exécuter » : sa position ne bouge donc pas selon que le
  // bloc est exécutable ou non.
  barre.prepend(bouton)
}

function balayer() {
  for (const barre of document.querySelectorAll('.slidev-monaco-container .absolute.right-1')) {
    equiper(barre)
  }
}

/** Le titre suit l'état, pour que l'infobulle dise comment sortir. */
function majTitres() {
  for (const bouton of document.querySelectorAll<HTMLButtonElement>('.course-plein-ecran-btn')) {
    const plein = bouton.closest('.slidev-monaco-container') === document.fullscreenElement
    bouton.title = plein ? 'Quitter le plein écran (Échap)' : 'Plein écran'
  }
}

onMounted(() => {
  balayer()
  observer = new MutationObserver(balayer)
  observer.observe(document.body, { childList: true, subtree: true })
  document.addEventListener('fullscreenchange', majTitres)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  document.removeEventListener('fullscreenchange', majTitres)
})
</script>

<template><span hidden /></template>
