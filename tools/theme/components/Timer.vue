<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{ minutes?: number | string }>(), { minutes: 5 })

const total = computed(() => {
  const parsed = Number(props.minutes)
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed * 60) : 300
})

const remaining = ref(total.value)
const running = ref(false)
let handle: ReturnType<typeof setInterval> | undefined

function stop() {
  if (handle !== undefined) {
    clearInterval(handle)
    handle = undefined
  }
  running.value = false
}

function tick() {
  remaining.value -= 1
  if (remaining.value <= 0) {
    remaining.value = 0
    stop()
  }
}

function toggle() {
  if (running.value) {
    stop()
    return
  }
  if (remaining.value === 0) remaining.value = total.value
  running.value = true
  handle = setInterval(tick, 1000)
}

function reset() {
  stop()
  remaining.value = total.value
}

// Le décompte suit la durée déclarée dans le frontmatter de l'exercice.
watch(total, reset)
onUnmounted(stop)

const display = computed(() => {
  const m = Math.floor(remaining.value / 60)
  const s = remaining.value % 60
  return `${m}:${String(s).padStart(2, '0')}`
})
</script>

<template>
  <span class="exercise-timer" :class="{ 'is-running': running, 'is-over': remaining === 0 }">
    <button
      type="button"
      class="exercise-timer-toggle"
      :title="running ? 'Mettre en pause' : 'Démarrer le chrono'"
      @click="toggle"
    >
      <span class="exercise-timer-icon">{{ running ? '⏸' : '▶' }}</span>
      <span class="exercise-timer-value">{{ display }}</span>
    </button>
    <button type="button" class="exercise-timer-reset" title="Réinitialiser" @click="reset">↺</button>
  </span>
</template>
