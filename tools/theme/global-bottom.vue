<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { slides, isPrintMode } = useNav()

/**
 * Le diaporama est construit avec `--base /<séance>/` : l'identifiant de la
 * séance est donc déjà dans l'URL de base, rien à déclarer.
 *
 * En développement (`course dev <séance>`) il n'y a pas de base : le
 * diaporama tourne seul, sans site autour, et les liens n'auraient nulle part
 * où aller. On les masque.
 */
const moduleId = computed(() => import.meta.env.BASE_URL.replaceAll('/', ''))

/**
 * Le lien vers les exercices ne s'affiche que si la séance en a — déduit des
 * slides elles-mêmes, pas d'une déclaration à tenir à jour en double.
 */
const hasExercises = computed(() =>
  slides.value.some(
    (slide) => (slide?.meta?.slide?.frontmatter as { layout?: string })?.layout === 'exercise',
  ),
)
</script>

<template>
  <nav v-if="moduleId && !isPrintMode" class="course-nav">
    <a href="/" title="Toutes les séances">🏠 Accueil</a>
    <a v-if="hasExercises" :href="`/practices/${moduleId}/`" title="La fiche de TP">
      📝 Exercices
    </a>
  </nav>
</template>

<style>
.course-nav {
  position: absolute;
  top: 10px;
  right: 12px;
  z-index: 20;
  display: flex;
  gap: 6px;
  /* Discret pendant le cours, mais lisible même posé sur le bandeau jaune
     du quiz — d'où le fond opaque plutôt qu'une simple transparence. */
  opacity: 0.6;
  transition: opacity 0.2s;
}

.course-nav:hover {
  opacity: 1;
}

.course-nav a {
  background-color: #fff;
  border: 1px solid rgba(31, 41, 51, 0.25);
  border-radius: 999px;
  color: #1f2933;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 3px 10px;
  text-decoration: none;
  white-space: nowrap;
}

.course-nav a:hover {
  background-color: var(--slidev-theme-primary);
}
</style>
