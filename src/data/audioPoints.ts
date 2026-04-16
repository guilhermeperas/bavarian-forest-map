/* ============================================
   Audio Trigger Points — key junctions & enclosures
   ============================================ */

import type { AudioPoint } from '@/types'

export const audioPoints: AudioPoint[] = [
  {
    id: 'audio-welcome',
    labelKey: 'audioWelcome',
    x: 200,
    y: 640,
    tracks: {
      de: '/audio/welcome_de.mp3',
      en: '/audio/welcome_en.mp3',
      cz: '/audio/welcome_cz.mp3',
    },
  },
  {
    id: 'audio-wolf',
    labelKey: 'animalWolf',
    x: 615,
    y: 265,
    tracks: {
      de: '/audio/wolf_de.mp3',
      en: '/audio/wolf_en.mp3',
      cz: '/audio/wolf_cz.mp3',
    },
  },
  {
    id: 'audio-luchs',
    labelKey: 'animalLuchs',
    x: 755,
    y: 405,
    tracks: {
      de: '/audio/luchs_de.mp3',
      en: '/audio/luchs_en.mp3',
      cz: '/audio/luchs_cz.mp3',
    },
  },
  {
    id: 'audio-baer',
    labelKey: 'animalBaer',
    x: 295,
    y: 445,
    tracks: {
      de: '/audio/baer_de.mp3',
      en: '/audio/baer_en.mp3',
      cz: '/audio/baer_cz.mp3',
    },
  },
  {
    id: 'audio-wisent',
    labelKey: 'animalWisent',
    x: 715,
    y: 445,
    tracks: {
      de: '/audio/wisent_de.mp3',
      en: '/audio/wisent_en.mp3',
      cz: '/audio/wisent_cz.mp3',
    },
  },
  {
    id: 'audio-junction-nord',
    labelKey: 'legendInfo',
    x: 480,
    y: 240,
    tracks: {
      de: '/audio/junction_nord_de.mp3',
      en: '/audio/junction_nord_en.mp3',
      cz: '/audio/junction_nord_cz.mp3',
    },
  },
  {
    id: 'audio-junction-sued',
    labelKey: 'legendInfo',
    x: 520,
    y: 580,
    tracks: {
      de: '/audio/junction_sued_de.mp3',
      en: '/audio/junction_sued_en.mp3',
      cz: '/audio/junction_sued_cz.mp3',
    },
  },
  {
    id: 'audio-fischotter',
    labelKey: 'animalFischotter',
    x: 495,
    y: 525,
    tracks: {
      de: '/audio/fischotter_de.mp3',
      en: '/audio/fischotter_en.mp3',
      cz: '/audio/fischotter_cz.mp3',
    },
  },
]
