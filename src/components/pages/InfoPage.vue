<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()

const emit = defineEmits<{
  back: []
}>()
</script>

<template>
  <div class="page-container">
    <header class="page-header">
      <button class="back-btn" @click="emit('back')">
        <span class="back-arrow">←</span>
        <span>{{ t('backToMap') }}</span>
      </button>
      <h1 class="page-title">{{ t('infoTitle') }}</h1>
    </header>

    <div class="page-body">
      <p class="page-intro">{{ t('infoDesc') }}</p>

      <div class="card-grid">
        <!-- Opening Hours -->
        <div class="info-card">
          <div class="card-icon">🕐</div>
          <h3>{{ t('infoHours') }}</h3>
          <p>{{ t('infoHoursSummer') }}</p>
          <p>{{ t('infoHoursWinter') }}</p>
        </div>

        <!-- Admission -->
        <div class="info-card">
          <div class="card-icon">🎫</div>
          <h3>{{ t('infoFree') }}</h3>
          <p>{{ t('infoLength') }}</p>
        </div>

        <!-- Wildlife -->
        <div class="info-card">
          <div class="card-icon">🐾</div>
          <h3>{{ t('infoWildlifeTitle') }}</h3>
          <p>{{ t('infoWildlifeDesc') }}</p>
        </div>

        <!-- Accessibility -->
        <div class="info-card">
          <div class="card-icon">♿</div>
          <h3>{{ t('infoAccessTitle') }}</h3>
          <p>{{ t('infoAccessDesc') }}</p>
        </div>
      </div>

      <!-- Transport Highlight -->
      <div class="transport-highlight">
        <div class="highlight-icon">🍃</div>
        <div class="highlight-content">
          <h3>{{ t('infoTransportTitle') }}</h3>
          <p>{{ t('infoTransportDesc') }}</p>
        </div>
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

.back-arrow {
  font-size: 16px;
}

.page-title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
}

.page-intro {
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: var(--space-xl);
  max-width: 640px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.info-card {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

.card-icon {
  font-size: 28px;
  margin-bottom: var(--space-sm);
}

.info-card h3 {
  font-size: var(--font-size-md);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xs);
}

.info-card p {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: 1.5;
}

.transport-highlight {
  display: flex;
  gap: var(--space-lg);
  align-items: flex-start;
  background: linear-gradient(135deg, rgba(174,200,112,0.1), rgba(46,98,50,0.06));
  border: 1px solid rgba(174,200,112,0.2);
  border-radius: var(--radius-lg);
  padding: var(--space-lg) var(--space-xl);
}

.highlight-icon {
  font-size: 36px;
  flex-shrink: 0;
}

.highlight-content h3 {
  font-size: var(--font-size-md);
  font-weight: 700;
  color: var(--color-forest-700);
  margin-bottom: var(--space-xs);
}

.highlight-content p {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
}
</style>
