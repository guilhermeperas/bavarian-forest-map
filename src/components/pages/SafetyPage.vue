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
      <h1 class="page-title">{{ t('safetyTitle') }}</h1>
    </header>

    <div class="page-body">
      <!-- Emergency Contacts -->
      <div class="emergency-grid">
        <a href="tel:112" class="emergency-card emergency-card--red">
          <span class="em-icon">🚨</span>
          <span class="em-label">{{ t('safetyEmergency') }}</span>
          <span class="em-number">{{ t('safetyEmergencyNum') }}</span>
        </a>
        <a href="tel:+49855896150" class="emergency-card emergency-card--green">
          <span class="em-icon">🌲</span>
          <span class="em-label">{{ t('safetyParkRanger') }}</span>
          <span class="em-number">{{ t('safetyParkRangerNum') }}</span>
        </a>
      </div>

      <!-- Park Status -->
      <div class="status-card">
        <div class="status-row">
          <span class="status-dot status-dot--open"></span>
          <span class="status-text">{{ t('safetyParkOpen') }}</span>
        </div>
      </div>

      <!-- Weather Warning -->
      <div class="warning-banner">
        <div class="warning-icon">⚠️</div>
        <div class="warning-body">
          <h3>{{ t('dashWarnTitle') }}</h3>
          <p>{{ t('dashWarnDesc') }}</p>
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

.page-header { margin-bottom: var(--space-xl); }

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
}

/* Emergency */
.emergency-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.emergency-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  text-align: center;
  transition: all 0.2s ease;
  text-decoration: none;
  backdrop-filter: blur(12px);
}

.emergency-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.emergency-card--red {
  background: rgba(181,32,32,0.06);
  border: 1px solid rgba(181,32,32,0.2);
  color: var(--color-emergency);
}

.emergency-card--green {
  background: rgba(255,255,255,0.85);
  border: 1px solid rgba(0,0,0,0.08);
  color: var(--color-text-primary);
}

.em-icon { font-size: 32px; }
.em-label { font-size: var(--font-size-sm); font-weight: 600; }
.em-number { font-size: var(--font-size-xl); font-weight: 700; }

/* Status */
.status-card {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
}

.status-row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-primary);
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status-dot--open {
  background: var(--color-online);
  box-shadow: 0 0 6px rgba(39,174,96,0.4);
}

/* Warning */
.warning-banner {
  display: flex;
  gap: var(--space-md);
  align-items: flex-start;
  background: rgba(200,160,48,0.08);
  border: 1px solid rgba(200,160,48,0.25);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
}

.warning-icon { font-size: 28px; flex-shrink: 0; }

.warning-body h3 {
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: #8c6008;
  margin-bottom: var(--space-xs);
}

.warning-body p {
  font-size: var(--font-size-sm);
  color: #8c6008;
  line-height: 1.5;
}

@media (max-width: 600px) {
  .emergency-grid { grid-template-columns: 1fr; }
}
</style>
