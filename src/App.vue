<script setup lang="ts">
import { provide, ref } from 'vue'
import { createLocale, provideLocale } from '@/composables/useLocale'
import { useConnectivity } from '@/composables/useConnectivity'
import Sidebar from '@/components/Sidebar.vue'
import MapModule from '@/components/MapModule.vue'
import InfoPage from '@/components/pages/InfoPage.vue'
import RegulationsPage from '@/components/pages/RegulationsPage.vue'
import SafetyPage from '@/components/pages/SafetyPage.vue'
import TransportPage from '@/components/pages/TransportPage.vue'

// Create and provide locale at root
const localeCtx = createLocale()
provideLocale(localeCtx)
const { t } = localeCtx

// Connectivity
const { connectionMode } = useConnectivity()

// Page navigation state
const activePage = ref<string>('map')

// Legacy panel state (keep for compatibility)
const activePanel = ref<string | null>(null)
provide('activePanel', activePanel)

function navigateTo(page: string) {
  activePage.value = page
  activePanel.value = null
}
</script>

<template>
  <div class="app-root">
    <!-- Sidebar Navigation -->
    <Sidebar
      :active-page="activePage"
      @navigate="navigateTo"
    />

    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Map View (default) -->
      <template v-if="activePage === 'map'">
        <div class="map-viewport">
          <MapModule class="full-map" />

          <!-- Floating Dashboard Widgets -->
          <div class="floating-widgets">
            <!-- Stats Widget -->
            <div class="widget widget-stats">
              <div class="widget-header">
                <span class="widget-title">{{ t('dashStats') }}</span>
              </div>
              <div class="widget-stats-grid">
                <div class="widget-stat">
                  <span class="widget-stat-label">{{ t('dashRealtime') }}</span>
                  <span class="widget-stat-value">4,892</span>
                </div>
                <div class="widget-stat">
                  <span class="widget-stat-label">{{ t('dashUnit') }}</span>
                  <span class="widget-stat-value widget-stat-accent">134</span>
                </div>
              </div>
              <div class="widget-popular">
                <div class="widget-popular-item" v-for="i in 4" :key="i">
                  <span>{{ t(`dashTop${i}`) }}</span>
                  <span class="widget-popular-num">{{ [2884, 1358, 736, 260][i-1] }}</span>
                </div>
              </div>
            </div>

            <!-- Weather Widget -->
            <div class="widget widget-weather">
              <div class="widget-header">
                <span class="widget-title">{{ t('dashWarnings') }}</span>
                <span class="widget-warn-icon">⚠️</span>
              </div>
              <div class="widget-warn-body">
                <strong>{{ t('dashWarnTitle') }}</strong>
                <p>{{ t('dashWarnDesc') }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Content Pages -->
      <template v-else>
        <div class="page-viewport">
          <InfoPage v-if="activePage === 'info'" @back="navigateTo('map')" />
          <RegulationsPage v-if="activePage === 'regulations'" @back="navigateTo('map')" />
          <SafetyPage v-if="activePage === 'safety'" @back="navigateTo('map')" />
          <TransportPage v-if="activePage === 'transport'" @back="navigateTo('map')" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* ── Root Layout ── */
.app-root {
  display: flex;
  min-height: 100vh;
  background: var(--color-bg-primary);
}

/* ── Main Content (offset by sidebar width) ── */
.main-content {
  flex: 1;
  margin-left: 220px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ── Map Viewport ── */
.map-viewport {
  flex: 1;
  position: relative;
  display: flex;
  overflow: hidden;
}

.full-map {
  flex: 1;
  min-height: 0;
  width: 100%;
  height: 100vh;
}

/* ── Floating Dashboard Widgets ── */
.floating-widgets {
  position: absolute;
  top: var(--space-lg);
  left: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  z-index: var(--z-overlay);
  pointer-events: none;
  max-width: 260px;
}

.widget {
  pointer-events: auto;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.widget:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
}

.widget-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-sm);
  padding-bottom: var(--space-xs);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.widget-title {
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Stats Widget */
.widget-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.widget-stat-label {
  font-size: 0.6rem;
  color: var(--color-text-muted);
  font-weight: 600;
  display: block;
}

.widget-stat-value {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--color-text-primary);
  line-height: 1.1;
}

.widget-stat-accent {
  color: var(--color-forest-500);
}

.widget-popular {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.widget-popular-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: var(--color-text-secondary);
  padding: 3px 6px;
  border-radius: 4px;
}

.widget-popular-item:nth-child(2) {
  background: rgba(0, 0, 0, 0.03);
  font-weight: 700;
}

.widget-popular-num {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

/* Weather Widget */
.widget-warn-icon {
  font-size: 14px;
}

.widget-warn-body {
  background: rgba(200, 160, 48, 0.08);
  border: 1px solid rgba(200, 160, 48, 0.2);
  border-radius: var(--radius-sm);
  padding: var(--space-sm);
}

.widget-warn-body strong {
  font-size: 0.7rem;
  color: #8c6008;
  display: block;
  margin-bottom: 4px;
}

.widget-warn-body p {
  font-size: 0.6rem;
  color: #8c6008;
  line-height: 1.4;
}

/* ── Page Viewport ── */
.page-viewport {
  flex: 1;
  overflow-y: auto;
  background: var(--color-bg-primary);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .main-content {
    margin-left: 60px;
  }

  .floating-widgets {
    display: none;
  }

  .widget {
    padding: var(--space-sm);
  }
}
</style>
