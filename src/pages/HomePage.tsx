import { useTranslation } from 'react-i18next'
import { useAllStations } from '../hooks/useStations'
import { AlertTriangle, BarChart3, Clock, CloudRain, Wind } from 'lucide-react'
import StationCard from '../components/ui/StationCard'
import IpuLegend from '../components/ui/IpuLegend'
import AlertBanner from '../components/alerts/AlertBanner'
import LoadingSpinner from '../components/ui/LoadingSpinner'

function HomePage() {
  const { t } = useTranslation()
  const { data: stations, isLoading, error, refetch, isFetching } = useAllStations()

  const worst5 = stations?.slice(0, 5) ?? []
  const best5 = stations?.slice(-5).reverse() ?? []
  const above100 = stations?.filter((s) => s.aqi > 100) ?? []
  const above200 = stations?.filter((s) => s.aqi > 200) ?? []
  const highest = worst5[0] || null

  if (isLoading) return <LoadingSpinner />
  if (error)
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="rounded-2xl bg-red-50 border border-red-200 p-8">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="mt-4 text-lg font-semibold text-red-800">{t('errors.loadFailed')}</h2>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            {t('errors.retry')}
          </button>
        </div>
      </div>
    )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('dashboard.title')}</h1>
          <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
            <Clock className="w-4 h-4" />
            <span>{t('dashboard.lastUpdate')}: {highest?.time ? new Date(highest.time).toLocaleString() : 'N/A'}</span>
            {isFetching && <span className="text-emerald-600 text-xs animate-pulse">↻</span>}
          </div>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors text-sm font-medium"
        >
          <Clock className="w-4 h-4" />
          {t('actions.refresh')}
        </button>
      </div>

      {stations && <AlertBanner stations={stations} />}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <StatCard
          icon={<Wind className="w-5 h-5 text-red-500" />}
          label={t('dashboard.highestReading')}
          value={highest?.aqi ?? 'N/A'}
          color={highest ? highest.station?.name || '' : ''}
        />
        <StatCard
          icon={<AlertTriangle className="w-5 h-5 text-orange-500" />}
          label={t('dashboard.stationsAbove100')}
          value={above100.length}
        />
        <StatCard
          icon={<CloudRain className="w-5 h-5 text-purple-500" />}
          label={t('dashboard.stationsAbove200')}
          value={above200.length}
        />
        <StatCard
          icon={<BarChart3 className="w-5 h-5 text-teal-500" />}
          label={t('dashboard.totalStations')}
          value={stations?.length ?? 0}
        />
      </div>

      <div className="mt-8">
        <IpuLegend />
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold text-slate-900 mb-4">{t('dashboard.worstAir')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {worst5.map((station, i) => (
            <StationCard key={station.station?.idx || i} station={station} rank={i + 1} />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold text-slate-900 mb-4">{t('dashboard.cleanestAir')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {best5.map((station, i) => (
            <StationCard key={station.station?.idx || i} station={station} rank={i + 1} />
          ))}
        </div>
      </div>

      {above100.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            {t('dashboard.stationsAbove100')} ({above100.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {above100.map((station, i) => (
              <StationCard key={station.station?.idx || i} station={station} rank={i + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color?: string }) {
  return (
    <div className="rounded-xl bg-white border border-slate-200 p-4">
      <div className="flex items-center gap-2">{icon}<span className="text-xs font-medium text-slate-500">{label}</span></div>
      <div className="mt-2 text-2xl font-bold text-slate-900">{value}</div>
      {color && <p className="text-[11px] text-slate-400 mt-0.5 truncate">{color}</p>}
    </div>
  )
}

export default HomePage