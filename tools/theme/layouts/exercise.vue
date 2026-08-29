<script setup lang="ts">
import { computed } from 'vue'

// Slidev retire les clés réservées (dont `title`) des props, mais expose le
// frontmatter complet : c'est de là qu'on lit le titre de l'exercice.
const props = defineProps<{
  frontmatter?: Record<string, unknown>
  duration?: number | string
  difficulty?: number | string
  goal?: string
}>()

const title = computed(() => {
  const value = props.frontmatter?.title
  return typeof value === 'string' ? value : undefined
})
</script>

<template>
  <div class="slidev-layout exercise">
    <header class="exercise-header">
      <div class="exercise-heading">
        <span class="exercise-badge">🧑‍💻 À toi de jouer</span>
        <h1 v-if="title" class="exercise-title">{{ title }}</h1>
      </div>
      <div class="exercise-meta">
        <Level v-if="difficulty" :level="difficulty" />
        <Timer v-if="duration" :minutes="duration" />
      </div>
    </header>
    <p v-if="goal" class="exercise-goal">🎯 {{ goal }}</p>
    <div class="exercise-body">
      <slot />
    </div>
  </div>
</template>
