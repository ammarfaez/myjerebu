import { SkeletonBlock } from './Skeleton'

function MapPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 space-y-2">
        <SkeletonBlock className="h-7 w-64" />
        <SkeletonBlock className="h-4 w-80" />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-[18px] h-[18px] rounded-full bg-slate-200 animate-pulse" />
            <div className="h-3 w-16 rounded bg-slate-200 animate-pulse" />
          </div>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm" style={{ height: '65vh', minHeight: 400 }}>
        <SkeletonBlock className="w-full h-full rounded-none" />
      </div>
    </div>
  )
}

export default MapPageSkeleton