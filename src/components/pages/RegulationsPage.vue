<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()

const emit = defineEmits<{
  back: []
}>()

const regulations = [
  { key: 'regTrails', icon: '🥾' },
  { key: 'regDogs', icon: '🐕' },
  { key: 'regFeeding', icon: '🚫' },
  { key: 'regNoise', icon: '🤫' },
  { key: 'regWaste', icon: '🗑️' },
  { key: 'regBikes', icon: '🚲' },
  { key: 'regPhotos', icon: '📷' },
  { key: 'regKfz', icon: '🚗' },
]
</script>

<template>
  <div class="page-container">
    <header class="page-header">
      <button class="back-btn" @click="emit('back')">
        <span class="back-arrow">←</span>
        <span>{{ t('backToMap') }}</span>
      </button>
      <h1 class="page-title">{{ t('regTitle') }}</h1>
      <p class="page-subtitle">{{ t('regSubtitle') }}</p>
    </header>

    <div class="rules-grid">
      <div
        v-for="(rule, i) in regulations"
        :key="rule.key"
        class="rule-card"
      >
        <div class="rule-number">{{ i + 1 }}</div>
        <div class="rule-icon">{{ rule.icon }}</div>
        <p class="rule-text">{{ t(rule.key) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 860px;
  margin: 0 auto;
  padding: var(--space-xl) var(--space-lg);
  animation: pageIn 0.3s ease;
}

@keyframes pageIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-header {
  margin-bottom: var(--space-xl);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 8px 16px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-forest-700);
  background: rgba(46, 98, 50, 0.08);
  border: 1px solid rgba(46, 98, 50, 0.15);
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: var(--space-lg);
}

.back-btn:hover {
  background: rgba(46, 98, 50, 0.14);
  transform: translateX(-2px);
}

.page-title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xs);
}

.page-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-md);
}

.rule-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: transform 0.2s ease;
}

.rule-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

.rule-number {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  background: var(--color-forest-100);
  color: var(--color-forest-700);
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.rule-icon {
  font-size: 22px;
  flex-shrink: 0;
}

.rule-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
  flex: 1;
}
</style>
