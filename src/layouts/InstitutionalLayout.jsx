import { NavLink, Outlet } from 'react-router-dom'
import BrandHeader from '../components/BrandHeader.jsx'
import SettingsPanel from '../components/SettingsPanel.jsx'

const links = [
  { to: '/sobre', label: 'Sobre' },
  { to: '/impacto', label: 'Impacto' },
  { to: '/equipe', label: 'Equipe' },
]

export default function InstitutionalLayout() {
  return (
    <div className="page-shell institutional-shell">
      <BrandHeader>
        <nav className="institutional-nav" aria-label="Navegação institucional">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to}>
              {label}
            </NavLink>
          ))}
        </nav>
        <SettingsPanel />
      </BrandHeader>
      <main id="conteudo" className="institutional-main site-container">
        <Outlet />
      </main>
      <footer className="site-footer site-container">
        <span>Mileva · Projeto acadêmico FIAP</span>
      </footer>
    </div>
  )
}
