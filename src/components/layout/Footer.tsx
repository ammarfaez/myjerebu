import { useTranslation } from 'react-i18next'
import { Heart } from 'lucide-react'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-lg">
            <p className="text-xs text-slate-400 leading-relaxed">{t('footer.disclaimer')}</p>
            <p className="text-xs text-slate-500 mt-2">{t('footer.source')}</p>
          </div>
          <div className="text-sm">
            <span className="flex items-center gap-1.5 text-slate-300">
              {t('footer.madeFor')} <Heart className="w-4 h-4 fill-red-500 text-red-500" />
            </span>
            <p className="text-xs text-slate-500 mt-1">© {new Date().getFullYear()} {t('footer.rights')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer