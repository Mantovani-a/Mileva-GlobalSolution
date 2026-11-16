import { Link, NavLink } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites.js'
import { appNavItems, DockIcon } from './AppDock.jsx'
import ServiceIcon from './ServiceIcon.jsx'

const services = [
  { to: '/app/rotas/transporte', label: 'Transporte', icon: 'bus' },
  { to: '/app/rotas/caronas', label: 'Caronas', icon: 'car' },
  { to: '/app/rotas/coleta', label: 'Coleta seletiva', icon: 'recycle' },
  { to: '/app/rotas/acessibilidade', label: 'Acessibilidade', icon: 'accessibility' },
]

export default function AppSidebar() {
  const { favorites } = useFavorites()

  return (
    <aside className="app-sidebar" aria-label="Navegação desktop">
      <Link className="app-sidebar__brand" to="/app" aria-label="Mileva, início">
        <img src="/img/01_logo_oficial_mileva_branca.png" alt="Mileva" />
      </Link>
      <p className="app-sidebar__place"><ServiceIcon name="pin" /> Pires do Rio – GO</p>
      <nav aria-label="Páginas principais" className="app-sidebar__nav">
        <span className="app-sidebar__label">Navegação</span>
        {appNavItems.map(({ to, label, icon, end, showCount }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `app-sidebar__link${isActive ? ' is-active' : ''}`}>
            <DockIcon name={icon} />
            <span>{label}</span>
            {showCount && favorites.length > 0 && <small>{favorites.length}</small>}
          </NavLink>
        ))}
      </nav>
      <nav aria-label="Serviços urbanos" className="app-sidebar__nav app-sidebar__services">
        <span className="app-sidebar__label">Serviços urbanos</span>
        {services.map(({ to, label, icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `app-sidebar__link${isActive ? ' is-active' : ''}`}>
            <ServiceIcon name={icon} /><span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <Link className="app-sidebar__profile" to="/app/perfil">
        <span className="app-sidebar__avatar" aria-hidden="true">JC</span>
        <span><strong>João Carlos</strong><small>Perfil demonstrativo</small></span>
        <ServiceIcon name="chevronRight" />
      </Link>
    </aside>
  )
}
