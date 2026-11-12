import { Link } from 'react-router-dom'

export default function BrandHeader({ destination = '/', children }) {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="site-header">
        <div className="site-container site-header__inner">
          <div className="site-header__brand-group">
            <Link
              className="site-header__brand"
              to={destination}
              aria-label="Mileva, ir para o início"
            >
              <img src="/img/01_logo_oficial_mileva_branca.png" alt="Mileva" />
            </Link>
            <span className="site-header__badge">Piloto · Pires do Rio – GO</span>
          </div>
          {children}
        </div>
      </header>
    </>
  )
}
