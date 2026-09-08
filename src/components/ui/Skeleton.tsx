interface SkeletonProps {
  className?: string
}

function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
}

export function SkeletonLine({ className = '' }: SkeletonProps) {
  return <Skeleton className={`h-3 ${className}`} />
}

export function SkeletonBlock({ className = '' }: SkeletonProps) {
  return <Skeleton className={className} />
}

export default Skeleton