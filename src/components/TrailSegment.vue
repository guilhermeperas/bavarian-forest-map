<script setup lang="ts">
import { computed } from 'vue'
import { getDensityColor, getDensityLevel } from '@/composables/useTrafficSimulator'
import { useLocale } from '@/composables/useLocale'
import type { TrailSegment } from '@/types'

const props = defineProps<{
  trail: TrailSegment
  userCount: number
  showDensity: boolean
}>()

const { t } = useLocale()

const strokeColor = computed(() => {
  if (!props.showDensity) return props.trail.defaultColor
  return getDensityColor(props.userCount)
})

const densityLevel = computed(() => getDensityLevel(props.userCount))

const shouldPulse = computed(() =>
  props.showDensity && densityLevel.value === 'high'
)

const tooltipText = computed(() => {
  const name = t(props.trail.nameKey)
  if (!props.showDensity) return name
  return `${name} — ${props.userCount} ${t('densityUsers')}`
})

// Compute approximate midpoint from SVG path for badge placement
function parseMidpoint(d: string): { x: number; y: number } {
  const coords = d.match(/[\d.]+/g)?.map(Number) || []
  if (coords.length >= 4) {
    const midIdx = Math.floor(coords.length / 2)
    const mIdx = midIdx % 2 === 0 ? midIdx : midIdx - 1
    return { x: coords[mIdx] || 400, y: coords[mIdx + 1] || 400 }
  }
  return { x: 400, y: 400 }
}

const mid = parseMidpoint(props.trail.svgPath)
const trailMidX = mid.x
const trailMidY = mid.y
</script>

<template>
  <g class="trail-segment" :data-trail-id="trail.id">
    <!-- Main trail path -->
    <path
      :d="trail.svgPath"
      :stroke="strokeColor"
      :stroke-width="trail.strokeWidth"
      :stroke-dasharray="trail.dashed ? '12 6' : 'none'"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
      class="trail-path"
    >
      <title>{{ tooltipText }}</title>
    </path>
    <!-- User count badge -->
    <template v-if="showDensity && userCount > 0">
      <circle
        :cx="trailMidX"
        :cy="trailMidY"
        r="14"
        :fill="strokeColor"
        class="count-badge-bg"
      />
      <text
        :x="trailMidX"
        :y="trailMidY"
        text-anchor="middle"
        dominant-baseline="central"
        class="count-badge-text"
      >{{ userCount }}</text>
    </template>
  </g>
</template>

<style scoped>
.trail-path {
  transition: stroke 0.3s ease;
  cursor: pointer;
}

.trail-path:hover {
  filter: brightness(0.9);
}

.count-badge-bg {
  stroke: #ffffff;
  stroke-width: 1.5;
}

.count-badge-text {
  font-family: var(--font-family);
  font-size: 11px;
  font-weight: 700;
  fill: #fff;
  pointer-events: none;
}
</style>
