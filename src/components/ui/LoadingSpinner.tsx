import { useTranslation } from 'react-i18next'

interface LoadingSpinnerProps {
  message?: string
}

function LoadingSpinner({ message }: LoadingSpinnerProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin" />
        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-b-teal-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      </div>
      <p className="text-sm text-slate-500">{message || t('loading')}</p>
    </div>
  )
}

export default LoadingSpinner