import { IPU_CATEGORIES, IpuCategory, IpuLevel } from '../types'

export function getIpuCategory(aqi: number): IpuCategory {
  if (aqi <= 50) return IPU_CATEGORIES[0]
  if (aqi <= 100) return IPU_CATEGORIES[1]
  if (aqi <= 200) return IPU_CATEGORIES[2]
  if (aqi <= 300) return IPU_CATEGORIES[3]
  return IPU_CATEGORIES[4]
}

export function getIpuColor(aqi: number): string {
  return getIpuCategory(aqi).color
}

export function getMainPollutantLabel(pollutant: string): string {
  const map: Record<string, string> = {
    pm25: 'PM2.5',
    pm10: 'PM10',
    o3: 'O\u2083',
    no2: 'NO\u2082',
    so2: 'SO\u2082',
    co: 'CO',
  }
  return map[pollutant?.toLowerCase()] ?? pollutant ?? 'N/A'
}

export function getHealthAdvice(level: IpuLevel, lang: 'en' | 'ms'): string {
  const advice: Record<IpuLevel, [string, string]> = {
    good: ['No precautions needed.', 'Tiada langkah berjaga-jaga diperlukan.'],
    moderate: ['Unusually sensitive people should limit prolonged outdoor exertion.', 'Orang yang sensitif perlu hadkan aktiviti luar yang berpanjangan.'],
    unhealthy: ['Sensitive groups should limit outdoor activity. General public: reduce prolonged exertion.', 'Kumpulan sensitif perlu hadkan aktiviti luar. Orang awam: kurangkan aktiviti berpanjangan.'],
    'very-unhealthy': ['Everyone should avoid outdoor exertion. Sensitive groups should stay indoors.', 'Semua orang perlu elak aktiviti luar. Kumpulan sensitif perlu tinggal di dalam rumah.'],
    hazardous: ['Health alert: everyone should remain indoors. Follow official DOE directives.', 'Amaran kesihatan: semua perlu tinggal di dalam rumah. Ikuti arahan JAS.'],
  }
  return advice[level][lang === 'ms' ? 1 : 0]
}

export function getCategoryLabel(level: IpuLevel, lang: 'en' | 'ms'): string {
  const cat = IPU_CATEGORIES.find(c => c.level === level)
  if (!cat) return ''
  return lang === 'ms' ? cat.labelMs : cat.labelEn
}