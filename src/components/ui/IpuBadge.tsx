import { IpuLevel } from '../../types'
import { getCategoryLabel, getIpuCategory } from '../../utils/ipu'
import { useTranslation } from 'react-i18next'

interface IpuBadgeProps {
  value: number
  className?: string
}

function IpuBadge({ value, className = '' }: IpuBadgeProps) {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'en' | 'ms'
  const cat = getIpuCategory(value)

  const bgMap: Record<IpuLevel, string> = {
    good: 'bg-emerald-100 text-emerald-800',
    moderate: 'bg-yellow-100 text-yellow-800',
    unhealthy: 'bg-orange-100 text-orange-800',
    'very-unhealthy': 'bg-red-100 text-red-800',
    hazardous: 'bg-purple-100 text-purple-800',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${bgMap[cat.level]} ${className}`}
    >
      {getCategoryLabel(cat.level, lang)}
    </span>
  )
}

export default IpuBadge