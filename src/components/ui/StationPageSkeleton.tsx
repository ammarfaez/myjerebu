import { SkeletonBlock } from './Skeleton'

function StationPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="h-4 w-24 rounded bg-slate-200 animate-pulse mb-6" />

      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-[180px] h-[180px] rounded-full bg-slate-200 animate-pulse shrink-0" />

          <div className="flex-1 space-y-4">
            <SkeletonBlock className="h-7 w-56" />
            <SkeletonBlock className="h-4 w-72" />
            <SkeletonBlock className="h-7 w-24 rounded-full" />

            <div className="rounded-lg bg-slate-50 p-4 space-y-3">
              <SkeletonBlock className="h-4 w-32" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="space-y-2">
                    <SkeletonBlock className="h-3 w-10" />
                    <SkeletonBlock className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 p-4 space-y-2">
              <SkeletonBlock className="h-4 w-28" />
              <SkeletonBlock className="h-3 w-full" />
              <SkeletonBlock className="h-3 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StationPageSkeleton