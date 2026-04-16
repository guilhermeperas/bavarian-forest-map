<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'
import type { AudioPoint } from '@/types'

const { t, locale } = useLocale()

const currentTrack = ref<AudioPoint | null>(null)
const isPlaying = ref(false)
const progress = ref(0)
const duration = ref(0)
const audioError = ref(false)

let animFrame: number | null = null
let mockInterval: number | null = null

function playTrack(point: AudioPoint) {
  stopAudio()
  currentTrack.value = point
  audioError.value = false

  // MOCK AUDIO for prototype demonstration
  duration.value = 35 // Arbitrary 35 sec track
  progress.value = 0
  isPlaying.value = true
  
  if (mockInterval) clearInterval(mockInterval)
  mockInterval = window.setInterval(() => {
    if (isPlaying.value) {
      progress.value += 0.2
      if (progress.value >= duration.value) {
        progress.value = duration.value
        isPlaying.value = false
        clearInterval(mockInterval!)
      }
    }
  }, 200)
}

function togglePlay() {
  if (audioError.value) return
  isPlaying.value = !isPlaying.value
}

function stopAudio() {
  isPlaying.value = false
  progress.value = 0
  duration.value = 0
  if (mockInterval) {
    clearInterval(mockInterval)
    mockInterval = null
  }
}

function closePlayer() {
  stopAudio()
  currentTrack.value = null
  audioError.value = false
}

function trackProgress() {
  // no-op, handled by interval
}

function seekTo(e: MouseEvent) {
  if (!duration.value) return
  const bar = e.currentTarget as HTMLElement
  const rect = bar.getBoundingClientRect()
  const pct = (e.clientX - rect.left) / rect.width
  progress.value = pct * duration.value
}

function formatTime(s: number): string {
  const mins = Math.floor(s / 60)
  const secs = Math.floor(s % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Re-load track when locale changes
watch(locale, () => {
  if (currentTrack.value) {
    // Just mock continuing play
  }
})

onUnmounted(() => { stopAudio() })

// Expose playTrack for parent to call
defineExpose({ playTrack })
</script>

<template>
  <Transition name="player">
    <div v-if="currentTrack" class="audio-player glass-card">
      <!-- Track info -->
      <div class="player-info">
        <span class="player-icon">🔊</span>
        <div class="player-text">
          <span class="player-title">{{ t(currentTrack.labelKey) }}</span>
          <span v-if="audioError" class="player-error">{{ t('audioUnavailable') }}</span>
        </div>
      </div>

      <!-- Controls -->
      <div class="player-controls">
        <button
          class="play-btn"
          @click="togglePlay"
          :disabled="audioError"
          :aria-label="isPlaying ? t('audioPause') : t('audioPlay')"
        >
          <svg v-if="!isPlaying" width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            <path d="M4 2.5L15 9L4 15.5V2.5Z"/>
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            <rect x="4" y="3" width="3.5" height="12" rx="1"/>
            <rect x="10.5" y="3" width="3.5" height="12" rx="1"/>
          </svg>
        </button>
      </div>

      <!-- Progress bar -->
      <div class="player-progress" @click="seekTo">
        <div class="progress-track">
          <div
            class="progress-fill"
            :style="{ width: duration ? `${(progress / duration) * 100}%` : '0%' }"
          ></div>
        </div>
        <div class="progress-time">
          <span>{{ formatTime(progress) }}</span>
          <span>{{ formatTime(duration) }}</span>
        </div>
      </div>

      <!-- Close -->
      <button class="player-close" @click="closePlayer" aria-label="Close player">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.audio-player {
  position: absolute;
  bottom: var(--space-lg);
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--z-player);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-sm) var(--space-md);
  min-width: 400px;
  max-width: 90vw;
}

.player-info {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  flex-shrink: 0;
}

.player-icon {
  font-size: 18px;
}

.player-text {
  display: flex;
  flex-direction: column;
}

.player-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  white-space: nowrap;
}

.player-error {
  font-size: var(--font-size-xs);
  color: var(--color-emergency);
}

.player-controls {
  flex-shrink: 0;
}

.play-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: var(--color-accent);
  color: var(--color-text-inverse);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.play-btn:hover:not(:disabled) {
  background: var(--color-forest-300);
  transform: scale(1.08);
}

.play-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.player-progress {
  flex: 1;
  min-width: 100px;
  cursor: pointer;
}

.progress-track {
  height: 4px;
  background: var(--color-forest-700);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-accent);
  border-radius: var(--radius-full);
  transition: width 0.1s linear;
}

.progress-time {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--color-text-muted);
  margin-top: 2px;
}

.player-close {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.player-close:hover {
  background: var(--color-forest-700);
  color: var(--color-text-primary);
}

/* Transition */
.player-enter-active {
  animation: fade-in 0.3s ease;
}
.player-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

@media (max-width: 500px) {
  .audio-player {
    min-width: auto;
    width: calc(100% - var(--space-xl));
    flex-wrap: wrap;
  }
}
</style>
