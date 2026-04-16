<script setup lang="ts">
import { ref } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { useConnectivity } from '@/composables/useConnectivity'
import { useTrafficSimulator } from '@/composables/useTrafficSimulator'
import SvgMap from './SvgMap.vue'
import DensityLegend from './DensityLegend.vue'
import AnimalOverlay from './AnimalOverlay.vue'
import AudioPlayer from './AudioPlayer.vue'
import type { AnimalData, AudioPoint } from '@/types'

const { t } = useLocale()
const { isOnline, connectionMode } = useConnectivity()
const { trafficData } = useTrafficSimulator(isOnline)

// Selected animal state
const selectedAnimal = ref<AnimalData | null>(null)

function onSelectAnimal(animal: AnimalData) {
  selectedAnimal.value = animal
}

function onCloseOverlay() {
  selectedAnimal.value = null
}

// Audio player ref
const audioPlayerRef = ref<InstanceType<typeof AudioPlayer> | null>(null)

function onPlayAudio(point: AudioPoint) {
  audioPlayerRef.value?.playTrack(point)
}

defineExpose({ connectionMode })
</script>

<template>
  <div class="map-module" id="map-module">
    <!-- Cached mode banner -->
    <Transition name="banner">
      <div v-if="!isOnline" class="cached-banner">
        <span class="cached-icon">📡</span>
        <span>{{ t('statusCached') }}</span>
      </div>
    </Transition>

    <!-- Map container -->
    <div class="map-container">
      <SvgMap
        :traffic-data="trafficData"
        :show-density="isOnline"
        @select-animal="onSelectAnimal"
        @play-audio="onPlayAudio"
      />

      <!-- Density Legend (only when online) -->
      <DensityLegend v-if="isOnline" />
    </div>

    <!-- Animal Overlay -->
    <AnimalOverlay
      v-if="selectedAnimal"
      :animal="selectedAnimal"
      @close="onCloseOverlay"
    />

    <!-- Audio Player -->
    <AudioPlayer ref="audioPlayerRef" />
  </div>
</template>

<style scoped>
.map-module {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cached-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-md);
  background: rgba(231, 76, 60, 0.1);
  border-bottom: 1px solid rgba(231, 76, 60, 0.2);
  font-size: var(--font-size-sm);
  color: var(--color-emergency);
  font-weight: var(--font-weight-medium);
}

.cached-icon {
  font-size: 14px;
}

.map-container {
  position: relative;
  flex: 1;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Banner Transition */
.banner-enter-active {
  animation: fade-in 0.3s ease;
}
.banner-leave-active {
  transition: opacity 0.2s ease, max-height 0.2s ease;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}
</style>
