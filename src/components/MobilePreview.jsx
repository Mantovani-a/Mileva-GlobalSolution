import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// O iframe oferece um viewport real de 390 px para as media queries do aplicativo.
export default function MobilePreview() {
  const frameRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const frameSource = useRef(
    (() => {
      const params = new URLSearchParams(location.search)
      params.delete('preview')
      params.set('embedded', '1')
      return `${location.pathname}?${params}`
    })(),
  )

  function exitPreview() {
    let destination = location.pathname
    try {
      const current = frameRef.current?.contentWindow?.location
      if (current) {
        const params = new URLSearchParams(current.search)
        params.delete('embedded')
        params.delete('preview')
        destination = `${current.pathname}${params.size ? `?${params}` : ''}${current.hash}`
      }
    } catch {
      /* Mesma rota como alternativa. */
    }
    navigate(destination, { replace: true })
  }

  useEffect(() => {
    function onMessage(event) {
      if (
        event.origin !== window.location.origin ||
        event.source !== frameRef.current?.contentWindow
      )
        return
      if (event.data?.type === 'MILEVA_EXIT_PREVIEW') exitPreview()
      if (event.data?.type === 'MILEVA_GO_PANEL') navigate('/')
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  })

  return (
    <div className="mobile-preview">
      <div className="mobile-preview__bar">
        <span>Visualização Mobile · 390 × 844</span>
        <button type="button" onClick={exitPreview}>
          Sair da visualização mobile
        </button>
      </div>
      <iframe
        ref={frameRef}
        title="Prévia interativa do aplicativo Mileva em largura mobile"
        src={frameSource.current}
        allow="fullscreen"
      />
    </div>
  )
}
