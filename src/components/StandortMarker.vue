<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()

const cx = 420
const cy = 665
</script>

<template>
  <g class="standort-marker">
    <!-- Outer pulse rings -->
    <circle :cx="cx" :cy="cy" r="10" class="pulse-ring ring-1" />
    <circle :cx="cx" :cy="cy" r="10" class="pulse-ring ring-2" />
    <!-- Main marker dot -->
    <circle :cx="cx" :cy="cy" r="10" class="standort-dot" />
    <!-- Inner dot -->
    <circle :cx="cx" :cy="cy" r="3.5" fill="#fff" />
    <!-- Label -->
    <text :x="cx + 16" :y="cy - 2" class="standort-label">{{ t('standortSub') }}</text>
  </g>
</template>

<style scoped>
.standort-dot {
  fill: var(--color-gold);
  stroke: #fff;
  stroke-width: 2;
  filter: drop-shadow(0 0 4px var(--color-gold-glow));
}

.pulse-ring {
  fill: none;
  stroke: var(--color-gold);
  stroke-width: 2;
  opacity: 0;
}

.ring-1 {
  animation: standort-pulse 2.6s ease-out infinite;
}
.ring-2 {
  animation: standort-pulse 2.6s ease-out 1.3s infinite;
}

@keyframes standort-pulse {
  0% {
    r: 10;
    opacity: 0.6;
  }
  100% {
    r: 32;
    opacity: 0;
  }
}

.standort-label {
  font-family: var(--font-family);
  font-size: 10px;
  font-weight: 700;
  fill: #8a6c10;
  paint-order: stroke;
  stroke: rgba(255, 255, 255, 0.85);
  stroke-width: 3;
}
</style>
