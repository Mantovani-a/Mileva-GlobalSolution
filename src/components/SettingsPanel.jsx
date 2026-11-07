import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { applyTheme, getSavedTheme, syncThemeFromStorage } from '../js/visualPreferences.js'

export default function SettingsPanel({ inline = false }) {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(getSavedTheme)
  const [full, setFull] = useState(Boolean(document.fullscreenElement))
  const [desktop, setDesktop] = useState(() => window.matchMedia('(min-width: 768px)').matches)
  const [fullMessage, setFullMessage] = useState('')
  const dialogRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const inFrame = window.self !== window.top
  const preview = inFrame || new URLSearchParams(location.search).get('preview') === 'mobile'
  const fullscreenDocument = inFrame ? window.parent.document : document

  useEffect(() => {
    if (inline) return
    const openPanel = () => setOpen(true)
    window.addEventListener('mileva:open-settings', openPanel)
    return () => window.removeEventListener('mileva:open-settings', openPanel)
  }, [inline])

  useEffect(() => {
    const onStorage = () => {
      syncThemeFromStorage()
      setTheme(getSavedTheme())
    }
    const onFullscreen = () => setFull(Boolean(fullscreenDocument.fullscreenElement))
    onFullscreen()
    window.addEventListener('storage', onStorage)
    window.addEventListener('mileva:theme', onStorage)
    fullscreenDocument.addEventListener('fullscreenchange', onFullscreen)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('mileva:theme', onStorage)
      fullscreenDocument.removeEventListener('fullscreenchange', onFullscreen)
    }
  }, [fullscreenDocument])

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const onChange = () => setDesktop(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
  }

  async function toggleFullscreen() {
    setFullMessage('')
    try {
      if (fullscreenDocument.fullscreenElement) await fullscreenDocument.exitFullscreen()
      else if (fullscreenDocument.documentElement.requestFullscreen)
        await fullscreenDocument.documentElement.requestFullscreen()
      else throw new Error('indisponível')
    } catch {
      setFull(Boolean(fullscreenDocument.fullscreenElement))
      setFullMessage(
        'Não foi possível abrir a tela cheia. Você pode continuar usando o Mileva nesta janela.',
      )
    }
  }

  function togglePreview() {
    setOpen(false)
    if (inFrame) {
      window.parent.postMessage({ type: 'MILEVA_EXIT_PREVIEW' }, window.location.origin)
      return
    }
    const params = new URLSearchParams(location.search)
    if (preview) params.delete('preview')
    else params.set('preview', 'mobile')
    navigate(`${location.pathname}${params.size ? `?${params}` : ''}`)
  }

  if (inline)
    return (
      <>
        <button
          className="profile-setting"
          type="button"
          onClick={toggleTheme}
          aria-pressed={theme === 'dark'}
        >
          <span aria-hidden="true">☾</span>
          <span>Modo escuro</span>
          <span className="switch" aria-hidden="true" />
        </button>
        <button
          className="profile-setting"
          type="button"
          onClick={toggleFullscreen}
          aria-pressed={full}
        >
          <span aria-hidden="true">⛶</span>
          <span>Tela cheia</span>
          <span className="switch" aria-hidden="true" />
        </button>
        {fullMessage && <p role="status">{fullMessage}</p>}
      </>
    )
  return (
    <>
      <button
        className="settings-trigger"
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir configurações"
        title="Configurações"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            d="M10 2h4l.6 2.2 1.8.8 2-.9 2.8 2.8-.9 2 .8 1.8L23 11v4l-2.2.6-.8 1.8.9 2-2.8 2.8-2-.9-1.8.8L14 24h-4l-.6-2.2-1.8-.8-2 .9-2.8-2.8.9-2-.8-1.8L1 15v-4l2.2-.6.8-1.8-.9-2L5.9 4l2 .9 1.8-.8z"
            transform="translate(0 -1) scale(.96)"
          />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
      <dialog
        className="settings-dialog"
        ref={dialogRef}
        onClose={() => setOpen(false)}
        aria-labelledby="settings-title"
      >
        <div className="settings-dialog__head">
          <h2 id="settings-title">Configurações</h2>
          <button
            className="icon-button"
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar configurações"
          >
            ×
          </button>
        </div>
        <p className="settings-dialog__intro">Ajuste a forma de visualizar o Mileva.</p>
        <div className="settings-list">
          <button
            className="settings-row"
            type="button"
            onClick={toggleTheme}
            aria-pressed={theme === 'dark'}
          >
            <span>
              <span aria-hidden="true">◐ </span>Aparência
              <small>{theme === 'dark' ? 'Modo escuro' : 'Modo claro'}</small>
            </span>
            <span className="switch" aria-hidden="true" />
          </button>
          <button
            className="settings-row"
            type="button"
            onClick={togglePreview}
            aria-pressed={preview}
            disabled={(!desktop && !inFrame) || !location.pathname.startsWith('/app')}
          >
            <span>
              <span aria-hidden="true">▯ </span>
              {preview ? 'Sair da visualização mobile' : 'Visualização Mobile'}
            </span>
            <span className="switch" aria-hidden="true" />
          </button>
          <button
            className="settings-row"
            type="button"
            onClick={toggleFullscreen}
            aria-pressed={full}
          >
            <span>
              <span aria-hidden="true">⛶ </span>
              {full ? 'Sair da tela cheia' : 'Entrar em tela cheia'}
            </span>
            <span className="switch" aria-hidden="true" />
          </button>
          <Link
            className="settings-row"
            to="/"
            onClick={(event) => {
              setOpen(false)
              if (inFrame) {
                event.preventDefault()
                window.parent.postMessage({ type: 'MILEVA_GO_PANEL' }, window.location.origin)
              }
            }}
          >
            <span>Voltar ao Painel Demonstrativo</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <p className="settings-dialog__hint">
          A prévia de 390 px está disponível dentro do aplicativo em computadores. No celular, o
          layout já se adapta à tela.
        </p>
        {fullMessage && (
          <p className="settings-dialog__feedback" role="status">
            {fullMessage}
          </p>
        )}
      </dialog>
    </>
  )
}
