<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
import type { AnimalData } from '@/types'

const props = defineProps<{
  animal: AnimalData
}>()

const emit = defineEmits<{
  close: []
}>()

const { t } = useLocale()

function onBackdropClick(e: MouseEvent) {
  if ((e.target as HTMLElement).classList.contains('overlay-backdrop')) {
    emit('close')
  }
}
</script>

<template>
  <Transition name="overlay">
    <div class="overlay-backdrop" @click="onBackdropClick">
      <div class="overlay-panel glass-card">
        <!-- Header -->
        <div class="overlay-header">
          <div class="overlay-icon-wrap">
            <span class="overlay-icon">{{ animal.icon }}</span>
          </div>
          <div class="overlay-title-group">
            <h2 class="overlay-title">{{ t(animal.nameKey) }}</h2>
            <span class="overlay-id">#{{ animal.id }}</span>
          </div>
          <button class="overlay-close" @click="emit('close')" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Divider -->
        <div class="overlay-divider"></div>

        <!-- Body -->
        <div class="overlay-body">
          <p class="overlay-desc">{{ t(animal.descriptionKey) }}</p>

          <div class="overlay-meta">
            <div class="meta-item">
              <span class="meta-icon">📍</span>
              <span class="meta-label">Enclosure</span>
            </div>
            <div class="meta-item">
              <span class="meta-icon">🟢</span>
              <span class="meta-label">Active</span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="overlay-footer">
          <div class="overlay-coords">
            <span class="coord-label">SVG Position:</span>
            <span class="coord-value">{{ animal.x }}, {{ animal.y }}</span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.overlay-backdrop {
  position: absolute;
  inset: 0;
  background: var(--color-bg-overlay);
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: var(--space-xl);
}

.overlay-panel {
  width: 380px;
  max-width: 90vw;
  max-height: 85vh;
  overflow-y: auto;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.overlay-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
}

.overlay-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-lg);
  background: var(--color-forest-700);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: inset 0 0 0 1px var(--color-border);
}

.overlay-icon {
  font-size: 26px;
}

.overlay-title-group {
  flex: 1;
  min-width: 0;
}

.overlay-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
}

.overlay-id {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
}

.overlay-close {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.overlay-close:hover {
  background: var(--color-forest-700);
  color: var(--color-text-primary);
}

.overlay-divider {
  height: 1px;
  background: var(--color-border);
  margin: 0 var(--space-lg);
}

.overlay-body {
  padding: var(--space-lg);
  flex: 1;
}

.overlay-desc {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-lg);
}

.overlay-meta {
  display: flex;
  gap: var(--space-lg);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.meta-icon {
  font-size: 14px;
}

.meta-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
}

.overlay-footer {
  padding: var(--space-md) var(--space-lg);
  border-top: 1px solid var(--color-border);
}

.overlay-coords {
  display: flex;
  gap: var(--space-xs);
  font-size: var(--font-size-xs);
}

.coord-label {
  color: var(--color-text-muted);
}

.coord-value {
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  font-family: monospace;
}

/* ── Transition ── */
.overlay-enter-active {
  animation: fade-in 0.3s ease;
}
.overlay-enter-active .overlay-panel {
  animation: slide-in-right 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.overlay-leave-active {
  transition: opacity 0.2s ease;
  opacity: 0;
}
.overlay-leave-active .overlay-panel {
  animation: slide-out-right 0.25s ease forwards;
}

@media (max-width: 500px) {
  .overlay-backdrop {
    padding: var(--space-md);
    justify-content: center;
  }
  .overlay-panel {
    width: 100%;
  }
}
</style>
