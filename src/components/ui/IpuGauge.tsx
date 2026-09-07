import { useEffect, useState } from 'react'
import { getIpuCategory } from '../../utils/ipu'

interface IpuGaugeProps {
  value: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

interface SizeConfig {
  container: number
  stroke: number
  fontSize: string
  numberSize: string
}

const SIZE_MAP: Record<'sm' | 'md' | 'lg', SizeConfig> = {
  sm: { container: 80, stroke: 6, fontSize: 'text-[10px]', numberSize: 'text-lg' },
  md: { container: 120, stroke: 8, fontSize: 'text-xs', numberSize: 'text-3xl' },
  lg: { container: 180, stroke: 12, fontSize: 'text-sm', numberSize: 'text-5xl' },
}

function IpuGauge({ value, size = 'md', showLabel = true }: IpuGaugeProps) {
  const [progress, setProgress] = useState(0)
  const cat = getIpuCategory(value)
  const config = SIZE_MAP[size]

  const normalized = Math.min(value, 500)
  const percent = (normalized / 500) * 360

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percent), 100)
    return () => clearTimeout(timer)
  }, [percent])

  const radius = (config.container - config.stroke) / 2
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (progress / 360) * circumference

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: config.container, height: config.container }}>
      <svg width={config.container} height={config.container} className="rotate-[-90deg]">
        <circle
          cx={config.container / 2}
          cy={config.container / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={config.stroke}
          strokeDasharray={circumference}
          strokeDashoffset={0}
        />
        <circle
          cx={config.container / 2}
          cy={config.container / 2}
          r={radius}
          fill="none"
          stroke={cat.color}
          strokeWidth={config.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`${config.numberSize} font-bold text-slate-900`}>{value}</span>
        {showLabel && <span className={`${config.fontSize} font-medium`} style={{ color: cat.color }}>{cat.labelEn}</span>}
      </div>
    </div>
  )
}

export default IpuGauge