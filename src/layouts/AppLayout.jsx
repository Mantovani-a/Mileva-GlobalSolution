import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AppHeader from '../components/AppHeader.jsx'
import AppDock from '../components/AppDock.jsx'

export default function AppLayout() {
  const { pathname } = useLocation()
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  useEffect(() => {
    let timerId = null
    function onToast(event) {
      const text = event.detail?.message
      if (!text) return
      setToastMessage(text)
      if (timerId) window.clearTimeout(timerId)
      timerId = window.setTimeout(() => setToastMessage(''), 2800)
    }
    window.addEventListener('mileva:toast', onToast)
    return () => {
      window.removeEventListener('mileva:toast', onToast)
      if (timerId) window.clearTimeout(timerId)
    }
  }, [])

  return (
    <div className="page-shell app-shell">
      <AppHeader />
      <main id="conteudo" className="app-main site-container">
        <Outlet />
      </main>
      {toastMessage && (
        <div className="app-toast" role="status" aria-live="polite">
          <span>{toastMessage}</span>
        </div>
      )}
      <footer className="app-footer site-container">Mileva · Demonstração</footer>
      <AppDock />
    </div>
  )
}
