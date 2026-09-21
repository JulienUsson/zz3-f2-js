<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useNav } from '@slidev/client'

/**
 * Affiche la correction de l'exercice courant par-dessus la slide, sur
 * `Alt + C`. Pensé pour la classe : corriger au tableau sans changer d'onglet
 * ni montrer toute la page des corrigés.
 *
 * La correction n'est pas embarquée dans le diaporama : elle est lue à la
 * volée sur `/corrections/<séance>/`, la page que le site publie déjà. Le
 * diaporama ne contient donc aucun corrigé, et ce qui s'affiche est toujours
 * la version en ligne.
 *
 * ⚠️ Discret, pas secret : la page des corrigés est publique (seul son lien
 * sur l'accueil attend la date). Le raccourci évite de l'ouvrir devant tout le
 * monde, il ne la protège pas.
 */
const { currentSlideRoute, isPrintMode } = useNav()

const moduleId = computed(() => import.meta.env.BASE_URL.replaceAll('/', ''))

const titreExercice = computed(() => {
  const fm = currentSlideRoute.value?.meta?.slide?.frontmatter as
    | { layout?: string; title?: unknown }
    | undefined
  if (fm?.layout !== 'exercise') return undefined
  return typeof fm.title === 'string' ? fm.title : undefined
})

const ouvert = ref(false)
const contenu = ref('')
const message = ref('')

/** Apostrophes typographiques, espaces et casse : le markdown et le rendu HTML
 *  ne les écrivent pas pareil. */
const normaliser = (t: string) =>
  t.replace(/[’‘`]/g, "'").replace(/\s+/g, ' ').trim().toLowerCase()

let pageCorrections: Document | undefined

async function chargerPage() {
  if (pageCorrections) return pageCorrections
  const reponse = await fetch(`/corrections/${moduleId.value}/`)
  if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`)
  pageCorrections = new DOMParser().parseFromString(await reponse.text(), 'text/html')
  return pageCorrections
}

/** Les titres du bandeau du site sont aussi des `h2` : on se limite au corps. */
function sectionPour(page: Document, titre: string) {
  const corps = page.querySelector('article .practice')
  if (!corps) return undefined
  const cible = normaliser(titre)
  for (const h2 of corps.querySelectorAll('h2')) {
    const texte = normaliser(h2.textContent ?? '')
    if (!texte.endsWith(cible)) continue
    const morceaux = [h2.outerHTML]
    for (let n = h2.nextElementSibling; n && n.tagName !== 'H2'; n = n.nextElementSibling) {
      morceaux.push(n.outerHTML)
    }
    return morceaux.join('')
  }
  return undefined
}

async function basculer() {
  if (ouvert.value) {
    ouvert.value = false
    return
  }
  const titre = titreExercice.value
  ouvert.value = true
  contenu.value = ''
  message.value = ''

  if (!titre) {
    message.value = "Cette slide n'est pas un exercice."
    return
  }
  try {
    const section = sectionPour(await chargerPage(), titre)
    if (section) contenu.value = section
    else message.value = `Aucune correction trouvée pour « ${titre} ».`
  } catch (erreur) {
    message.value = `Corrections injoignables (${(erreur as Error).message}).`
  }
}

function auClavier(event: KeyboardEvent) {
  if (event.altKey && !event.ctrlKey && !event.metaKey && event.code === 'KeyC') {
    event.preventDefault()
    basculer()
    return
  }
  if (event.key === 'Escape' && ouvert.value) {
    event.preventDefault()
    ouvert.value = false
  }
}

onMounted(() => window.addEventListener('keydown', auClavier, true))
onBeforeUnmount(() => window.removeEventListener('keydown', auClavier, true))
</script>

<template>
  <div
    v-if="ouvert && moduleId && !isPrintMode"
    class="correction-overlay"
    @click.self="ouvert = false"
  >
    <div class="correction-panneau">
      <header>
        <span>🔑 Correction</span>
        <button type="button" title="Fermer (Échap)" @click="ouvert = false">✕</button>
      </header>
      <div v-if="contenu" class="correction-corps" v-html="contenu" />
      <p v-else class="correction-message">{{ message }}</p>
    </div>
  </div>
</template>

<style>
.correction-overlay {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: rgba(31, 41, 51, 0.55);
}

.correction-panneau {
  display: flex;
  flex-direction: column;
  width: min(1000px, 100%);
  max-height: 100%;
  border: 3px solid var(--slidev-theme-primary);
  border-radius: 12px;
  background-color: #fff;
  overflow: hidden;
}

.correction-panneau header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  background-color: var(--slidev-theme-primary);
  font-weight: 700;
}

.correction-panneau header button {
  border: 0;
  background: none;
  cursor: pointer;
  font-size: 1.1em;
}

.correction-corps {
  padding: 4px 20px 20px;
  overflow: auto;
  text-align: left;
  font-size: 0.8rem;
}

.correction-corps pre {
  padding: 10px 12px;
  border-radius: 8px;
  overflow: auto;
}

.correction-message {
  padding: 24px;
  text-align: center;
}
</style>
