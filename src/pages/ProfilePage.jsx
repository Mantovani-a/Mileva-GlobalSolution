import { Link } from 'react-router-dom'
import SettingsPanel from '../components/SettingsPanel.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'

export default function ProfilePage() {
  const openSettings = () => window.dispatchEvent(new Event('mileva:open-settings'))

  function handleInstitutionalNav(event, targetPath) {
    if (window.self !== window.top) {
      event.preventDefault()
      window.parent.postMessage({ type: 'MILEVA_GO_PANEL', to: targetPath }, window.location.origin)
    }
  }

  return (
    <section className="profile-page compact-profile">
      <h1 className="visually-hidden">Perfil e configurações</h1>
      <div className="profile-page__intro">
        <span>Minha conta</span>
        <h2>Perfil e preferências</h2>
      </div>
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
      <div className="profile-page__sections">
        <section className="profile-section" aria-labelledby="profile-account-title">
          <h2 id="profile-account-title">Conta</h2>
          <nav className="profile-links" aria-label="Conta">
            <Link to="/app/favoritos">
              <span className="profile-link__icon" aria-hidden="true">
                <ServiceIcon name="star" />
              </span>
              <span>Meus favoritos</span>
              <span aria-hidden="true">›</span>
            </Link>
          </nav>
        </section>
        <section className="profile-section" aria-labelledby="profile-preferences-title">
          <h2 id="profile-preferences-title">Preferências</h2>
          <nav className="profile-links" aria-label="Preferências">
            <button type="button" onClick={openSettings}>
              <span className="profile-link__icon" aria-hidden="true">
                <ServiceIcon name="settings" />
              </span>
              <span>Configurações</span>
              <span aria-hidden="true">›</span>
            </button>
            <SettingsPanel inline />
          </nav>
        </section>
        <section className="profile-section" aria-labelledby="profile-institution-title">
          <h2 id="profile-institution-title">Institucional</h2>
          <nav className="profile-links" aria-label="Institucional">
            <Link to="/sobre" onClick={(event) => handleInstitutionalNav(event, '/sobre')}>
              <span className="profile-link__icon" aria-hidden="true">
                <ServiceIcon name="info" />
              </span>
              <span>Sobre o Mileva</span>
              <span aria-hidden="true">›</span>
            </Link>
            <Link to="/impacto" onClick={(event) => handleInstitutionalNav(event, '/impacto')}>
              <span className="profile-link__icon" aria-hidden="true">
                <ServiceIcon name="layers" />
              </span>
              <span>Impacto e ODS</span>
              <span aria-hidden="true">›</span>
            </Link>
            <Link to="/equipe" onClick={(event) => handleInstitutionalNav(event, '/equipe')}>
              <span className="profile-link__icon" aria-hidden="true">
                <ServiceIcon name="team" />
              </span>
              <span>Nossa equipe</span>
              <span aria-hidden="true">›</span>
            </Link>
          </nav>
        </section>
      </div>
      <p className="compact-disclaimer">Perfil demonstrativo</p>
    </section>
  )
}
