import { IpuLevel } from '../../types'

interface IpuFaceIconProps {
  level: IpuLevel
  size?: number
  className?: string
}

const SPECS: Record<IpuLevel, { mask: string; masked: boolean; accent: string; blush: boolean }> = {
  good: { mask: '#10b981', masked: false, accent: '#047857', blush: true },
  moderate: { mask: '#f59e0b', masked: false, accent: '#b45309', blush: false },
  unhealthy: { mask: '#f97316', masked: true, accent: '#c2410c', blush: false },
  'very-unhealthy': { mask: '#ef4444', masked: true, accent: '#b91c1c', blush: false },
  hazardous: { mask: '#8b5cf6', masked: true, accent: '#6d28d9', blush: false },
}

function IpuFaceIcon({ level, size = 28, className = '' }: IpuFaceIconProps) {
  const s = SPECS[level]
  const eyes = { color: '#4a3728' }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`inline-block select-none ${className}`}
      aria-hidden="true"
    >
      {/* head */}
      <circle cx="32" cy="33" r="26" fill="#ffe0b2" />

      {/* worried / tired brows */}
      {level === 'unhealthy' && (
        <>
          <path d="M21 19 q6 4 5-1" stroke={s.accent} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M43 19 q-6 4-5-1" stroke={s.accent} strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      )}
      {level === 'very-unhealthy' && (
        <>
          <path d="M20 20 q5 4 6 0" stroke={s.accent} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M44 20 q-5 4-6 0" stroke={s.accent} strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* eyes */}
      {level === 'good' && (
        <>
          <circle cx="24" cy="26" r="4" fill={eyes.color} />
          <circle cx="40" cy="26" r="4" fill={eyes.color} />
          <circle cx="25.5" cy="24.5" r="1.4" fill="#fff" />
          <circle cx="41.5" cy="24.5" r="1.4" fill="#fff" />
        </>
      )}
      {level === 'moderate' && (
        <>
          <circle cx="24" cy="27" r="3.5" fill={eyes.color} />
          <circle cx="40" cy="27" r="3.5" fill={eyes.color} />
        </>
      )}
      {level === 'unhealthy' && (
        <>
          <circle cx="24" cy="26" r="3" fill={eyes.color} />
          <circle cx="40" cy="26" r="3" fill={eyes.color} />
        </>
      )}
      {(level === 'very-unhealthy' || level === 'hazardous') && (
        <>
          <path d="M21 26 q3 3 6 0" stroke={eyes.color} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M37 26 q3 3 6 0" stroke={eyes.color} strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* blush */}
      {s.blush && (
        <>
          <circle cx="20" cy="35" r="3.2" fill="#fb7185" opacity="0.4" />
          <circle cx="44" cy="35" r="3.2" fill="#fb7185" opacity="0.4" />
        </>
      )}

      {/* sweat drop for very unhealthy */}
      {level === 'very-unhealthy' && (
        <path d="M47 16 q4 6 0 9 q-3-3 0-9 z" fill={s.accent} />
      )}

      {/* mouth when no mask */}
      {!s.masked && level === 'good' && (
        <path d="M24 41 q8 9 16 0" stroke={s.accent} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      )}
      {!s.masked && level === 'moderate' && (
        <path d="M27 42 q5 3 10 0" stroke={s.accent} strokeWidth="3" fill="none" strokeLinecap="round" />
      )}

      {/* mask straps */}
      {s.masked && (
        <>
          <path d="M19 38 q-7 1-8-4" stroke={s.mask} strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
          <path d="M45 38 q7 1 8-4" stroke={s.mask} strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
        </>
      )}

      {/* mask */}
      {s.masked && (
        <>
          <path d="M19 41 a13 11 0 0 0 26 0 a13 11 0 0 0-26 0 z" fill={s.mask} />
          <path d="M32 41 v11" stroke="#fff" strokeWidth="1.6" opacity="0.45" />
          <path d="M23 43 q4 2 0 5 M41 43 q-4 2 0 5" stroke="#fff" strokeWidth="1.4" opacity="0.35" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* sleepy lines for hazardous */}
      {level === 'hazardous' && (
        <path d="M16 30 q8-3 32 0" stroke={s.accent} strokeWidth="2" strokeLinecap="round" opacity="0.35" fill="none" />
      )}
    </svg>
  )
}

export default IpuFaceIcon