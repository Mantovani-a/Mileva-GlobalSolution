import { NavLink } from 'react-router-dom'

const items = [
  { to: '/app', label: 'Início', icon: 'home', end: true },
  { to: '/app/rotas', label: 'Rotas', icon: 'route' },
  { to: '/app/favoritos', label: 'Favoritos', icon: 'heart' },
  { to: '/app/perfil', label: 'Perfil', icon: 'person' },
]

function DockIcon({ name }) {
  const paths = {
    home: (
      <>
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
      </>
    ),
    route: (
      <>
        <path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2zM9 3v16M15 5v16" />
      </>
    ),
    heart: <path d="m12 2 3 6.2 6.8 1-4.9 4.8 1.1 6.8-6-3.2-6 3.2 1.1-6.8-4.9-4.8 6.8-1z" />,
    person: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

export default function AppDock() {
  return (
    <nav className="app-dock" aria-label="Navegação do aplicativo">
      {items.map(({ to, label, icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => `app-dock__link${isActive ? ' is-active' : ''}`}
        >
          <DockIcon name={icon} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
