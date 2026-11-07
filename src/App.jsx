import MobilePreview from './components/MobilePreview.jsx'
import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import InstitutionalLayout from './layouts/InstitutionalLayout.jsx'
import AppLayout from './layouts/AppLayout.jsx'
import WelcomePage from './pages/WelcomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ImpactPage from './pages/ImpactPage.jsx'
import TeamPage from './pages/TeamPage.jsx'
import AppHomePage from './pages/AppHomePage.jsx'
import RoutesPage from './pages/RoutesPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import TransitPage from './pages/TransitPage.jsx'
import TransitDetailPage from './pages/TransitDetailPage.jsx'
import RidesPage from './pages/RidesPage.jsx'
import CollectionPage from './pages/CollectionPage.jsx'
import AccessibilityPage from './pages/AccessibilityPage.jsx'
import AccessibleDetailPage from './pages/AccessibleDetailPage.jsx'
import AccessibilityRegistration from './pages/AccessibilityRegistration.jsx'
import DemoVerificationPanel from './pages/DemoVerificationPanel.jsx'
import { syncThemeFromStorage } from './js/visualPreferences.js'

export default function App() {
  const location = useLocation()
  const [desktop, setDesktop] = useState(() => window.matchMedia('(min-width: 768px)').matches)

  useEffect(() => {
    syncThemeFromStorage()
    const query = window.matchMedia('(min-width: 768px)')
    const onChange = () => setDesktop(query.matches)
    query.addEventListener('change', onChange)
    window.addEventListener('storage', syncThemeFromStorage)
    return () => {
      query.removeEventListener('change', onChange)
      window.removeEventListener('storage', syncThemeFromStorage)
    }
  }, [])

  const preview =
    window.self === window.top &&
    desktop &&
    location.pathname.startsWith('/app') &&
    new URLSearchParams(location.search).get('preview') === 'mobile'
  if (preview) return <MobilePreview />

  return (
    <Routes>
      <Route element={<InstitutionalLayout />}>
        <Route index element={<WelcomePage />} />
        <Route path="sobre" element={<AboutPage />} />
        <Route path="impacto" element={<ImpactPage />} />
        <Route path="equipe" element={<TeamPage />} />
      </Route>
      <Route path="app" element={<AppLayout />}>
        <Route index element={<AppHomePage />} />
        <Route path="rotas" element={<RoutesPage />} />
        <Route path="rotas/transporte" element={<TransitPage />} />
        <Route path="rotas/transporte/:id" element={<TransitDetailPage />} />
        <Route path="rotas/caronas" element={<RidesPage />} />
        <Route path="rotas/coleta" element={<CollectionPage />} />
        <Route path="rotas/acessibilidade" element={<AccessibilityPage />} />
        <Route path="rotas/acessibilidade/solicitar" element={<AccessibilityRegistration />} />
        <Route path="rotas/acessibilidade/analise" element={<DemoVerificationPanel />} />
        <Route path="rotas/acessibilidade/:id" element={<AccessibleDetailPage />} />
        <Route path="favoritos" element={<FavoritesPage />} />
        <Route path="perfil" element={<ProfilePage />} />
      </Route>
      <Route element={<InstitutionalLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
