import { Link } from 'react-router-dom'

export default function BrandHeader({ destination = '/', children }) {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="site-header">
        <div className="site-container site-header__inner">
          <Link
            className="site-header__brand"
            to={destination}
            aria-label="Mileva, ir para o início"
          >
            <img src="/img/01_logo_oficial_mileva_branca.png" alt="Mileva" />
          </Link>
          {children}
        </div>
      </header>
    </>
  )
}
