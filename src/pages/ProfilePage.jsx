import { Link } from 'react-router-dom'
import SettingsPanel from '../components/SettingsPanel.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'

export default function ProfilePage() {
  const openSettings = () => window.dispatchEvent(new Event('mileva:open-settings'))
  return (
    <section className="profile-page compact-profile">
      <h1 className="visually-hidden">Perfil e configurações</h1>
      <button
        className="profile-identity"
        type="button"
        onClick={openSettings}
        aria-label="João Carlos, abrir configurações"
      >
        <span className="profile-avatar" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="7" r="4" />
            <path d="M4 22v-3a8 8 0 0 1 16 0v3z" />
          </svg>
        </span>
        <span>
          <strong>João Carlos</strong>
          <small>Pires do Rio – GO</small>
        </span>
        <span aria-hidden="true">›</span>
      </button>
      <nav className="profile-links" aria-label="Perfil e configurações">
        <Link to="/app/favoritos">
          <span className="profile-link__icon" aria-hidden="true">
            <ServiceIcon name="star" />
          </span>
          <span>Meus favoritos</span>
          <span aria-hidden="true">›</span>
        </Link>
        <button type="button" onClick={openSettings}>
          <span className="profile-link__icon" aria-hidden="true">
            <ServiceIcon name="settings" />
          </span>
          <span>Configurações</span>
          <span aria-hidden="true">›</span>
        </button>
        <SettingsPanel inline />
        <Link to="/sobre">
          <span className="profile-link__icon" aria-hidden="true">
            <ServiceIcon name="info" />
          </span>
          <span>Sobre o Mileva</span>
          <span aria-hidden="true">›</span>
        </Link>
        <Link to="/equipe">
          <span className="profile-link__icon" aria-hidden="true">
            <ServiceIcon name="team" />
          </span>
          <span>Nossa equipe</span>
          <span aria-hidden="true">›</span>
        </Link>
      </nav>
      <p className="compact-disclaimer">Perfil demonstrativo</p>
    </section>
  )
}
