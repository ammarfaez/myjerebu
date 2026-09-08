import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react'
import { StationReading } from '../../types'
import { getIpuColor } from '../../utils/ipu'
import IpuBadge from './IpuBadge'

type SortKey = 'aqi' | 'name' | 'state'
type SortDir = 'asc' | 'desc'

interface StationTableProps {
  stations: StationReading[]
}

const PAGE_SIZE = 20

interface SortHeaderProps {
  col: SortKey
  label: string
  sortKey: SortKey
  sortDir: SortDir
  onSort: (col: SortKey) => void
}

function SortHeader({ col, label, sortKey, sortDir, onSort }: SortHeaderProps) {
  const active = sortKey === col
  return (
    <button
      onClick={() => onSort(col)}
      className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
        active ? 'text-teal-600' : 'text-slate-500 hover:text-slate-700'
      }`}
    >
      {label}
      {active ? (
        sortDir === 'asc' ? (
          <ChevronUp className="w-3.5 h-3.5" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5" />
        )
      ) : (
        <ChevronsUpDown className="w-3.5 h-3.5 text-slate-300" />
      )}
    </button>
  )
}

function StationTable({ stations }: StationTableProps) {
  const { t } = useTranslation()
  const [sortKey, setSortKey] = useState<SortKey>('aqi')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [limit, setLimit] = useState(PAGE_SIZE)

  const sorted = useMemo(() => {
    const dir = sortDir === 'asc' ? 1 : -1
    return [...stations].sort((a, b) => {
      switch (sortKey) {
        case 'aqi':
          return (a.aqi - b.aqi) * dir
        case 'name':
          return (a.station?.name || '').localeCompare(b.station?.name || '') * dir
        case 'state':
          return (a.station?.state || '').localeCompare(b.station?.state || '') * dir
        default:
          return 0
      }
    })
  }, [stations, sortKey, sortDir])

  const displayed = sorted.slice(0, limit)
  const hasMore = displayed.length < sorted.length

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir(key === 'aqi' ? 'desc' : 'asc')
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left">
                <SortHeader col="name" label={t('table.station')} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              </th>
              <th className="px-4 py-3 text-left">
                <SortHeader col="state" label={t('table.state')} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              </th>
              <th className="px-4 py-3 text-right">
                <SortHeader col="aqi" label={t('table.aqi')} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              </th>
              <th className="px-4 py-3 text-left">{t('table.category')}</th>
              <th className="px-4 py-3 text-right">{t('table.pollutant')}</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((s) => (
              <tr key={s.station?.idx} className="border-b border-slate-100 transition-colors hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Link
                    to={`/station/${s.station?.idx}`}
                    className="font-medium text-slate-900 hover:text-teal-600 transition-colors"
                  >
                    {s.station?.name || 'Station'}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-500">{s.station?.state || 'Malaysia'}</td>
                <td className="px-4 py-3 text-right font-bold tabular-nums" style={{ color: getIpuColor(s.aqi) }}>
                  {s.aqi}
                </td>
                <td className="px-4 py-3">
                  <IpuBadge value={s.aqi} />
                </td>
                <td className="px-4 py-3 text-right text-slate-500">
                  {s.dominant_pollutant?.toUpperCase() || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <div className="px-4 py-4 text-center border-t border-slate-100">
          <button
            onClick={() => setLimit((l) => l + PAGE_SIZE)}
            className="px-5 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-teal-600 hover:bg-teal-50 hover:border-teal-300 transition-colors"
          >
            {t('table.showMore')} ({sorted.length - displayed.length})
          </button>
        </div>
      )}
    </div>
  )
}

export default StationTable