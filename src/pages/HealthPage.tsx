import { useTranslation } from 'react-i18next'
import { Info, BookOpen, AlertTriangle } from 'lucide-react'
import { IPU_CATEGORIES } from '../types'

function HealthPage() {
  const { t } = useTranslation()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Info className="w-8 h-8 text-teal-600" />
        <h1 className="text-2xl font-bold text-slate-900">{t('health.title')}</h1>
      </div>

      <div className="space-y-6">
        <section className="rounded-2xl bg-white border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">{t('health.whatIsApi')}</h2>
          <p className="text-sm text-slate-600 leading-relaxed">{t('health.apiDescription')}</p>
        </section>

        <section className="rounded-2xl bg-white border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">{t('health.howToRead')}</h2>

          <div className="grid grid-cols-1 gap-4">
            {IPU_CATEGORIES.map((cat) => (
              <div
                key={cat.level}
                className="flex items-start gap-3 p-4 rounded-lg border"
                style={{ borderColor: cat.color + '50', backgroundColor: cat.color + '08' }}
              >
                <div className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: cat.color }} />
                <div>
                  <span className="text-sm font-semibold text-slate-900">
                    {cat.labelEn} ({cat.rangeMin}–{cat.rangeMax === 500 ? `${cat.rangeMax}+` : cat.rangeMax})
                  </span>
                  <p className="text-sm text-slate-600 mt-1">
                    {cat.level === 'good' && t('health.good0to50')}
                    {cat.level === 'moderate' && t('health.moderate51to100')}
                    {cat.level === 'unhealthy' && t('health.unhealthy101to200')}
                    {cat.level === 'very-unhealthy' && t('health.veryUnhealthy201to300')}
                    {cat.level === 'hazardous' && t('health.hazardous301plus')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-amber-800 mb-1">⚠ School Closures</h2>
              <p className="text-sm text-amber-700 leading-relaxed">{t('health.schoolClosure')}</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> Data Source
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">{t('health.source')}</p>
          <a
            href="https://eqms.doe.gov.my/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-teal-600 hover:text-teal-700"
          >
            Visit DOE APIMS →
          </a>
        </section>
      </div>
    </div>
  )
}

export default HealthPage