<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
import type { ConnectionMode } from '@/types'

const props = defineProps<{
  mode: ConnectionMode
  weatherWarning?: boolean
}>()

const { t } = useLocale()
</script>

<template>
  <div class="status-badge" :class="`status-${mode}`">
    <span class="status-dot"></span>
    <span class="status-text">{{ mode === 'live' ? t('statusOnline') : t('statusOffline') }}</span>
    <span v-if="weatherWarning" class="weather-warn" :title="t('safetyWeatherWarn')">⚠️</span>
  </div>
</template>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.04em;
  border: 1px solid transparent;
  transition: all var(--transition-base);
}

.status-live {
  background: rgba(46, 204, 113, 0.12);
  border-color: rgba(46, 204, 113, 0.25);
  color: var(--color-online);
}

.status-cached {
  background: rgba(231, 76, 60, 0.12);
  border-color: rgba(231, 76, 60, 0.25);
  color: var(--color-offline);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.status-live .status-dot {
  background: var(--color-online);
  box-shadow: 0 0 6px var(--color-density-low-glow);
  animation: dot-blink 2s ease-in-out infinite;
}

.status-cached .status-dot {
  background: var(--color-offline);
}

.weather-warn {
  font-size: 12px;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes dot-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>
