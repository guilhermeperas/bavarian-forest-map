<script setup lang="ts">
import TrailSegment from './TrailSegment.vue'
import AnimalPoi from './AnimalPoi.vue'
import AudioTrigger from './AudioTrigger.vue'
import StandortMarker from './StandortMarker.vue'
import { trails } from '@/data/trails'
import { animals } from '@/data/animals'
import { audioPoints } from '@/data/audioPoints'
import type { AnimalData, AudioPoint, TrafficData } from '@/types'

const props = defineProps<{
  trafficData: TrafficData
  showDensity: boolean
}>()

const emit = defineEmits<{
  selectAnimal: [animal: AnimalData]
  playAudio: [point: AudioPoint]
}>()
</script>

<template>
  <svg
    class="svg-map"
    viewBox="0 0 960 750"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    role="img"
    aria-label="Tier-Freigelände Map"
  >
    <defs>
      <!-- Clip path for park boundary -->
      <clipPath id="park-clip">
        <path d="M 95,320
          C 90,285 92,248 98,210 C 104,175 118,145 140,120
          C 162,95 192,80 228,70 C 264,60 308,56 356,58
          C 404,60 454,68 502,82 C 540,94 572,110 600,132
          C 622,150 640,172 648,198 C 656,224 652,252 638,274
          C 660,264 688,248 720,232 C 752,216 780,196 804,172
          C 828,148 846,130 858,140 C 870,150 878,172 882,200
          C 886,228 888,262 886,300 C 884,338 878,378 866,418
          C 854,458 836,494 812,526 C 788,558 766,586 748,612
          C 730,638 718,660 708,678 C 698,696 678,712 648,722
          C 618,732 584,736 548,734 C 512,732 476,726 440,718
          C 404,710 370,698 338,684 C 306,670 276,652 250,632
          C 224,612 202,588 184,560 C 166,532 152,502 142,470
          C 132,438 126,408 122,380 C 118,352 112,338 95,320 Z" />
      </clipPath>

      <!-- Tree canopy pattern (subtle) -->
      <pattern id="pat-trees" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="7" cy="7" r="4.5" fill="rgba(35,65,18,0.06)" />
        <circle cx="21" cy="21" r="4" fill="rgba(35,65,18,0.05)" />
        <circle cx="20" cy="6" r="3" fill="rgba(35,65,18,0.04)" />
        <circle cx="5" cy="20" r="3.5" fill="rgba(35,65,18,0.04)" />
      </pattern>

      <!-- Dense forest pattern -->
      <pattern id="pat-forest" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="5" fill="rgba(28,56,14,0.09)" />
        <circle cx="15" cy="14" r="4.5" fill="rgba(28,56,14,0.07)" />
        <circle cx="10" cy="18" r="3.5" fill="rgba(28,56,14,0.05)" />
      </pattern>

      <!-- Wetland hatch -->
      <pattern id="pat-wetland" x="0" y="0" width="24" height="12" patternUnits="userSpaceOnUse">
        <path d="M 0,6 Q 6,3 12,6 Q 18,9 24,6" fill="none" stroke="rgba(50,110,130,0.10)" stroke-width="0.8" />
      </pattern>

      <!-- Meadow stipple -->
      <pattern id="pat-meadow" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="1" fill="rgba(90,130,35,0.08)" />
        <circle cx="14" cy="11" r="0.8" fill="rgba(90,130,35,0.06)" />
        <circle cx="9" cy="16" r="0.9" fill="rgba(90,130,35,0.07)" />
      </pattern>

      <!-- Contour lines on background -->
      <pattern id="pat-contour" x="0" y="0" width="80" height="36" patternUnits="userSpaceOnUse">
        <path d="M 0,18 Q 20,12 40,18 Q 60,24 80,18" fill="none" stroke="rgba(70,55,30,0.035)" stroke-width="0.6" />
      </pattern>

      <!-- Marker shadow -->
      <filter id="shadow-sm" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="rgba(0,0,0,0.18)" />
      </filter>
    </defs>

    <!-- ═══════════ BACKGROUND ═══════════ -->
    <rect width="960" height="750" fill="#eae6de" />
    <rect width="960" height="750" fill="url(#pat-contour)" />

    <!-- ═══════════ ROADS (rendered below park fill) ═══════════ -->

    <!-- Nationalparkstraße — casing (outline) -->
    <path class="road-casing"
      d="M 10,718 C 70,726 150,732 220,716 C 290,700 340,712 400,700
         C 460,688 490,704 540,694 C 590,684 640,692 700,682
         C 760,672 810,664 870,658 C 920,654 950,660 960,656"
    />
    <!-- Nationalparkstraße — fill -->
    <path class="road-fill"
      d="M 10,718 C 70,726 150,732 220,716 C 290,700 340,712 400,700
         C 460,688 490,704 540,694 C 590,684 640,692 700,682
         C 760,672 810,664 870,658 C 920,654 950,660 960,656"
    />

    <!-- Eastern road toward Waldhäuser — casing -->
    <path class="road-casing"
      d="M 870,658 C 878,600 886,530 890,448 C 894,366 890,284 884,208
         C 880,156 876,112 874,76 L 876,10"
    />
    <!-- Eastern road toward Waldhäuser — fill -->
    <path class="road-fill"
      d="M 870,658 C 878,600 886,530 890,448 C 894,366 890,284 884,208
         C 880,156 876,112 874,76 L 876,10"
    />

    <!-- Western access road toward Neuschönau — casing -->
    <path class="road-casing-minor"
      d="M 10,718 C 32,665 52,608 60,545 C 68,482 64,424 58,374
         C 52,326 48,284 50,244"
    />
    <!-- Western access road — fill -->
    <path class="road-fill-minor"
      d="M 10,718 C 32,665 52,608 60,545 C 68,482 64,424 58,374
         C 52,326 48,284 50,244"
    />

    <!-- ═══════════ PARK TERRAIN BASE ═══════════ -->
    <path
      d="M 95,320
        C 90,285 92,248 98,210 C 104,175 118,145 140,120
        C 162,95 192,80 228,70 C 264,60 308,56 356,58
        C 404,60 454,68 502,82 C 540,94 572,110 600,132
        C 622,150 640,172 648,198 C 656,224 652,252 638,274
        C 660,264 688,248 720,232 C 752,216 780,196 804,172
        C 828,148 846,130 858,140 C 870,150 878,172 882,200
        C 886,228 888,262 886,300 C 884,338 878,378 866,418
        C 854,458 836,494 812,526 C 788,558 766,586 748,612
        C 730,638 718,660 708,678 C 698,696 678,712 648,722
        C 618,732 584,736 548,734 C 512,732 476,726 440,718
        C 404,710 370,698 338,684 C 306,670 276,652 250,632
        C 224,612 202,588 184,560 C 166,532 152,502 142,470
        C 132,438 126,408 122,380 C 118,352 112,338 95,320 Z"
      fill="#b8cc88"
    />

    <!-- Global tree texture clipped to park -->
    <rect clip-path="url(#park-clip)" width="960" height="750" fill="url(#pat-trees)" />

    <!-- ═══════════ TERRAIN ZONES ═══════════ -->

    <!-- Northern forest (dense — Otter / Red Deer sector) -->
    <path clip-path="url(#park-clip)"
      d="M 128,138 C 158,108 200,86 252,72 C 316,56 386,62 444,80
         C 484,92 516,108 542,128 C 566,148 582,172 576,200
         C 568,234 544,256 504,268 C 466,282 414,278 360,262
         C 308,246 264,226 228,204 C 192,182 162,158 144,142 Z"
      fill="#8faa58" opacity="0.45"
    />
    <path clip-path="url(#park-clip)"
      d="M 128,138 C 158,108 200,86 252,72 C 316,56 386,62 444,80
         C 484,92 516,108 542,128 C 566,148 582,172 576,200
         C 568,234 544,256 504,268 C 466,282 414,278 360,262
         C 308,246 264,226 228,204 C 192,182 162,158 144,142 Z"
      fill="url(#pat-forest)"
    />

    <!-- Northwestern wetland (Otter habitat) -->
    <path clip-path="url(#park-clip)"
      d="M 112,174 C 120,142 144,120 178,110 C 212,100 248,106 274,122
         C 294,134 306,156 304,182 C 302,208 286,230 262,244
         C 238,258 210,262 184,252 C 158,242 136,224 122,204
         C 112,190 108,182 112,174 Z"
      fill="#9bc4a2" opacity="0.40"
    />
    <path clip-path="url(#park-clip)"
      d="M 112,174 C 120,142 144,120 178,110 C 212,100 248,106 274,122
         C 294,134 306,156 304,182 C 302,208 286,230 262,244
         C 238,258 210,262 184,252 C 158,242 136,224 122,204
         C 112,190 108,182 112,174 Z"
      fill="url(#pat-wetland)"
    />

    <!-- Small pond near otter -->
    <path
      d="M 152,176 C 160,164 178,160 194,166 C 210,172 218,186 212,200
         C 206,214 190,220 174,214 C 158,208 150,194 152,176 Z"
      fill="#7eb4be" opacity="0.35"
    />

    <!-- Eastern forest (Wisent / Lynx sector) -->
    <path clip-path="url(#park-clip)"
      d="M 624,316 C 658,294 698,284 738,298 C 778,312 808,340 826,378
         C 844,416 850,460 842,502 C 834,544 814,576 782,600
         C 750,624 714,634 678,624 C 642,614 614,594 598,564
         C 582,534 580,496 590,460 C 600,424 616,382 628,348 Z"
      fill="#8faa58" opacity="0.40"
    />
    <path clip-path="url(#park-clip)"
      d="M 624,316 C 658,294 698,284 738,298 C 778,312 808,340 826,378
         C 844,416 850,460 842,502 C 834,544 814,576 782,600
         C 750,624 714,634 678,624 C 642,614 614,594 598,564
         C 582,534 580,496 590,460 C 600,424 616,382 628,348 Z"
      fill="url(#pat-forest)"
    />

    <!-- Central-west forest (Bear / Eagle Owl area) -->
    <path clip-path="url(#park-clip)"
      d="M 182,306 C 216,282 260,274 300,282 C 340,290 372,312 390,344
         C 408,376 410,414 396,448 C 382,482 354,504 320,512
         C 286,520 252,514 226,494 C 200,474 184,446 178,414
         C 172,382 174,348 182,306 Z"
      fill="#8faa58" opacity="0.32"
    />
    <path clip-path="url(#park-clip)"
      d="M 182,306 C 216,282 260,274 300,282 C 340,290 372,312 390,344
         C 408,376 410,414 396,448 C 382,482 354,504 320,512
         C 286,520 252,514 226,494 C 200,474 184,446 178,414
         C 172,382 174,348 182,306 Z"
      fill="url(#pat-trees)"
    />

    <!-- Central meadow / clearing -->
    <path clip-path="url(#park-clip)"
      d="M 366,384 C 398,368 440,362 480,368 C 520,374 556,392 576,418
         C 596,444 600,476 586,504 C 572,532 546,552 512,558
         C 478,564 442,560 410,546 C 378,532 356,508 346,478
         C 336,448 346,414 366,384 Z"
      fill="#c6dc96" opacity="0.32"
    />
    <path clip-path="url(#park-clip)"
      d="M 366,384 C 398,368 440,362 480,368 C 520,374 556,392 576,418
         C 596,444 600,476 586,504 C 572,532 546,552 512,558
         C 478,564 442,560 410,546 C 378,532 356,508 346,478
         C 336,448 346,414 366,384 Z"
      fill="url(#pat-meadow)"
    />

    <!-- Southern entrance / developed zone -->
    <path clip-path="url(#park-clip)"
      d="M 386,670 C 418,658 458,650 498,648 C 538,646 578,652 618,664
         C 648,674 666,688 670,706 C 674,724 658,734 632,738
         C 596,744 548,746 500,744 C 452,742 412,736 392,726
         C 372,716 368,698 386,670 Z"
      fill="#d6ceb4" opacity="0.45"
    />

    <!-- ═══════════ ENCLOSURE BOUNDARIES ═══════════ -->

    <!-- Otter enclosure -->
    <path class="enclosure-fence"
      d="M 122,128 C 140,112 168,102 200,108 C 232,114 252,136 256,162
         C 260,188 248,212 228,228 C 208,244 180,248 156,238
         C 132,228 116,206 114,178 C 112,150 116,136 122,128 Z"
    />

    <!-- Red Deer enclosure -->
    <path class="enclosure-fence"
      d="M 148,200 C 176,182 212,174 246,186 C 270,196 286,218 284,248
         C 282,278 264,300 236,310 C 208,320 178,316 158,298
         C 138,280 130,254 136,230 C 142,214 144,206 148,200 Z"
    />

    <!-- Wild Boar enclosure -->
    <path class="enclosure-fence"
      d="M 294,206 C 326,192 366,196 392,216 C 410,230 416,254 406,274
         C 396,294 376,308 350,310 C 324,312 300,302 286,284
         C 272,266 272,240 282,220 Z"
    />

    <!-- Wildcat & Forest Birds enclosure -->
    <path class="enclosure-fence"
      d="M 370,208 C 400,194 440,196 470,214 C 496,230 510,260 502,290
         C 494,320 472,340 444,346 C 416,352 386,342 366,322
         C 346,302 342,272 350,244 C 356,224 362,214 370,208 Z"
    />

    <!-- Wolf enclosure -->
    <path class="enclosure-fence"
      d="M 562,214 C 596,200 636,208 660,232 C 678,252 684,282 670,308
         C 656,334 632,350 604,348 C 576,346 552,330 540,306
         C 528,282 534,248 550,224 Z"
    />

    <!-- Bear enclosure -->
    <path class="enclosure-fence"
      d="M 222,354 C 256,336 298,334 330,352 C 354,366 366,394 360,424
         C 354,454 334,476 306,484 C 278,492 250,484 230,464
         C 210,444 204,414 212,386 Z"
    />

    <!-- Wisent & Lynx area -->
    <path class="enclosure-fence"
      d="M 626,396 C 664,378 710,376 748,396 C 780,412 800,444 800,482
         C 800,520 784,554 756,572 C 728,590 694,596 664,584
         C 634,572 612,548 604,518 C 596,488 602,450 616,418 Z"
    />

    <!-- Central animal cluster (Marten, Beaver, Kolkrabe, Raufußhuhn) -->
    <path class="enclosure-fence"
      d="M 372,408 C 406,392 448,388 484,400 C 510,410 526,434 522,464
         C 518,494 500,522 474,540 C 448,558 416,566 388,554
         C 360,542 344,516 342,484 C 340,452 350,426 372,408 Z"
    />

    <!-- Ural Owl area -->
    <path class="enclosure-fence"
      d="M 774,410 C 804,398 836,406 854,428 C 868,446 870,472 856,492
         C 842,512 818,522 794,516 C 770,510 752,492 748,468
         C 744,444 754,422 774,410 Z"
    />

    <!-- Waldrandvögel area -->
    <path class="enclosure-fence"
      d="M 652,502 C 678,490 710,494 730,514 C 746,530 750,554 738,574
         C 726,594 704,604 680,598 C 656,592 638,574 634,550
         C 630,526 638,510 652,502 Z"
    />

    <!-- ═══════════ TRAILS ═══════════ -->
    <TrailSegment
      v-for="trail in trails"
      :key="trail.id"
      :trail="trail"
      :user-count="trafficData[trail.id] || 0"
      :show-density="showDensity"
    />

    <!-- ═══════════ ANIMAL POIs ═══════════ -->
    <AnimalPoi
      v-for="animal in animals"
      :key="animal.id"
      :animal="animal"
      @select="emit('selectAnimal', $event)"
      @play-audio="emit('playAudio', audioPoints.find(p => p.id === $event)!)"
    />

    <!-- ═══════════ AUDIO TRIGGERS ═══════════ -->
    <AudioTrigger
      v-for="point in audioPoints"
      :key="point.id"
      :point="point"
      @play="emit('playAudio', $event)"
    />

    <!-- ═══════════ STANDORT MARKER ═══════════ -->
    <StandortMarker />

    <!-- ═══════════ FACILITY MARKERS ═══════════ -->

    <!-- Parking P1 (lower-right, near Grafenau) -->
    <g transform="translate(806, 642)" filter="url(#shadow-sm)">
      <rect x="-12" y="-12" width="24" height="24" rx="4" fill="#2557a7" />
      <text x="0" y="1" text-anchor="middle" dominant-baseline="central"
        fill="#fff" font-size="13" font-weight="700" font-family="Inter, sans-serif">P</text>
      <text x="10" y="-6" fill="#2557a7" font-size="8" font-weight="700"
        font-family="Inter, sans-serif" paint-order="stroke" stroke="#fff" stroke-width="2.5">1</text>
    </g>

    <!-- Parking P2 (bottom-center, near entrance) -->
    <g transform="translate(538, 704)" filter="url(#shadow-sm)">
      <rect x="-12" y="-12" width="24" height="24" rx="4" fill="#2557a7" />
      <text x="0" y="1" text-anchor="middle" dominant-baseline="central"
        fill="#fff" font-size="13" font-weight="700" font-family="Inter, sans-serif">P</text>
      <text x="10" y="-6" fill="#2557a7" font-size="8" font-weight="700"
        font-family="Inter, sans-serif" paint-order="stroke" stroke="#fff" stroke-width="2.5">2</text>
    </g>

    <!-- WC — center park -->
    <g transform="translate(444, 364)" filter="url(#shadow-sm)">
      <rect x="-14" y="-10" width="28" height="20" rx="4" fill="#fff" stroke="#a09888" stroke-width="0.7" />
      <text x="0" y="1" text-anchor="middle" dominant-baseline="central"
        fill="#555" font-size="9" font-weight="700" font-family="Inter, sans-serif">WC</text>
    </g>

    <!-- WC — east side -->
    <g transform="translate(748, 540)" filter="url(#shadow-sm)">
      <rect x="-14" y="-10" width="28" height="20" rx="4" fill="#fff" stroke="#a09888" stroke-width="0.7" />
      <text x="0" y="1" text-anchor="middle" dominant-baseline="central"
        fill="#555" font-size="9" font-weight="700" font-family="Inter, sans-serif">WC</text>
    </g>

    <!-- Accessible path symbol -->
    <g transform="translate(200, 362)" filter="url(#shadow-sm)">
      <rect x="-11" y="-11" width="22" height="22" rx="4" fill="#fff" stroke="#a09888" stroke-width="0.7" />
      <text x="0" y="1" text-anchor="middle" dominant-baseline="central"
        fill="#2557a7" font-size="13">♿</text>
    </g>

    <!-- Schleiff Bus Stop -->
    <g transform="translate(122, 428)">
      <circle r="13" fill="#2e7d32" filter="url(#shadow-sm)" />
      <rect x="-6" y="-5" width="12" height="10" rx="2" fill="#fff" opacity="0.92" />
      <text x="0" y="1" text-anchor="middle" dominant-baseline="central"
        fill="#2e7d32" font-size="9" font-weight="800" font-family="Inter, sans-serif">H</text>
    </g>
    <text x="142" y="432" class="map-label map-label-bold">Schleiff</text>

    <!-- Meeting point / Guided tour (T markers) -->
    <g transform="translate(200, 292)">
      <circle r="11" fill="#c0392b" filter="url(#shadow-sm)" />
      <text x="0" y="1" text-anchor="middle" dominant-baseline="central"
        fill="#fff" font-size="11" font-weight="700" font-family="Inter, sans-serif">T</text>
    </g>
    <g transform="translate(492, 676)">
      <circle r="11" fill="#c0392b" filter="url(#shadow-sm)" />
      <text x="0" y="1" text-anchor="middle" dominant-baseline="central"
        fill="#fff" font-size="11" font-weight="700" font-family="Inter, sans-serif">T</text>
    </g>

    <!-- Hans-Eisenmann-Haus label pill -->
    <g transform="translate(492, 718)">
      <rect x="-72" y="-12" width="144" height="24" rx="5"
        fill="rgba(255,255,255,0.92)" stroke="#c4aa68" stroke-width="0.8" />
      <text x="0" y="1" text-anchor="middle" dominant-baseline="central"
        class="map-label-haus">Hans-Eisenmann-Haus</text>
    </g>

    <!-- ═══════════ LABELS ═══════════ -->
    <text x="55" y="448" class="map-label-town">Neuschönau</text>
    <text x="818" y="720" class="map-label-town">Grafenau</text>
    <text x="866" y="88" class="map-label-road">Waldhäuser →</text>
    <text x="250" y="488" class="map-label map-label-area">ANIMAL ENCLOSURES</text>
    <text x="822" y="670" class="map-label-notice">KFZ gesperrt</text>

    <!-- Road labels -->
    <text x="158" y="738" class="map-label-road-label">Nationalparkstraße</text>
    <text x="678" y="698" class="map-label-road-label">Nationalparkstraße</text>

    <!-- ═══════════ SCALE BAR ═══════════ -->
    <g transform="translate(700, 56)">
      <rect x="-6" y="-16" width="122" height="26" rx="4" fill="rgba(255,255,255,0.82)" stroke="rgba(0,0,0,0.06)" stroke-width="0.5" />
      <line x1="0" y1="0" x2="50" y2="0" stroke="#333" stroke-width="3" />
      <line x1="50" y1="0" x2="100" y2="0" stroke="#999" stroke-width="1.5" stroke-dasharray="3 2" />
      <line x1="0" y1="-5" x2="0" y2="5" stroke="#333" stroke-width="1.5" />
      <line x1="50" y1="-5" x2="50" y2="5" stroke="#333" stroke-width="1.5" />
      <line x1="100" y1="-5" x2="100" y2="5" stroke="#333" stroke-width="1.5" />
      <text x="50" y="-8" text-anchor="middle" class="map-label" font-size="7.5">500 metres</text>
    </g>

    <!-- ═══════════ MAP LEGEND ═══════════ -->
    <g transform="translate(752, 110)">
      <rect x="-10" y="-10" width="172" height="118" rx="6"
        fill="rgba(255,255,255,0.88)" stroke="rgba(0,0,0,0.07)" stroke-width="0.5" />

      <!-- Wildlife circuit -->
      <line x1="4" y1="8" x2="30" y2="8" stroke="#c0392b" stroke-width="3" stroke-linecap="round" />
      <text x="38" y="11" class="map-legend-text">Wildlife Circuit</text>

      <!-- Botanical / geological route -->
      <line x1="4" y1="26" x2="30" y2="26" stroke="#1565c0" stroke-width="2.5" stroke-linecap="round" />
      <text x="38" y="29" class="map-legend-text">Botanical Route</text>

      <!-- Hiking trail -->
      <line x1="4" y1="44" x2="30" y2="44" stroke="#8a8070" stroke-width="2" stroke-dasharray="6 4" stroke-linecap="round" />
      <text x="38" y="47" class="map-legend-text">Hiking Trails</text>

      <!-- Road -->
      <line x1="4" y1="62" x2="30" y2="62" stroke="#c8a850" stroke-width="4" stroke-linecap="round" />
      <line x1="4" y1="62" x2="30" y2="62" stroke="#f0e0a8" stroke-width="2.5" stroke-linecap="round" />
      <text x="38" y="65" class="map-legend-text">Nationalparkstraße</text>

      <!-- Bus stop -->
      <circle cx="12" cy="80" r="5" fill="#2e7d32" />
      <text x="12" y="81" text-anchor="middle" dominant-baseline="central"
        fill="#fff" font-size="5" font-weight="700" font-family="Inter, sans-serif">H</text>
      <text x="38" y="83" class="map-legend-text">Bus Stop (Igelbus)</text>

      <!-- Meeting point -->
      <circle cx="12" cy="96" r="5" fill="#c0392b" />
      <text x="12" y="97" text-anchor="middle" dominant-baseline="central"
        fill="#fff" font-size="6" font-weight="700" font-family="Inter, sans-serif">T</text>
      <text x="38" y="99" class="map-legend-text">Meeting Point</text>
    </g>
  </svg>
</template>

<style scoped>
.svg-map {
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: block;
  overflow: visible;
}

/* ── Roads ── */
.road-casing {
  fill: none;
  stroke: #c4a44c;
  stroke-width: 8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.road-fill {
  fill: none;
  stroke: #f0e0a8;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.road-casing-minor {
  fill: none;
  stroke: #c4a44c;
  stroke-width: 6;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.road-fill-minor {
  fill: none;
  stroke: #f0e0a8;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ── Enclosure fences ── */
.enclosure-fence {
  fill: none;
  stroke: #7a6840;
  stroke-width: 0.9;
  stroke-dasharray: 5 3.5;
  opacity: 0.28;
}

/* ── Labels ── */
.map-label {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  font-weight: 500;
  fill: #444;
  pointer-events: none;
}
.map-label-bold {
  font-size: 10px;
  font-weight: 700;
  fill: #1a1208;
}
.map-label-area {
  font-size: 10px;
  font-weight: 700;
  fill: #2e4418;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  opacity: 0.65;
}
.map-label-road {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  fill: #6b5030;
  font-weight: 600;
  pointer-events: none;
}
.map-label-road-label {
  font-family: 'Inter', sans-serif;
  font-size: 7.5px;
  fill: #8a7050;
  font-weight: 500;
  letter-spacing: 0.04em;
  pointer-events: none;
}
.map-label-haus {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  font-weight: 700;
  fill: #1a1208;
}
.map-label-town {
  font-family: 'Playfair Display', serif;
  font-size: 15px;
  font-weight: 700;
  fill: #5c3a21;
  letter-spacing: 0.06em;
  opacity: 0.75;
  pointer-events: none;
}
.map-label-notice {
  font-family: 'Inter', sans-serif;
  font-size: 8px;
  fill: #a82020;
  font-weight: 600;
  pointer-events: none;
}
.map-legend-text {
  font-family: 'Inter', sans-serif;
  font-size: 7.5px;
  font-weight: 500;
  fill: #555;
  pointer-events: none;
}
</style>
