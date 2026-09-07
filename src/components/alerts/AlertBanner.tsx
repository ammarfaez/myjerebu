import { StationReading } from '../../types'
import { AlertTriangle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface AlertBannerProps {
  stations: StationReading[]
}

function AlertBanner({ stations }: AlertBannerProps) {
  const { t } = useTranslation()
  const hazardous = stations.filter((s) => s.aqi > 200)
  if (hazardous.length === 0) return null

  const highest = hazardous.reduce((max, s) => (s.aqi > max.aqi ? s : max), hazardous[0])

  return (
    <div className="rounded-lg bg-red-50 border border-red-200 p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5 text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-red-800">{t('dashboard.alert')}</h3>
          <p className="text-sm text-red-700 mt-0.5">
            {hazardous.length} {t('dashboard.stationsAbove200')}
          </p>
          <p className="text-xs text-red-600 mt-1">
            {highest.station?.name}: <strong className="text-red-800">{highest.aqi}</strong> — {highest.station?.state || 'Malaysia'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AlertBanner