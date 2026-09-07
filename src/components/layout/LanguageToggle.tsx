import { useTranslation } from 'react-i18next'

function LanguageToggle() {
  const { i18n } = useTranslation()
  const current = i18n.language

  const toggle = () => {
    const next = current === 'en' ? 'ms' : 'en'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-emerald-100 hover:bg-white/10 transition-colors"
      aria-label="Toggle language"
    >
      <span className={`px-2 py-0.5 rounded ${current === 'en' ? 'bg-white/25 text-white' : 'text-emerald-100'}`}>EN</span>
      <span className={`px-2 py-0.5 rounded ${current === 'ms' ? 'bg-white/25 text-white' : 'text-emerald-100'}`}>BM</span>
    </button>
  )
}

export default LanguageToggle