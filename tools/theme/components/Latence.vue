<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{ seconds?: number | string }>(), { seconds: 3 })

const duree = computed(() => {
  const parsed = Number(props.seconds)
  return Number.isFinite(parsed) && parsed > 0 ? parsed * 1000 : 3000
})

const clics = ref(0)
const tours = ref(0)
const etat = ref<'libre' | 'bloque' | 'attend'>('libre')

/**
 * Confisque le thread principal. Le `requestAnimationFrame` doublé laisse le
 * navigateur peindre l'état « bloqué » AVANT que la boucle ne l'empêche de
 * peindre quoi que ce soit — sans lui, la démo se fige sans rien montrer.
 */
function bloquer() {
  etat.value = 'bloque'
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const fin = Date.now() + duree.value
      let n = 0
      // Le compteur n'est pas décoratif : une boucle au corps vide est
      // supprimée par le minifieur, qui juge `Date.now() < fin` sans effet
      // de bord. Faire ressortir `n` la rend indispensable — et donne au
      // passage le nombre de tours gaspillés.
      while (Date.now() < fin) n++
      tours.value = n
      etat.value = 'libre'
    }),
  )
}

/** La même durée, mais rendue au navigateur pendant l'attente. */
async function attendre() {
  etat.value = 'attend'
  await new Promise((resolve) => setTimeout(resolve, duree.value))
  etat.value = 'libre'
}

const message = computed(() => {
  if (etat.value === 'bloque')
    return 'Thread confisqué : le compteur ne répond plus et l’animation est figée. Vos clics ne sont pas perdus — ils attendent dans la file.'
  if (etat.value === 'attend')
    return 'Même durée, mais le thread est rendu au navigateur : tout continue de répondre.'
  if (tours.value)
    return `Le thread est rendu. Pendant le blocage, le processeur a tourné ${tours.value.toLocaleString('fr-FR')} fois dans le vide — sans rien faire d’utile.`
  return 'Le thread est libre. Cliquez sur le compteur, puis lancez une des deux attentes.'
})
</script>

<template>
  <div class="latence" :class="`is-${etat}`">
    <div class="latence-scene">
      <span class="latence-spinner" aria-hidden="true" />
      <button type="button" class="latence-clic" @click="clics++">
        Cliquez-moi — <strong>{{ clics }}</strong>
      </button>
    </div>

    <div class="latence-actions">
      <button type="button" @click="bloquer" :disabled="etat !== 'libre'">
        Bloquer {{ duree / 1000 }} s <small>boucle synchrone</small>
      </button>
      <button type="button" @click="attendre" :disabled="etat !== 'libre'">
        Attendre {{ duree / 1000 }} s <small>await</small>
      </button>
      <button type="button" class="latence-reset" title="Remettre à zéro" @click="clics = 0; tours = 0">↺</button>
    </div>

    <p class="latence-message">{{ message }}</p>
  </div>
</template>

<style scoped>
.latence {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  padding: 20px 24px;
  border: 3px solid var(--slidev-theme-primary);
  border-radius: 14px;
  background: #fff;
}

.latence-scene {
  display: flex;
  gap: 20px;
  align-items: center;
}

/* Cette animation est jouée par le thread principal : elle se fige avec lui. */
.latence-spinner {
  width: 42px;
  height: 42px;
  border: 6px solid var(--slidev-theme-background);
  border-top-color: var(--slidev-theme-primary);
  border-radius: 50%;
  animation: latence-tourne 1s linear infinite;
}

@keyframes latence-tourne {
  to {
    transform: rotate(360deg);
  }
}

.latence-clic {
  padding: 10px 22px;
  border: 2px solid #1c1917;
  border-radius: 999px;
  background: var(--slidev-theme-primary);
  font-size: 1.1em;
  cursor: pointer;
}

.latence-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.latence-actions button {
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  border: 2px solid #1c1917;
  border-radius: 10px;
  background: #fff;
  line-height: 1.2;
  cursor: pointer;
}

.latence-actions button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.latence-actions small {
  font-family: var(--slidev-theme-mono, monospace);
  font-size: 0.7em;
  opacity: 0.7;
}

.latence-reset {
  align-self: stretch;
}

.latence-message {
  margin: 0;
  min-height: 3em;
  max-width: 30em;
  text-align: center;
  font-size: 0.85em;
}

.latence.is-bloque .latence-message {
  font-weight: 700;
}
</style>
