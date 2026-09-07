import { Link } from 'react-router-dom'
import { StationReading } from '../../types'
import { getIpuCategory, getIpuColor } from '../../utils/ipu'
import { useTranslation } from 'react-i18next'
import IpuBadge from './IpuBadge'
import IpuFaceIcon from './IpuFaceIcon'

interface StationCardProps {
  station: StationReading
  rank?: number
  onClick?: () => void
}

function StationCard({ station, rank, onClick }: StationCardProps) {
  const { t } = useTranslation()
  const color = getIpuColor(station.aqi)
  const cat = getIpuCategory(station.aqi)
  const name = station.station?.name || `Station ${station.station?.idx}`

  return (
    <div
      onClick={onClick}
      className="group p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {typeof rank === 'number' && (
            <span className="text-xs font-semibold text-slate-400">#{rank}</span>
          )}
          <h3 className="text-sm font-semibold text-slate-900 truncate">{name}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{station.station?.state || 'Malaysia'}</p>
          <div className="mt-2">
            <IpuBadge value={station.aqi} />
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-3xl font-bold tabular-nums leading-none" style={{ color }}>
            {station.aqi}
          </span>
          <IpuFaceIcon level={cat.level} size={22} className="mt-1.5" />
          <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-1.5">
            {t('card.aqi')}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-xs text-slate-500">
        <span>
          {t('card.mainPollutant')}:{' '}
          <strong className="text-slate-700">
            {station.dominant_pollutant?.toUpperCase() || 'N/A'}
          </strong>
        </span>
        {station.polymeasures?.pm25 != null && (
          <span>
            {t('card.pm25')}:{' '}
            <strong className="text-slate-700">{Math.round(station.polymeasures.pm25)} µg/m³</strong>
          </span>
        )}
      </div>

      <Link
        to={`/station/${station.station.idx}`}
        className="mt-3 inline-flex items-center text-xs font-medium text-teal-600 hover:text-teal-700"
      >
        {t('map.tapToView')} →
      </Link>
    </div>
  )
}

export default StationCard