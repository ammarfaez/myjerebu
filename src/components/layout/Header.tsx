import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import { CloudSun, CalendarDays, Info } from 'lucide-react'
import LanguageToggle from './LanguageToggle'

function Header() {
  const { t } = useTranslation()

  const navItems = [
    { to: '/', label: t('nav.home'), icon: <CalendarDays className="w-4 h-4" /> },
    { to: '/health', label: t('nav.about'), icon: <Info className="w-4 h-4" /> },
  ]

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-teal-700 to-emerald-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white">
          <CloudSun className="w-8 h-8" />
          <span className="text-lg font-bold tracking-tight">{t('appTitle')}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'bg-white/20 text-white' : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <LanguageToggle />
      </div>
    </header>
  )
}

export default Header