import { SkeletonBlock } from './Skeleton'

function LocationCardSkeleton() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-700 p-5 md:p-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse" />
          <div className="space-y-2">
            <div className="h-3.5 w-32 rounded bg-white/10 animate-pulse" />
            <div className="h-2.5 w-44 rounded bg-white/10 animate-pulse" />
          </div>
        </div>
        <div className="h-8 w-24 rounded-md bg-white/10 animate-pulse" />
      </div>
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-white/10 animate-pulse" />
        <div className="h-12 w-24 rounded-lg bg-white/10 animate-pulse" />
        <div className="h-10 w-16 rounded-lg bg-white/10 animate-pulse" />
      </div>
    </div>
  )
}

function StatCardSkeleton() {
  return (
    <div className="rounded-xl bg-white border border-slate-200 p-4">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-slate-200 animate-pulse" />
        <div className="h-3 w-24 rounded bg-slate-200 animate-pulse" />
      </div>
      <div className="mt-3 h-8 w-16 rounded bg-slate-200 animate-pulse" />
    </div>
  )
}

function LegendSkeleton() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className="w-[18px] h-[18px] rounded-full bg-slate-200 animate-pulse" />
          <div className="h-3 w-16 rounded bg-slate-200 animate-pulse" />
        </div>
      ))}
    </div>
  )
}

function StationCardSkeleton() {
  return (
    <div className="p-4 rounded-xl border border-slate-200 bg-white">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-3 w-10 rounded bg-slate-200 animate-pulse" />
          <div className="h-4 w-32 rounded bg-slate-200 animate-pulse" />
          <div className="h-3 w-24 rounded bg-slate-200 animate-pulse" />
          <div className="h-6 w-20 rounded-full bg-slate-200 animate-pulse" />
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="h-8 w-12 rounded bg-slate-200 animate-pulse" />
          <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between">
        <div className="h-3 w-24 rounded bg-slate-200 animate-pulse" />
        <div className="h-3 w-20 rounded bg-slate-200 animate-pulse" />
      </div>
    </div>
  )
}

function SectionHeadingSkeleton() {
  return <div className="h-5 w-48 rounded bg-slate-200 animate-pulse mb-4" />
}

function HomePageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <LocationCardSkeleton />
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <SkeletonBlock className="h-6 w-56" />
          <SkeletonBlock className="h-4 w-72" />
        </div>
        <SkeletonBlock className="h-9 w-28 rounded-lg" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      <div className="mt-8">
        <LegendSkeleton />
      </div>

      <div className="mt-10">
        <SkeletonBlock className="h-10 w-full rounded-xl" />
      </div>

      <div className="mt-10">
        <SectionHeadingSkeleton />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StationCardSkeleton />
          <StationCardSkeleton />
          <StationCardSkeleton />
          <StationCardSkeleton />
          <StationCardSkeleton />
          <StationCardSkeleton />
        </div>
      </div>

      <div className="mt-10">
        <SectionHeadingSkeleton />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StationCardSkeleton />
          <StationCardSkeleton />
          <StationCardSkeleton />
        </div>
      </div>

      <div className="mt-10">
        <SectionHeadingSkeleton />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StationCardSkeleton />
          <StationCardSkeleton />
          <StationCardSkeleton />
        </div>
      </div>
    </div>
  )
}

export default HomePageSkeleton