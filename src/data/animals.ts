/* ============================================
   Animal POI Data — accurately positioned from
   the official Nationalpark Bayerischer Wald
   Tier-Freigelände park map
   ViewBox: 0 0 960 750
   ============================================ */

import type { AnimalData } from '@/types'

export const animals: AnimalData[] = [
  // ── Upper-Left Area ──
  {
    id: 'fischotter',
    nameKey: 'animalFischotter',
    descriptionKey: 'animalFischotterDesc',
    icon: '🦦',
    x: 148,
    y: 148,
    audioId: 'audio-fischotter',
  },
  {
    id: 'rothirsch',
    nameKey: 'animalRothirsch',
    descriptionKey: 'animalRothirschDesc',
    icon: '🦌',
    x: 192,
    y: 222,
    audioId: 'audio-rothirsch',
  },

  // ── Left Area ──
  {
    id: 'uhu',
    nameKey: 'animalUhu',
    descriptionKey: 'animalUhuDesc',
    icon: '🦉',
    x: 158,
    y: 334,
    audioId: 'audio-uhu',
  },

  // ── Upper-Center-Left ──
  {
    id: 'wildschwein',
    nameKey: 'animalWildschwein',
    descriptionKey: 'animalWildschweinDesc',
    icon: '🐗',
    x: 330,
    y: 240,
    audioId: 'audio-wildschwein',
  },

  // ── Center-Left ──
  {
    id: 'baer',
    nameKey: 'animalBaer',
    descriptionKey: 'animalBaerDesc',
    icon: '🐻',
    x: 266,
    y: 390,
    audioId: 'audio-baer',
  },

  // ── Upper-Center ──
  {
    id: 'wildkatze',
    nameKey: 'animalWildkatze',
    descriptionKey: 'animalWildkatzeDesc',
    icon: '🐈',
    x: 470,
    y: 245,
    audioId: 'audio-wildkatze',
  },

  // ── Center ──
  {
    id: 'waldvogel',
    nameKey: 'animalWaldvogel',
    descriptionKey: 'animalWaldvogelDesc',
    icon: '🦅',
    x: 400,
    y: 310,
    audioId: 'audio-waldvogel',
  },
  {
    id: 'elch',
    nameKey: 'animalElch',
    descriptionKey: 'animalElchDesc',
    icon: '🫎',
    x: 508,
    y: 355,
    audioId: 'audio-elch',
  },

  // ── Upper-Center-Right ──
  {
    id: 'wolf',
    nameKey: 'animalWolf',
    descriptionKey: 'animalWolfDesc',
    icon: '🐺',
    x: 604,
    y: 250,
    audioId: 'audio-wolf',
  },

  // ── Center-Lower Cluster ──
  {
    id: 'marder',
    nameKey: 'animalMarder',
    descriptionKey: 'animalMarderDesc',
    icon: '🦡',
    x: 430,
    y: 432,
    audioId: 'audio-marder',
  },
  {
    id: 'biber',
    nameKey: 'animalBiber',
    descriptionKey: 'animalBiberDesc',
    icon: '🦫',
    x: 420,
    y: 472,
    audioId: 'audio-biber',
  },
  {
    id: 'kolkrabe',
    nameKey: 'animalKolkrabe',
    descriptionKey: 'animalKolkrabeDesc',
    icon: '🐦‍⬛',
    x: 408,
    y: 512,
    audioId: 'audio-kolkrabe',
  },
  {
    id: 'raufusshuhn',
    nameKey: 'animalRaufusshuhn',
    descriptionKey: 'animalRaufusshuhnDesc',
    icon: '🐓',
    x: 393,
    y: 550,
    audioId: 'audio-raufusshuhn',
  },

  // ── East Side (Lynx, Wisent, Eagle Owl) ──
  {
    id: 'wisent',
    nameKey: 'animalWisent',
    descriptionKey: 'animalWisentDesc',
    icon: '🦬',
    x: 662,
    y: 440,
    audioId: 'audio-wisent',
  },
  {
    id: 'luchs',
    nameKey: 'animalLuchs',
    descriptionKey: 'animalLuchsDesc',
    icon: '🐱',
    x: 724,
    y: 470,
    audioId: 'audio-luchs',
  },
  {
    id: 'habicht',
    nameKey: 'animalHabicht',
    descriptionKey: 'animalHabichtDesc',
    icon: '🦉',
    x: 804,
    y: 448,
    audioId: 'audio-habicht',
  },
  {
    id: 'waldrandvogel',
    nameKey: 'animalWaldrandvogel',
    descriptionKey: 'animalWaldrandvogelDesc',
    icon: '🐦',
    x: 690,
    y: 532,
    audioId: 'audio-waldrandvogel',
  },
]
