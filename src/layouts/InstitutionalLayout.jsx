import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import BrandHeader from '../components/BrandHeader.jsx'
import SettingsPanel from '../components/SettingsPanel.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'

const links = [
  { to: '/', label: 'Início', end: true },
  { to: '/sobre', label: 'Sobre' },
  { to: '/impacto', label: 'Impacto' },
  { to: '/equipe', label: 'Equipe' },
]

function resolveActiveIndex(pathname) {
  if (pathname === '/') return 0
  if (pathname.startsWith('/sobre')) return 1
  if (pathname.startsWith('/impacto')) return 2
  if (pathname.startsWith('/equipe')) return 3
  return -1
}

export default function InstitutionalLayout() {
  const { pathname } = useLocation()
  const activeIndex = resolveActiveIndex(pathname)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <div className="page-shell institutional-shell">
      <BrandHeader>
        <nav
          className="institutional-nav"
          aria-label="Navegação institucional"
          style={{ '--active-index': Math.max(0, activeIndex) }}
          data-has-active={activeIndex >= 0 ? 'true' : 'false'}
        >
          <span className="institutional-nav__indicator" aria-hidden="true" />
          {links.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="site-header__actions">
          <Link className="site-header__cta site-header__cta--ghost" to="/app?preview=mobile">
            Modo Mobile
          </Link>
          <Link className="site-header__cta site-header__cta--primary" to="/app">
            <span>Abrir App</span>
            <ServiceIcon name="arrowUpRight" />
          </Link>
          <SettingsPanel />
        </div>
      </BrandHeader>
      <main id="conteudo" className="institutional-main site-container">
        <div key={pathname} className="page-transition-stage">
          <Outlet />
        </div>
      </main>
      <footer className="site-footer">
        <div className="site-container site-footer__inner">
          <div className="site-footer__brand">
            <strong>Mileva · Mobilidade e Serviços Urbanos</strong>
            <span>Projeto acadêmico FIAP · Cidade-piloto demonstrativa: Pires do Rio – GO</span>
          </div>
          <nav className="site-footer__links" aria-label="Atalhos do rodapé">
            <Link to="/">Início</Link>
            <Link to="/sobre">Sobre</Link>
            <Link to="/impacto">Impacto</Link>
            <Link to="/equipe">Equipe</Link>
            <Link to="/app">Abrir Aplicativo</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
