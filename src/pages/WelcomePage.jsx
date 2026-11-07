import { Link } from 'react-router-dom'

const entries = [
  {
    to: '/app',
    title: 'Acessar o Mileva',
    description: 'Explore nossa plataforma de mobilidade e serviços urbanos.',
    primary: true,
  },
  {
    to: '/sobre',
    title: 'Sobre o projeto',
    description: 'Conheça nossa solução e quem queremos ajudar.',
  },
  { to: '/equipe', title: 'Nossa equipe', description: 'Conheça as pessoas por trás do Mileva.' },
]

export default function WelcomePage() {
  return (
    <section className="welcome" aria-labelledby="welcome-title">
      <div className="welcome__intro">
        <p className="eyebrow">Painel Demonstrativo</p>
        <h1 id="welcome-title">
          Sua cidade,
          <br />
          no seu caminho.
        </h1>
        <p className="lead">
          O Mileva reúne mobilidade e serviços urbanos em uma experiência pensada para o dia a dia.
        </p>
        <div className="route-art" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
      <nav className="welcome__entries" aria-label="Explorar o Mileva">
        {entries.map(({ to, title, description, primary }) => (
          <Link
            className={`welcome-entry${primary ? ' welcome-entry--primary' : ''}`}
            to={to}
            key={to}
          >
            <span>
              <strong>{title}</strong>
              <small>{description}</small>
            </span>
            <span className="welcome-entry__arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        ))}
      </nav>
    </section>
  )
}
