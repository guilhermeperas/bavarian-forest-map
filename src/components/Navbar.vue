<script setup lang="ts">
import { inject, type Ref } from 'vue'
import { useLocale } from '@/composables/useLocale'
import StatusBadge from './StatusBadge.vue'
import type { ConnectionMode, Locale } from '@/types'

const props = defineProps<{
  connectionMode: ConnectionMode
}>()

const { t, locale, setLocale } = useLocale()

// Shared state provided by App.vue — sidebar buttons can open panels too
const activePanel = inject<Ref<string | null>>('activePanel')!

const languages: { code: Locale; label: string }[] = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
  { code: 'cz', label: 'CZ' },
]

function togglePanel(panel: string) {
  activePanel.value = activePanel.value === panel ? null : panel
}

const regulations = [
  'regTrails', 'regDogs', 'regFeeding', 'regNoise',
  'regWaste', 'regBikes', 'regPhotos', 'regKfz',
]
</script>

<template>
  <nav class="navbar" id="main-navbar">
    <div class="navbar-inner">
      <!-- Brand -->
      <div class="nav-brand">
        <span class="brand-icon">🌲</span>
        <div class="brand-text">
          <span class="brand-title">
            Nationalpark Bayerischer Wald
            <span class="brand-title-accent">| WaldLive</span>
          </span>
          <span class="brand-sub">Tier-Freigelände Navigation</span>
        </div>
      </div>

      <!-- Nav Items -->
      <div class="nav-items">
        <button class="nav-btn" :class="{ active: activePanel === 'info' }"
          @click="togglePanel('info')" id="nav-info">
          <span class="nav-btn-icon">ℹ️</span>
          <span class="nav-btn-label">{{ t('navInfo') }}</span>
        </button>
        <button class="nav-btn" :class="{ active: activePanel === 'regulation' }"
          @click="togglePanel('regulation')" id="nav-regulation">
          <span class="nav-btn-icon">📋</span>
          <span class="nav-btn-label">{{ t('navRegulation') }}</span>
        </button>
        <button class="nav-btn" :class="{ active: activePanel === 'safety' }"
          @click="togglePanel('safety')" id="nav-safety">
          <span class="nav-btn-icon">🚨</span>
          <span class="nav-btn-label">{{ t('navSafety') }}</span>
        </button>

        <div class="lang-selector">
          <button
            v-for="lang in languages" :key="lang.code"
            class="lang-btn" :class="{ active: locale === lang.code }"
            @click="setLocale(lang.code)" :id="`lang-${lang.code}`"
          >{{ lang.label }}</button>
        </div>
      </div>
    </div>

    <!-- Info Panel -->
    <Transition name="panel">
      <div v-if="activePanel === 'info'" class="nav-panel" id="panel-info">
        <div class="panel-content">
          <h3 class="panel-title">{{ t('infoTitle') }}</h3>
          <p class="panel-desc">{{ t('infoDesc') }}</p>
          <div class="panel-grid">
            <div class="panel-card">
              <span class="panel-card-icon">🕐</span>
              <strong>{{ t('infoHours') }}</strong>
              <span>{{ t('infoHoursSummer') }}</span>
              <span>{{ t('infoHoursWinter') }}</span>
            </div>
            <div class="panel-card">
              <span class="panel-card-icon">🎫</span>
              <strong>{{ t('infoFree') }}</strong>
              <span>{{ t('infoLength') }}</span>
            </div>
            
            <!-- Sustainable Transport Card -->
            <div class="panel-card full-width">
              <span class="panel-card-icon" style="color: #aec870;">🍃</span>
              <strong>{{ t('infoTransportTitle') }}</strong>
              <span style="margin-top: 4px; line-height: 1.5; opacity: 0.9;">{{ t('infoTransportDesc') }}</span>
              <div class="transport-icons" style="margin-top: 12px; display: flex; gap: 12px; font-size: 20px;">
                <span title="Bus">🚌</span>
                <span title="Train">🚆</span>
                <span title="Bicycle">🚲</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Regulation Panel -->
    <Transition name="panel">
      <div v-if="activePanel === 'regulation'" class="nav-panel" id="panel-regulation">
        <div class="panel-content">
          <h3 class="panel-title">{{ t('regTitle') }}</h3>
          <ul class="reg-list">
            <li v-for="(reg, i) in regulations" :key="reg" class="reg-item">
              <span class="reg-num">{{ i + 1 }}</span>
              <span>{{ t(reg) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </Transition>

    <!-- Safety Panel -->
    <Transition name="panel">
      <div v-if="activePanel === 'safety'" class="nav-panel" id="panel-safety">
        <div class="panel-content">
          <h3 class="panel-title">{{ t('safetyTitle') }}</h3>
          <div class="safety-grid">
            <a href="tel:112" class="emergency-btn">
              <span class="emergency-icon">🚨</span>
              <span class="emergency-label">{{ t('safetyEmergency') }}</span>
              <span class="emergency-num">{{ t('safetyEmergencyNum') }}</span>
            </a>
            <a href="tel:+49855896150" class="ranger-btn">
              <span class="ranger-icon">🌲</span>
              <span class="ranger-label">{{ t('safetyParkRanger') }}</span>
              <span class="ranger-num">{{ t('safetyParkRangerNum') }}</span>
            </a>
          </div>
          <div class="park-status-row">
            <span class="park-status-dot open"></span>
            <span>{{ t('safetyParkOpen') }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: var(--z-navbar);
  background: var(--color-navbar-bg);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px var(--space-lg);
  gap: var(--space-md);
}

/* Brand */
.nav-brand {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-shrink: 0;
}
.brand-icon { font-size: 22px; }
.brand-text { display: flex; flex-direction: column; line-height: 1.15; }
.brand-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-on-dark);
  letter-spacing: 0.01em;
}
.brand-title-accent {
  color: var(--color-gold);
  font-weight: 700;
}
.brand-sub {
  font-size: 0.62rem;
  color: var(--color-text-on-dark-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* Nav Items */
.nav-items {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-wrap: wrap;
}
.nav-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 13px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-on-dark-muted);
  transition: all var(--transition-fast);
  background: transparent;
  border: none;
  cursor: pointer;
}
.nav-btn:hover { background: rgba(255,255,255,0.1); color: var(--color-text-on-dark); }
.nav-btn.active { background: rgba(255,255,255,0.14); color: var(--color-text-on-dark); }
.nav-btn-icon { font-size: 13px; }
.nav-btn-label { white-space: nowrap; }

/* Language Selector */
.lang-selector {
  display: flex;
  gap: 2px;
  background: rgba(0,0,0,0.3);
  border-radius: var(--radius-md);
  padding: 2px;
  margin-left: var(--space-xs);
}
.lang-btn {
  padding: 4px 9px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--color-text-on-dark-muted);
  transition: all var(--transition-fast);
  letter-spacing: 0.05em;
  background: transparent;
  border: none;
  cursor: pointer;
}
.lang-btn:hover { color: var(--color-text-on-dark); }
.lang-btn.active { background: var(--color-gold); color: #1a1208; }

/* Panels */
.nav-panel { background: var(--color-bg-secondary); border-top: 1px solid var(--color-border); overflow: hidden; }
.panel-content { padding: var(--space-lg) var(--space-xl); max-width: 960px; }
.panel-title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-md);
}
.panel-desc { color: var(--color-text-muted); line-height: var(--line-height-relaxed); margin-bottom: var(--space-lg); font-size: var(--font-size-sm); }
.panel-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-md); }
.panel-card {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-2xs);
  border: 1px solid var(--color-border);
}
.panel-card-icon { font-size: 20px; margin-bottom: 2px; }
.panel-card strong { font-size: var(--font-size-sm); color: var(--color-text-primary); }
.panel-card span { font-size: var(--font-size-xs); color: var(--color-text-muted); }

/* Regs */
.reg-list { display: flex; flex-direction: column; gap: var(--space-xs); }
.reg-item {
  display: flex; align-items: flex-start; gap: var(--space-sm);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  transition: background var(--transition-fast);
}
.reg-item:hover { background: var(--color-surface); }
.reg-num {
  width: 22px; height: 22px;
  border-radius: var(--radius-full);
  background: var(--color-forest-100);
  color: var(--color-accent);
  font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

/* Safety */
.safety-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-bottom: var(--space-lg); }
.emergency-btn, .ranger-btn {
  display: flex; flex-direction: column; align-items: center;
  gap: var(--space-xs); padding: var(--space-lg);
  border-radius: var(--radius-lg); text-align: center;
  transition: all var(--transition-base); text-decoration: none;
}
.emergency-btn { background: rgba(181,32,32,0.08); border: 1px solid rgba(181,32,32,0.25); color: var(--color-emergency); }
.emergency-btn:hover { background: rgba(181,32,32,0.14); transform: scale(1.02); }
.ranger-btn { background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary); }
.ranger-btn:hover { border-color: var(--color-border-hover); transform: scale(1.02); }
.emergency-icon, .ranger-icon { font-size: 26px; }
.emergency-label, .ranger-label { font-size: var(--font-size-sm); font-weight: 600; }
.emergency-num, .ranger-num { font-size: var(--font-size-lg); font-weight: 700; }

.park-status-row { display: flex; align-items: center; gap: var(--space-xs); font-size: var(--font-size-sm); color: var(--color-text-secondary); }
.park-status-dot { width: 8px; height: 8px; border-radius: 50%; }
.park-status-dot.open { background: var(--color-online); }

/* Transitions */
.panel-enter-active { animation: panel-slide-down 0.3s ease; }
.panel-leave-active { animation: panel-slide-up 0.2s ease forwards; }
@keyframes panel-slide-down { from { max-height: 0; opacity: 0; } to { max-height: 500px; opacity: 1; } }
@keyframes panel-slide-up { from { max-height: 500px; opacity: 1; } to { max-height: 0; opacity: 0; } }

@media (max-width: 700px) {
  .navbar-inner { flex-direction: column; align-items: flex-start; }
  .nav-items { width: 100%; justify-content: flex-start; }
  .nav-btn-label { display: none; }
  .safety-grid { grid-template-columns: 1fr; }
}
</style>
