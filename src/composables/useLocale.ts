/* ============================================
   useLocale — Trilingual State (DE / EN / CZ)
   ============================================ */

import { ref, provide, inject, computed } from 'vue'
import type { Locale } from '@/types'
import { strings } from '@/data/strings'

const LOCALE_KEY = Symbol('locale')

export interface LocaleContext {
  locale: ReturnType<typeof ref<Locale>>
  setLocale: (l: Locale) => void
  t: (key: string) => string
}

export function createLocale(): LocaleContext {
  const locale = ref<Locale>('de')

  function setLocale(l: Locale) {
    locale.value = l
    document.documentElement.lang = l === 'cz' ? 'cs' : l
  }

  function t(key: string): string {
    return strings[locale.value]?.[key] ?? key
  }

  const ctx: LocaleContext = { locale, setLocale, t }
  return ctx
}

export function provideLocale(ctx: LocaleContext) {
  provide(LOCALE_KEY, ctx)
}

export function useLocale(): LocaleContext {
  const ctx = inject<LocaleContext>(LOCALE_KEY)
  if (!ctx) throw new Error('useLocale() called without provideLocale()')
  return ctx
}
