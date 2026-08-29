<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ level?: number | string }>(), { level: 1 })

const LABELS = ['Facile', 'Intermédiaire', 'Difficile']

const value = computed(() => {
  const parsed = Number(props.level)
  if (!Number.isFinite(parsed)) return 1
  return Math.min(3, Math.max(1, Math.round(parsed)))
})

const label = computed(() => LABELS[value.value - 1])
</script>

<template>
  <span class="exercise-level" :title="label" :aria-label="`Difficulté : ${label}`">
    <span
      v-for="dot in 3"
      :key="dot"
      class="exercise-level-dot"
      :class="{ 'is-on': dot <= value }"
    />
  </span>
</template>
