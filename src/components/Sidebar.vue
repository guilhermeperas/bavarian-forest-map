<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
import type { Locale } from '@/types'

const { t, locale, setLocale } = useLocale()

const props = defineProps<{
  activePage: string
}>()

const emit = defineEmits<{
  navigate: [page: string]
}>()

const languages: { code: Locale; label: string }[] = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
  { code: 'cz', label: 'CZ' },
]

const navItems = [
  { id: 'map', icon: '🗺️', labelKey: 'sidebarMap' },
  { id: 'info', icon: 'ℹ️', labelKey: 'sidebarInfo' },
  { id: 'regulations', icon: '📋', labelKey: 'sidebarReg' },
  { id: 'safety', icon: '🚨', labelKey: 'sidebarSafety' },
  { id: 'transport', icon: '🚌', labelKey: 'sidebarTransport' },
]
</script>

<template>
  <aside class="sidebar">
    <!-- Brand -->
    <div class="sidebar-brand">
      <span class="brand-tree">🌲</span>
      <span class="brand-name">Wald<span class="brand-accent">Live</span></span>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <button
        v-for="item in navItems"
        :key="item.id"
        class="sidebar-item"
        :class="{ active: activePage === item.id }"
        @click="emit('navigate', item.id)"
        :id="`sidebar-${item.id}`"
      >
        <span class="sidebar-item-indicator"></span>
        <span class="sidebar-item-icon">{{ item.icon }}</span>
        <span class="sidebar-item-label">{{ t(item.labelKey) }}</span>
      </button>
    </nav>

    <!-- Spacer -->
    <div class="sidebar-spacer"></div>

    <!-- Language Toggle -->
    <div class="sidebar-lang">
      <button
        v-for="lang in languages"
        :key="lang.code"
        class="lang-btn"
        :class="{ active: locale === lang.code }"
        @click="setLocale(lang.code)"
        :id="`sidebar-lang-${lang.code}`"
      >{{ lang.label }}</button>
    </div>

    <!-- Footer -->
    <div class="sidebar-footer">
      <span class="footer-text">© 2024 Nationalpark<br>Bayerischer Wald</span>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 220px;
  min-width: 220px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: var(--z-navbar);
  display: flex;
  flex-direction: column;
  padding: var(--space-md) 0;

  /* Glassmorphism */
  background: rgba(28, 58, 30, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255,255,255,0.06);
  box-shadow: 4px 0 24px rgba(0,0,0,0.3);
}

/* Brand */
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-lg);
  margin-bottom: var(--space-lg);
}

.brand-tree {
  font-size: 24px;
}

.brand-name {
  font-family: var(--font-family);
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.01em;
}

.brand-accent {
  color: var(--color-gold);
}

/* Navigation */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 var(--space-sm);
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 10px 14px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: rgba(255,255,255,0.6);
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: transparent;
  position: relative;
  text-align: left;
  width: 100%;
}

.sidebar-item:hover {
  color: rgba(255,255,255,0.9);
  background: rgba(255,255,255,0.06);
}

.sidebar-item.active {
  color: #fff;
  background: rgba(255,255,255,0.1);
  font-weight: 600;
}

.sidebar-item-indicator {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: var(--color-gold);
  border-radius: 0 3px 3px 0;
  transition: height 0.2s ease;
}

.sidebar-item.active .sidebar-item-indicator {
  height: 20px;
}

.sidebar-item-icon {
  font-size: 16px;
  width: 22px;
  text-align: center;
  flex-shrink: 0;
}

.sidebar-item-label {
  white-space: nowrap;
}

/* Spacer */
.sidebar-spacer {
  flex: 1;
}

/* Language */
.sidebar-lang {
  display: flex;
  gap: 2px;
  padding: 0 var(--space-lg);
  margin-bottom: var(--space-md);
}

.lang-btn {
  flex: 1;
  padding: 6px 0;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: rgba(255,255,255,0.45);
  transition: all 0.15s ease;
  letter-spacing: 0.05em;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  text-align: center;
}

.lang-btn:hover {
  color: rgba(255,255,255,0.8);
  border-color: rgba(255,255,255,0.1);
}

.lang-btn.active {
  background: var(--color-gold);
  color: #1a1208;
  border-color: var(--color-gold);
}

/* Footer */
.sidebar-footer {
  padding: var(--space-sm) var(--space-lg);
  border-top: 1px solid rgba(255,255,255,0.06);
}

.footer-text {
  font-size: 0.6rem;
  color: rgba(255,255,255,0.3);
  line-height: 1.4;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    width: 60px;
    min-width: 60px;
  }
  .sidebar-item-label,
  .brand-name,
  .footer-text {
    display: none;
  }
  .sidebar-brand {
    justify-content: center;
    padding: var(--space-sm);
  }
  .sidebar-lang {
    flex-direction: column;
    padding: 0 var(--space-xs);
    margin-bottom: 32px;
  }
  .lang-btn {
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
