export type IpuLevel = 'good' | 'moderate' | 'unhealthy' | 'very-unhealthy' | 'hazardous'

export interface IpuCategory {
  level: IpuLevel
  labelEn: string
  labelMs: string
  rangeMin: number
  rangeMax: number
  color: string
}

export interface PollutantData {
  pm25?: number
  pm10?: number
  o3?: number
  no2?: number
  so2?: number
  co?: number
}

export interface WaqiStation {
  idx: number
  name: string
  lat: number
  lon: number
  country: string
  state?: string
  city?: string
}

export interface StationReading {
  station: WaqiStation
  aqi: number
  dominant_pollutant: string
  polymeasures?: PollutantData
  time: string
  category: IpuCategory
}

export interface AllStationsResponse {
  status: string
  data: StationReading[]
}

export interface StationFeed {
  status: string
  data: {
    aqi: number
    idx: number
    time: {
      s: string
      tz: string
    }
    city: {
      name: string
      geo: [number, number]
    }
    iaqi: {
      pm25?: { v: number }
      pm10?: { v: number }
      o3?: { v: number }
      no2?: { v: number }
      so2?: { v: number }
      co?: { v: number }
      t?: { v: number }
    }
    dominentpol: string
  }
}

export const IPU_CATEGORIES: IpuCategory[] = [
  { level: 'good', labelEn: 'Good', labelMs: 'Baik', rangeMin: 0, rangeMax: 50, color: '#10b981' },
  { level: 'moderate', labelEn: 'Moderate', labelMs: 'Sederhana', rangeMin: 51, rangeMax: 100, color: '#f59e0b' },
  { level: 'unhealthy', labelEn: 'Unhealthy', labelMs: 'Tidak Sihat', rangeMin: 101, rangeMax: 200, color: '#f97316' },
  { level: 'very-unhealthy', labelEn: 'Very Unhealthy', labelMs: 'Sangat Tidak Sihat', rangeMin: 201, rangeMax: 300, color: '#ef4444' },
  { level: 'hazardous', labelEn: 'Hazardous', labelMs: 'Berbahaya', rangeMin: 301, rangeMax: 500, color: '#8b5cf6' },
]

export type Language = 'en' | 'ms'

export interface StationCoords {
  id: number
  name: string
  state: string
  lat: number
  lon: number
}