import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SettingsPanel from './SettingsPanel.jsx'

function resolveBackDestination(pathname) {
  if (pathname.startsWith('/app/rotas/transporte/')) return '/app/rotas/transporte'
  if (pathname.startsWith('/app/rotas/acessibilidade/')) return '/app/rotas/acessibilidade'
  if (pathname.startsWith('/app/rotas/')) return '/app/rotas'
  return '/app'
}

export default function AppHeader() {
  const { pathname } = useLocation()
  const home = pathname === '/app'
  const notifications = useRef(null)
  const backDestination = resolveBackDestination(pathname)

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="app-header">
        <div className="app-header__inner">
          {home ? (
            <button
              type="button"
              className="app-header__control"
              aria-label="Abrir menu e configurações"
              onClick={() => window.dispatchEvent(new Event('mileva:open-settings'))}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          ) : (
            <Link className="app-header__control" to={backDestination} aria-label="Voltar">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m15 4-8 8 8 8" />
              </svg>
            </Link>
          )}
          <Link className="app-header__logo" to="/app" aria-label="Mileva, início">
            <img src="/img/01_logo_oficial_mileva_branca.png" alt="Mileva" />
          </Link>
          <div className="app-header__right">
            <SettingsPanel />
            {home && (
              <button
                className="app-header__control notification-trigger"
                type="button"
                aria-label="Notificações"
                onClick={() => notifications.current.showModal()}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 17h14l-2-3V9a5 5 0 0 0-10 0v5zM10 20h4" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>
      <dialog className="settings-dialog" ref={notifications}>
        <div className="settings-dialog__head">
          <h2>Notificações</h2>
          <button
            className="icon-button"
            type="button"
            aria-label="Fechar notificações"
            onClick={() => notifications.current.close()}
          >
            ×
          </button>
        </div>
        <p>Nenhuma notificação nesta demonstração.</p>
      </dialog>
    </>
  )
}
