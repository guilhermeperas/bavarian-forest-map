import type { TrailSegment } from '@/types'

export const trails: TrailSegment[] = [
  // ─── Main Wildlife Enclosure Circuit (Red) ───
  // West leg: entrance → north via Otter / Red Deer / Wild Boar / Wildcat
  {
    id: 'wildlife-circuit-west',
    nameKey: 'trailWildlife',
    svgPath: `M 492,690
      C 468,674 430,664 398,640
      C 362,612 332,594 302,560
      C 272,526 258,498 244,456
      C 230,414 236,382 252,348
      C 268,314 296,296 332,276
      C 368,256 404,248 440,246
      C 468,244 482,258 492,280`,
    defaultColor: '#c0392b',
    strokeWidth: 4,
    dashed: false,
  },
  // East leg: north → entrance via Wolf / Wisent / Lynx
  {
    id: 'wildlife-circuit-east',
    nameKey: 'trailWildlife',
    svgPath: `M 492,280
      C 518,304 550,286 588,296
      C 626,306 618,336 652,368
      C 686,400 722,388 754,424
      C 786,460 764,508 738,548
      C 712,588 674,596 632,626
      C 582,656 540,678 492,690`,
    defaultColor: '#c0392b',
    strokeWidth: 4,
    dashed: false,
  },

  // ─── Botanical / Geological Route (Blue) ───
  // Branch east from wildlife circuit at Wisent area
  {
    id: 'botanical-east',
    nameKey: 'trailBotanical',
    svgPath: `M 754,424
      C 778,398 820,404 852,376
      C 872,358 868,310 878,268
      C 886,232 890,208 888,188`,
    defaultColor: '#1565c0',
    strokeWidth: 3.5,
    dashed: false,
  },
  // Return south along east side
  {
    id: 'botanical-south',
    nameKey: 'trailBotanical',
    svgPath: `M 888,188
      C 884,248 862,316 836,378
      C 810,440 816,498 790,548
      C 764,598 696,604 642,636
      C 588,668 540,680 492,690`,
    defaultColor: '#1565c0',
    strokeWidth: 3.5,
    dashed: false,
  },

  // ─── Nationalparkstraße (Main Road — rendered here for density) ───
  {
    id: 'nationalpark-road',
    nameKey: 'trailNationalpark',
    svgPath: `M 20,732
      C 100,726 180,738 280,714
      C 380,690 440,714 520,696
      C 600,678 680,694 760,674
      C 840,658 900,668 960,660`,
    defaultColor: '#b8a060',
    strokeWidth: 5,
    dashed: false,
  },

  // ─── Secondary Hiking Trails (Gray Dashed) ───
  {
    id: 'hike-north-cross',
    nameKey: 'trailHike',
    svgPath: `M 248,382
      C 278,362 312,346 350,338
      C 388,330 424,336 456,348
      C 472,356 486,368 496,382`,
    defaultColor: '#8a8070',
    strokeWidth: 2.5,
    dashed: true,
  },
  {
    id: 'hike-center-north',
    nameKey: 'trailHike',
    svgPath: `M 388,268
      C 380,300 374,334 372,368
      C 370,402 374,436 386,466
      C 398,496 416,522 438,546`,
    defaultColor: '#8a8070',
    strokeWidth: 2.5,
    dashed: true,
  },
  {
    id: 'hike-center-east',
    nameKey: 'trailHike',
    svgPath: `M 518,296
      C 524,330 526,366 524,402
      C 522,438 514,472 502,502
      C 490,532 474,558 456,582`,
    defaultColor: '#8a8070',
    strokeWidth: 2.5,
    dashed: true,
  },
  {
    id: 'hike-east-branch',
    nameKey: 'trailHike',
    svgPath: `M 678,238
      C 694,280 704,324 708,370
      C 712,416 710,462 702,506
      C 694,550 680,592 664,628`,
    defaultColor: '#8a8070',
    strokeWidth: 2.5,
    dashed: true,
  },
  {
    id: 'hike-schleiff',
    nameKey: 'trailSchleiff',
    svgPath: `M 124,446
      C 154,448 188,452 218,460
      C 248,468 276,480 302,496
      C 318,506 332,518 346,534`,
    defaultColor: '#8a8070',
    strokeWidth: 2.5,
    dashed: true,
  },

  // ─── Cycling trails (Dotted) ───
  {
    id: 'cycling-perimeter',
    nameKey: 'trailCycling',
    svgPath: `M 144,208
      C 186,186 238,168 296,154
      C 354,140 416,134 476,138
      C 536,142 590,156 636,178
      C 664,192 684,210 696,228`,
    defaultColor: '#9a8060',
    strokeWidth: 2,
    dashed: true,
  },
]
