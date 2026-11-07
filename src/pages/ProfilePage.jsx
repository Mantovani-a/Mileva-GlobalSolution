import { Link } from 'react-router-dom'
import SettingsPanel from '../components/SettingsPanel.jsx'
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
          <span aria-hidden="true">☆</span>Meus favoritos<span aria-hidden="true">›</span>
        </Link>
        <button type="button" onClick={openSettings}>
          <span aria-hidden="true">⚙</span>Configurações<span aria-hidden="true">›</span>
        </button>
        <SettingsPanel inline />
        <Link to="/sobre">
          <span aria-hidden="true">ⓘ</span>Sobre o Mileva<span aria-hidden="true">›</span>
        </Link>
        <Link to="/equipe">
          <span aria-hidden="true">♧</span>Nossa equipe<span aria-hidden="true">›</span>
        </Link>
      </nav>
      <p className="compact-disclaimer">Perfil demonstrativo</p>
    </section>
  )
}
