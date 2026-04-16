/* ============================================
   useConnectivity — Online / Offline Detection
   ============================================ */

import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { ConnectionMode } from '@/types'

export function useConnectivity() {
  const isOnline = ref(typeof navigator !== 'undefined' ? navigator.onLine : true)

  const connectionMode = computed<ConnectionMode>(() =>
    isOnline.value ? 'live' : 'cached'
  )

  let onHandler: (() => void) | null = null
  let offHandler: (() => void) | null = null

  onMounted(() => {
    onHandler = () => { isOnline.value = true }
    offHandler = () => { isOnline.value = false }
    window.addEventListener('online', onHandler)
    window.addEventListener('offline', offHandler)
  })

  onUnmounted(() => {
    if (onHandler) window.removeEventListener('online', onHandler)
    if (offHandler) window.removeEventListener('offline', offHandler)
  })

  return {
    isOnline,
    connectionMode,
  }
}
