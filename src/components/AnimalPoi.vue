<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
import type { AnimalData } from '@/types'

const props = defineProps<{
  animal: AnimalData
}>()

const emit = defineEmits<{
  select: [animal: AnimalData]
  playAudio: [audioId: string]
}>()

const { t } = useLocale()
</script>

<template>
  <g
    class="animal-poi"
    :data-animal-id="animal.id"
    @click.stop="emit('select', animal)"
    role="button"
    tabindex="0"
    @keydown.enter.stop="emit('select', animal)"
  >
    <!-- Shadow circle -->
    <circle
      :cx="animal.x + 0.5"
      :cy="animal.y + 1"
      r="14"
      class="poi-shadow"
    />
    <!-- Outer ring -->
    <circle
      :cx="animal.x"
      :cy="animal.y"
      r="14"
      class="poi-ring"
    />
    <!-- Background circle -->
    <circle
      :cx="animal.x"
      :cy="animal.y"
      r="12.5"
      class="poi-bg"
    />

    <!-- Animal icon -->
    <text
      :x="animal.x"
      :y="animal.y + 1"
      text-anchor="middle"
      dominant-baseline="central"
      class="poi-icon"
    >{{ animal.icon }}</text>

    <!-- Label pill below marker -->
    <g class="poi-label" :transform="`translate(${animal.x}, ${animal.y + 22})`">
      <rect
        x="-32" y="-8"
        width="64" height="15"
        rx="7.5"
        class="label-bg"
      />
      <text
        x="0"
        y="0"
        text-anchor="middle"
        dominant-baseline="central"
        class="label-text"
      >{{ t(animal.nameKey) }}</text>
    </g>

    <!-- Audio badge -->
    <g
      v-if="animal.audioId"
      :transform="`translate(${animal.x + 11}, ${animal.y - 11})`"
      class="audio-badge"
      @click.stop="emit('playAudio', animal.audioId)"
      role="button"
      tabindex="0"
    >
      <circle cx="0" cy="0" r="7" fill="#1c3a1e" stroke="#fff" stroke-width="1.5" />
      <text x="0" y="0.5" text-anchor="middle" dominant-baseline="central"
        font-size="7.5" fill="#fff" font-family="'Inter', sans-serif">🔊</text>
    </g>
  </g>
</template>

<style scoped>
.animal-poi {
  cursor: pointer;
  outline: none;
}

.poi-shadow {
  fill: rgba(0, 0, 0, 0.12);
  pointer-events: none;
}

.poi-ring {
  fill: #fff;
  pointer-events: none;
}

.poi-bg {
  fill: #5c3a21;
  transition: transform 0.15s ease;
  transform-origin: center;
}

.poi-icon {
  font-size: 14px;
  pointer-events: none;
}

.label-bg {
  fill: rgba(255, 255, 255, 0.92);
  stroke: rgba(0, 0, 0, 0.08);
  stroke-width: 0.6;
}

.label-text {
  font-family: var(--font-family);
  font-size: 8.5px;
  font-weight: 700;
  fill: #1a1208;
  pointer-events: none;
}

.animal-poi:hover .poi-bg,
.animal-poi:focus .poi-bg {
  fill: #7a4e2e;
}

.animal-poi:hover .poi-ring,
.animal-poi:focus .poi-ring {
  fill: #f8f0e0;
}
</style>
