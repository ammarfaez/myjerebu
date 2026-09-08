import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { lazy, Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './i18n'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import LoadingSpinner from './components/ui/LoadingSpinner'

const HomePage = lazy(() => import('./pages/HomePage'))
const StationPage = lazy(() => import('./pages/StationPage'))
const HealthPage = lazy(() => import('./pages/HealthPage'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

function LanguageLoader() {
  const { i18n } = useTranslation()
  useEffect(() => {
    const saved = localStorage.getItem('lang')
    if (saved && (saved === 'en' || saved === 'ms')) {
      i18n.changeLanguage(saved)
    }
  }, [i18n])
  return null
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LanguageLoader />
        <div className="min-h-screen flex flex-col bg-slate-50">
          <Header />
          <main className="flex-1">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/station/:id" element={<StationPage />} />
              <Route path="/health" element={<HealthPage />} />
              <Route
                path="*"
                element={
                  <div className="flex items-center justify-center py-20">
                    <p className="text-slate-500">404 — Page not found</p>
                  </div>
                }
              />
            </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App