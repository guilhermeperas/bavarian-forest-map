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
      <h1 class="page-title">{{ t('transportTitle') }}</h1>
      <p class="page-subtitle">{{ t('transportSubtitle') }}</p>
    </header>

    <div class="page-body">
      <!-- Sustainability Banner -->
      <div class="sustain-banner">
        <div class="sustain-icon">🍃</div>
        <div class="sustain-content">
          <h3>{{ t('transportSustainTitle') }}</h3>
          <p>{{ t('transportSustainDesc') }}</p>
        </div>
      </div>

      <div class="transport-grid">
        <!-- Igelbus -->
        <div class="transport-card">
          <div class="transport-card-header">
            <span class="transport-emoji">🚌</span>
            <div>
              <h3>Igelbus</h3>
              <span class="transport-tag transport-tag--green">{{ t('transportEco') }}</span>
            </div>
          </div>
          <p class="transport-desc">{{ t('transportIgelbusDesc') }}</p>
          <ul class="transport-details">
            <li>{{ t('transportIgelbusRoute') }}</li>
            <li>{{ t('transportIgelbusFreq') }}</li>
            <li>{{ t('transportIgelbusStop') }}</li>
          </ul>
          <div class="transport-status">
            <span class="status-indicator status-indicator--active"></span>
            <span>{{ t('transportStatusActive') }}</span>
          </div>
          <button class="book-btn">{{ t('transportBook') }}</button>
        </div>

        <!-- Waldbahn -->
        <div class="transport-card">
          <div class="transport-card-header">
            <span class="transport-emoji">🚆</span>
            <div>
              <h3>Waldbahn</h3>
              <span class="transport-tag transport-tag--blue">{{ t('transportRail') }}</span>
            </div>
          </div>
          <p class="transport-desc">{{ t('transportWaldbahnDesc') }}</p>
          <ul class="transport-details">
            <li>{{ t('transportWaldbahnStation') }}</li>
            <li>{{ t('transportWaldbahnFreq') }}</li>
            <li>{{ t('transportWaldbahnConnect') }}</li>
          </ul>
          <div class="transport-status">
            <span class="status-indicator status-indicator--active"></span>
            <span>{{ t('transportStatusActive') }}</span>
          </div>
          <button class="book-btn book-btn--outline">{{ t('transportSchedule') }}</button>
        </div>
      </div>

      <!-- CO2 Comparison -->
      <div class="co2-section">
        <h3>{{ t('transportCO2Title') }}</h3>
        <div class="co2-bars">
          <div class="co2-row">
            <span class="co2-label">🚌 Igelbus</span>
            <div class="co2-bar-track"><div class="co2-bar co2-bar--green" style="width: 15%"></div></div>
            <span class="co2-value">12g CO₂/km</span>
          </div>
          <div class="co2-row">
            <span class="co2-label">🚆 Waldbahn</span>
            <div class="co2-bar-track"><div class="co2-bar co2-bar--blue" style="width: 10%"></div></div>
            <span class="co2-value">8g CO₂/km</span>
          </div>
          <div class="co2-row">
            <span class="co2-label">🚗 Auto</span>
            <div class="co2-bar-track"><div class="co2-bar co2-bar--red" style="width: 80%"></div></div>
            <span class="co2-value">142g CO₂/km</span>
          </div>
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
  margin-bottom: var(--space-xs);
}

.page-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

/* Sustainability Banner */
.sustain-banner {
  display: flex;
  gap: var(--space-md);
  align-items: flex-start;
  background: linear-gradient(135deg, rgba(174,200,112,0.12), rgba(46,98,50,0.06));
  border: 1px solid rgba(174,200,112,0.2);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.sustain-icon { font-size: 32px; flex-shrink: 0; }
.sustain-content h3 { font-size: var(--font-size-md); font-weight: 700; color: var(--color-forest-700); margin-bottom: var(--space-xs); }
.sustain-content p { font-size: var(--font-size-sm); color: var(--color-text-muted); line-height: 1.6; }

/* Transport Grid */
.transport-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.transport-card {
  background: rgba(255,255,255,0.88);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.transport-card-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.transport-emoji { font-size: 36px; }

.transport-card-header h3 {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
}

.transport-tag {
  display: inline-block;
  font-size: 0.6rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.transport-tag--green { background: rgba(46,98,50,0.1); color: var(--color-forest-700); }
.transport-tag--blue { background: rgba(21,101,192,0.1); color: #1565c0; }

.transport-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: 1.5;
}

.transport-details {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.transport-details li {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  padding-left: 16px;
  position: relative;
}

.transport-details li::before {
  content: '•';
  position: absolute;
  left: 4px;
  color: var(--color-forest-400);
}

.transport-status {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-indicator--active {
  background: var(--color-online);
  box-shadow: 0 0 6px rgba(39,174,96,0.4);
  animation: pulse-dot 2s ease infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.book-btn {
  padding: 10px 20px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--color-forest-700);
  color: #fff;
  border: none;
  text-align: center;
}

.book-btn:hover {
  background: var(--color-forest-600);
  transform: translateY(-1px);
}

.book-btn--outline {
  background: transparent;
  color: var(--color-forest-700);
  border: 1.5px solid var(--color-forest-700);
}

.book-btn--outline:hover {
  background: rgba(46,98,50,0.06);
}

/* CO2 Section */
.co2-section {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
}

.co2-section h3 {
  font-size: var(--font-size-md);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-lg);
}

.co2-bars {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.co2-row {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.co2-label {
  width: 100px;
  font-size: var(--font-size-sm);
  font-weight: 600;
  flex-shrink: 0;
}

.co2-bar-track {
  flex: 1;
  height: 8px;
  background: rgba(0,0,0,0.04);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.co2-bar {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 1s ease;
}

.co2-bar--green { background: var(--color-forest-400); }
.co2-bar--blue { background: #1565c0; }
.co2-bar--red { background: var(--color-emergency); }

.co2-value {
  width: 90px;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  text-align: right;
  flex-shrink: 0;
}

@media (max-width: 700px) {
  .transport-grid { grid-template-columns: 1fr; }
}
</style>
