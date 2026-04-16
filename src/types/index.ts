/* ============================================
   Nationalpark Bayerischer Wald — Type Definitions
   ============================================ */

export type Locale = 'de' | 'en' | 'cz'

export type DensityLevel = 'low' | 'moderate' | 'high'

export interface TrailPoint {
  x: number
  y: number
}

export interface TrailSegment {
  id: string
  nameKey: string
  svgPath: string          // SVG <path> d attribute
  defaultColor: string
  strokeWidth: number
  dashed: boolean
}

export interface AnimalData {
  id: string
  nameKey: string
  descriptionKey: string
  icon: string             // emoji or SVG reference
  x: number                // SVG coordinate
  y: number                // SVG coordinate
  audioId?: string
}

export interface AudioPoint {
  id: string
  labelKey: string
  x: number
  y: number
  tracks: Record<Locale, string>   // locale → audio file path
}

export interface TrafficData {
  [trailId: string]: number        // active user count per trail segment
}

export type ConnectionMode = 'live' | 'cached'

export interface ParkStatus {
  isOpen: boolean
  weatherWarning: boolean
  warningKey?: string
  lastUpdated: Date
}

export interface StringMap {
  [key: string]: string
}

export type LocaleStrings = Record<Locale, StringMap>
