<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()
</script>

<template>
  <div class="density-legend glass-card">
    <h4 class="legend-title">{{ t('densityTitle') }}</h4>
    <div class="legend-items">
      <div class="legend-item">
        <span class="legend-dot dot-low"></span>
        <span class="legend-label">0–5 {{ t('densityUsers') }}</span>
        <span class="legend-level">{{ t('densityLow') }}</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot dot-moderate"></span>
        <span class="legend-label">6–15 {{ t('densityUsers') }}</span>
        <span class="legend-level">{{ t('densityModerate') }}</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot dot-high"></span>
        <span class="legend-label">16+ {{ t('densityUsers') }}</span>
        <span class="legend-level">{{ t('densityHigh') }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.density-legend {
  position: absolute;
  bottom: var(--space-lg);
  left: var(--space-lg);
  padding: var(--space-md) var(--space-lg);
  min-width: 200px;
  z-index: var(--z-overlay);
  animation: fade-in 0.4s ease;
}

.legend-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-sm);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.dot-low {
  background: var(--color-density-low);
}
.dot-moderate {
  background: var(--color-density-moderate);
}
.dot-high {
  background: var(--color-density-high);
}

.legend-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  flex: 1;
}

.legend-level {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}
</style>
