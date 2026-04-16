<script setup lang="ts">
import type { AudioPoint } from '@/types'

const props = defineProps<{
  point: AudioPoint
}>()

const emit = defineEmits<{
  play: [point: AudioPoint]
}>()
</script>

<template>
  <g
    class="audio-trigger"
    :data-audio-id="point.id"
    @click.stop="emit('play', point)"
    role="button"
    tabindex="0"
    @keydown.enter.stop="emit('play', point)"
  >
    <!-- Pulse ring -->
    <circle
      :cx="point.x"
      :cy="point.y"
      r="8"
      class="audio-pulse-ring"
    />
    <!-- Background -->
    <circle
      :cx="point.x"
      :cy="point.y"
      r="10"
      class="audio-bg"
    />
    <!-- Speaker icon -->
    <text
      :x="point.x"
      :y="point.y"
      text-anchor="middle"
      dominant-baseline="central"
      class="audio-icon"
    >🔊</text>
  </g>
</template>

<style scoped>
.audio-trigger {
  cursor: pointer;
  outline: none;
}

.audio-bg {
  fill: var(--color-forest-700);
  stroke: var(--color-accent);
  stroke-width: 1.5;
  transition: all var(--transition-base);
  filter: drop-shadow(0 1px 3px rgba(0,0,0,0.4));
}

.audio-pulse-ring {
  fill: none;
  stroke: var(--color-accent);
  stroke-width: 1;
  opacity: 0;
  transition: all var(--transition-base);
}

.audio-icon {
  font-size: 11px;
  pointer-events: none;
}

.audio-trigger:hover .audio-bg,
.audio-trigger:focus .audio-bg {
  fill: var(--color-forest-600);
  stroke-width: 2;
  r: 12;
}

.audio-trigger:hover .audio-pulse-ring,
.audio-trigger:focus .audio-pulse-ring {
  animation: audio-ring-pulse 1.8s ease-out infinite;
}

@keyframes audio-ring-pulse {
  0% { r: 10; opacity: 0.6; }
  100% { r: 24; opacity: 0; }
}
</style>
