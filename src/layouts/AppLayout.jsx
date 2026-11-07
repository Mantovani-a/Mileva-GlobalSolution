import { Outlet } from 'react-router-dom'
import AppHeader from '../components/AppHeader.jsx'
import AppDock from '../components/AppDock.jsx'

export default function AppLayout() {
  return (
    <div className="page-shell app-shell">
      <AppHeader />
      <main id="conteudo" className="app-main site-container">
        <Outlet />
      </main>
      <footer className="app-footer site-container">Mileva · Demonstração</footer>
      <AppDock />
    </div>
  )
}
