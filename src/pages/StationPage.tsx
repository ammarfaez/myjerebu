import { useTranslation } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { useStation } from '../hooks/useStations'
import { ArrowLeft, MapPin, Clock, Activity, Heart } from 'lucide-react'
import IpuGauge from '../components/ui/IpuGauge'
import IpuBadge from '../components/ui/IpuBadge'
import { getHealthAdvice, getIpuCategory } from '../utils/ipu'
import StationPageSkeleton from '../components/ui/StationPageSkeleton'

function StationPage() {
  const { id } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'en' | 'ms'
  const stationId = id ? parseInt(id, 10) : null
  const { data: reading, isLoading, error } = useStation(stationId)

  if (isLoading) return <StationPageSkeleton />
  if (error || !reading)
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-500">{t('errors.loadFailed')}</p>
        <Link to="/" className="mt-4 inline-block text-teal-600 hover:underline">{t('nav.home')}</Link>
      </div>
    )

  const cat = getIpuCategory(reading.aqi)
  const healthText = getHealthAdvice(cat.level, lang)

  const pollutants = [
    { name: 'PM2.5', value: reading.polymeasures?.pm25, unit: 'µg/m³' },
    { name: 'PM10', value: reading.polymeasures?.pm10, unit: 'µg/m³' },
    { name: 'O₃', value: reading.polymeasures?.o3, unit: 'ppb' },
    { name: 'NO₂', value: reading.polymeasures?.no2, unit: 'ppb' },
    { name: 'SO₂', value: reading.polymeasures?.so2, unit: 'ppb' },
    { name: 'CO', value: reading.polymeasures?.co, unit: 'ppm' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> {t('nav.home')}
      </Link>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex-shrink-0">
            <IpuGauge value={reading.aqi} size="lg" />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900">{reading.station?.name || 'Station'}</h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {reading.station?.state || 'Malaysia'}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {reading.time ? new Date(reading.time).toLocaleString() : 'N/A'}
              </span>
            </div>

            <div className="mt-3">
              <IpuBadge value={reading.aqi} />
            </div>

            <div className="mt-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> {t('station.pollutants')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {pollutants.map((p) => (
                  <div key={p.name} className="flex flex-col">
                    <span className="text-xs text-slate-500">{p.name}</span>
                    <span className="text-sm font-semibold text-slate-900">
                      {p.value != null ? p.value.toFixed(1) : 'N/A'} <span className="text-slate-400 font-normal">{p.unit}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-lg border p-4" style={{ borderColor: cat.color + '40', backgroundColor: cat.color + '10' }}>
              <h3 className="text-sm font-semibold mb-1 flex items-center gap-1.5" style={{ color: cat.color }}>
                <Heart className="w-4 h-4" /> {t('station.healthAdvice')}
              </h3>
              <p className="text-sm text-slate-700">{healthText}</p>
            </div>
          </div>
        </div>

        {reading.station?.lat && reading.station?.lon && (
          <div className="mt-6 pt-6 border-t border-slate-100 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {t('station.coordinates')}: {reading.station.lat.toFixed(4)}, {reading.station.lon.toFixed(4)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default StationPage