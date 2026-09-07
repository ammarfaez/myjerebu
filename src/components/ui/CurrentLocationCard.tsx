import { useTranslation } from 'react-i18next'
import { LocateFixed, MapPin, Lock, Compass, Wind } from 'lucide-react'
import { useGeolocation, useGeoReading } from '../../hooks/useLocation'
import { getIpuCategory } from '../../utils/ipu'
import IpuBadge from '../ui/IpuBadge'

function CurrentLocationCard() {
  const { t } = useTranslation()
  const { state, requestLocation } = useGeolocation()

  const lat = state.status === 'success' ? state.lat : null
  const lon = state.status === 'success' ? state.lon : null
  const { data, isLoading, error } = useGeoReading(lat, lon)

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-5 md:p-6 overflow-hidden relative">
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-teal-500/10 blur-xl" />
      <div className="relative">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-white">
            <LocateFixed className="w-5 h-5 text-teal-400" />
            <div>
              <h2 className="text-base font-bold leading-tight">{t('myLocation.title')}</h2>
              <p className="text-xs text-slate-400">{t('myLocation.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 px-2 py-1 rounded-full border border-slate-600">
              <MapPin className="w-3 h-3" />
              {lat?.toFixed(2)},{lon?.toFixed(2)}
            </span>
            <button
              onClick={requestLocation}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
              title={t('myLocation.tryAgain')}
            >
              <Compass className="w-3.5 h-3.5" />
              {t('myLocation.tryAgain')}
            </button>
          </div>
        </div>

        {state.status === 'prompting' && (
          <div className="flex items-center gap-3 text-slate-300">
            <div className="w-5 h-5 rounded-full border-2 border-teal-400 border-t-transparent animate-spin" />
            <span className="text-sm">{t('myLocation.detecting')}</span>
          </div>
        )}

        {state.status === 'loading' && (
          <div className="flex items-center gap-3 text-slate-300">
            <div className="w-5 h-5 rounded-full border-2 border-teal-400 border-t-transparent animate-spin" />
            <span className="text-sm">{t('myLocation.loading')}</span>
          </div>
        )}

        {state.status === 'success' && isLoading && (
          <div className="flex items-center gap-3 text-slate-300">
            <div className="w-5 h-5 rounded-full border-2 border-teal-400 border-t-transparent animate-spin" />
            <span className="text-sm">{t('myLocation.loading')}</span>
          </div>
        )}

        {state.status === 'success' && !isLoading && data && !error && (
          <div className="flex items-center gap-5">
            <div className="flex items-end gap-2">
              <span className="text-6xl font-black tabular-nums" style={{ color: getIpuCategory(data.aqi).color }}>
                {data.aqi > 0 ? data.aqi : '—'}
              </span>
              <div className="pb-1.5">
                <IpuBadge value={data.aqi} />
                <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-400">
                  <Wind className="w-3 h-3" />
                  {(t('myLocation.nearestStation'))}: {data.name}
                </div>
              </div>
            </div>
          </div>
        )}

        {state.status === 'success' && error && (
          <div className="text-slate-300 text-sm">
            <p className="text-red-400">⚠</p>
            <p>{t('errors.loadFailed')}</p>
          </div>
        )}

        {state.status === 'denied' && (
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-slate-300 text-sm flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-500" />
              {t('myLocation.denied')}
            </span>
            <button
              onClick={requestLocation}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-400/30 transition-colors"
            >
              {t('myLocation.enable')}
            </button>
          </div>
        )}

        {state.status === 'unsupported' && (
          <p className="text-slate-300 text-sm flex items-center gap-2">
            <Lock className="w-4 h-4 text-slate-500" />
            {t('myLocation.unsupported')}
          </p>
        )}

        {state.status === 'error' && !lat && (
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-slate-300 text-sm">{t('errors.loadFailed')}</span>
            <button
              onClick={requestLocation}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-400/30 transition-colors"
            >
              {t('myLocation.tryAgain')}
            </button>
          </div>
        )}

        {data && !isLoading && !error && (
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-x-6 gap-y-1">
            {['pm25', 'pm10'].map((p) => {
              const val = (data.pollutants as Record<string, number | undefined>)?.[p]
              if (val == null) return null
              return (
                <span key={p} className="text-xs text-slate-400">
                  {p.toUpperCase()}: <strong className="text-slate-200">{val.toFixed(1)}</strong> µg/m³
                </span>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default CurrentLocationCard