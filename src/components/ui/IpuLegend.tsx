import { IPU_CATEGORIES } from '../../types'

function IpuLegend() {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs">
      {IPU_CATEGORIES.map((cat) => (
        <div key={cat.level} className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
          <span className="text-slate-600">{cat.labelEn} ({cat.rangeMin}-{cat.rangeMax})</span>
        </div>
      ))}
    </div>
  )
}

export default IpuLegend