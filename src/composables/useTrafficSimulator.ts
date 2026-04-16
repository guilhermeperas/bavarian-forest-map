/* ============================================
   useTrafficSimulator — Simulated Crowd Density
   ============================================ */

import { reactive, ref, onMounted, onUnmounted, watch } from 'vue'
import { trails } from '@/data/trails'
import type { TrafficData, DensityLevel } from '@/types'

const INTERVAL_MS = 30000

export function useTrafficSimulator(isOnline: { value: boolean }) {
  const trafficData = reactive<TrafficData>({})
  const isRunning = ref(false)
  let timerId: ReturnType<typeof setInterval> | null = null

  // Initialize all trail segments to 0
  for (const trail of trails) {
    trafficData[trail.id] = 0
  }

  function generateTraffic() {
    for (const trail of trails) {
      // Weighted random: most values cluster 0–10, occasional spikes
      const spike = Math.random() < 0.15
      const base = Math.floor(Math.random() * 12)
      const extra = spike ? Math.floor(Math.random() * 16) : 0
      trafficData[trail.id] = Math.min(base + extra, 30)
    }
  }

  function start() {
    if (timerId) return
    isRunning.value = true
    generateTraffic() // immediate first tick
    timerId = setInterval(generateTraffic, INTERVAL_MS)
  }

  function stop() {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    }
    isRunning.value = false
    // Reset to 0 when offline
    for (const trail of trails) {
      trafficData[trail.id] = 0
    }
  }

  // Start/stop based on connectivity
  watch(() => isOnline.value, (online) => {
    if (online) start()
    else stop()
  }, { immediate: false })

  onMounted(() => {
    if (isOnline.value) start()
  })

  onUnmounted(() => {
    stop()
  })

  return {
    trafficData,
    isRunning,
  }
}

/** Determine density level from user count */
export function getDensityLevel(count: number): DensityLevel {
  if (count <= 5) return 'low'
  if (count <= 15) return 'moderate'
  return 'high'
}

/** Get CSS color for a density level */
export function getDensityColor(count: number): string {
  const level = getDensityLevel(count)
  switch (level) {
    case 'low': return 'var(--color-density-low)'
    case 'moderate': return 'var(--color-density-moderate)'
    case 'high': return 'var(--color-density-high)'
  }
}

/** Get glow color for a density level */
export function getDensityGlow(count: number): string {
  const level = getDensityLevel(count)
  switch (level) {
    case 'low': return 'var(--color-density-low-glow)'
    case 'moderate': return 'var(--color-density-moderate-glow)'
    case 'high': return 'var(--color-density-high-glow)'
  }
}
