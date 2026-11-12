import { Link } from 'react-router-dom'
import ServiceIcon from '../components/ServiceIcon.jsx'
import { demoCatalog } from '../data/catalogData.js'
import { getHubLayers, homeServices, nextBusDemo } from '../data/homeData.js'

const quickDestinations = ['Rodoviária', 'Praça Central', 'Área Escolar', 'Bairro Sul']

const institutionalCards = [
  {
    number: '01',
    to: '/sobre',
    tag: 'Visão de Produto',
    title: 'Sobre o projeto e roadmap do MVP',
    description:
      'Entenda o problema urbano investigado em Pires do Rio – GO, os públicos atendidos e as próximas etapas planejadas.',
    cta: 'Ler sobre o projeto',
  },
  {
    number: '02',
    to: '/impacto',
    tag: 'Sustentabilidade e Inclusão',
    title: 'Impacto esperado e Agenda 2030',
    description:
      'Veja como a mobilidade compartilhada, a coleta seletiva e a acessibilidade se conectam aos ODS 10, 11, 12 e 13.',
    cta: 'Conhecer o impacto',
  },
  {
    number: '03',
    to: '/equipe',
    tag: 'Global Solution FIAP',
    title: 'Nossa equipe e arquitetura técnica',
    description:
      'Conheça os responsáveis pelo desenvolvimento, o design system mobile-first e a estrutura orientada a objetos com Leaflet.',
    cta: 'Ver equipe e stack',
  },
]

export default function WelcomePage() {
  const layers = getHubLayers()
  const totalRecords = demoCatalog.length

  return (
    <div className="welcome-page">
      <section className="welcome" aria-labelledby="welcome-title">
        <div className="welcome__intro">
          <div className="welcome-badge">
            <span className="welcome-badge__dot" aria-hidden="true" />
            <span>MVP INTERATIVO</span>
          </div>
          <h1 id="welcome-title">
            Sua cidade,
            <br />
            <span>no seu caminho.</span>
          </h1>
          <p className="lead">
            O Mileva reúne transporte público, caronas recorrentes, coleta seletiva e acessibilidade
            urbana em uma interface limpa, rápida e desenhada para smartphones.
          </p>
          <div className="welcome__cta-group">
            <Link className="welcome-cta welcome-cta--primary" to="/app">
              <span>Acessar o Mileva</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link className="welcome-cta welcome-cta--secondary" to="/app?preview=mobile">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="6" y="2" width="12" height="20" rx="2.5" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              <span>Testar em Modo Mobile</span>
            </Link>
          </div>
          <dl className="welcome-stats" aria-label="Indicadores da demonstração">
            <div>
              <dt>Módulos urbanos</dt>
              <dd>{layers.length} serviços</dd>
            </div>
            <div>
              <dt>Catálogo</dt>
              <dd>{totalRecords} registros</dd>
            </div>
            <div>
              <dt>Tecnologia</dt>
              <dd>Leaflet + POO</dd>
            </div>
          </dl>
        </div>

        <aside className="welcome-device" aria-label="Demonstração visual da página inicial do aplicativo mobile">
          <div className="welcome-device__chassis">
            <div className="welcome-device__screen">
              <header className="welcome-phone__header">
                <span className="welcome-phone__icon-btn" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 6h18M3 12h18M3 18h18" />
                  </svg>
                </span>
                <span className="welcome-phone__logo">
                  <img src="/img/01_logo_oficial_mileva_branca.png" alt="Mileva" />
                </span>
                <span className="welcome-phone__icon-btn" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 17h14l-2-3V9a5 5 0 0 0-10 0v5zM10 20h4" />
                  </svg>
                </span>
              </header>

              <div className="welcome-phone__hero">
                <strong className="welcome-phone__greeting">Olá, João Carlos!</strong>
                <p className="welcome-phone__subtitle">
                  Planeje seus deslocamentos e rotinas pela cidade.
                </p>
                <p className="welcome-phone__location">
                  <ServiceIcon name="pin" />
                  <span>Pires do Rio – GO</span>
                </p>

                <div className="welcome-phone__search">
                  <ServiceIcon name="search" />
                  <span>Para onde você vai?</span>
                  <span className="welcome-phone__search-arrow" aria-hidden="true">
                    ›
                  </span>
                </div>

                <div className="welcome-phone__chips">
                  {quickDestinations.map((place) => (
                    <span key={place} className="welcome-phone__chip">
                      <ServiceIcon name="pin" />
                      <span>{place}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="welcome-phone__body">
                <div className="welcome-phone__grid">
                  {homeServices.map((service) => (
                    <div className="welcome-phone__card" key={service.id}>
                      <div className="welcome-phone__card-top">
                        <span className="welcome-phone__card-icon">
                          <ServiceIcon name={service.icon} />
                        </span>
                        <span className="welcome-phone__card-arrow" aria-hidden="true">
                          ›
                        </span>
                      </div>
                      <strong>{service.title}</strong>
                    </div>
                  ))}
                </div>

                <div className="welcome-phone__bus">
                  <div className="welcome-phone__bus-top">
                    <span className="welcome-phone__bus-icon">
                      <ServiceIcon name="bus" />
                    </span>
                    <div className="welcome-phone__bus-copy">
                      <strong>Próximo ônibus</strong>
                      <span>{nextBusDemo.line}</span>
                      <span>{nextBusDemo.route}</span>
                    </div>
                    <span className="welcome-phone__bus-time">{nextBusDemo.estimatedArrival}</span>
                  </div>
                  <div className="welcome-phone__bus-track" aria-hidden="true">
                    <span style={{ width: `${nextBusDemo.progress}%` }} />
                  </div>
                  <div className="welcome-phone__bus-footer">
                    <small>Previsão simulada · sem dados ao vivo</small>
                    <span className="welcome-phone__bus-link">
                      Ver no mapa <span aria-hidden="true">›</span>
                    </span>
                  </div>
                </div>

                <div className="welcome-phone__dock" aria-hidden="true">
                  <span className="welcome-phone__dock-item is-active">
                    <svg viewBox="0 0 24 24">
                      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
                    </svg>
                    <span>Início</span>
                  </span>
                  <span className="welcome-phone__dock-item">
                    <svg viewBox="0 0 24 24">
                      <path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2zM9 3v16M15 5v16" />
                    </svg>
                    <span>Rotas</span>
                  </span>
                  <span className="welcome-phone__dock-item">
                    <svg viewBox="0 0 24 24">
                      <path d="m12 2 3 6.2 6.8 1-4.9 4.8 1.1 6.8-6-3.2-6 3.2 1.1-6.8-4.9-4.8 6.8-1z" />
                    </svg>
                    <span>Favoritos</span>
                  </span>
                  <span className="welcome-phone__dock-item">
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
                    </svg>
                    <span>Perfil</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="welcome-section" aria-labelledby="welcome-modules-title">
        <div className="welcome-section__head">
          <div>
            <p className="eyebrow">Ecossistema de Mobilidade e Cidade</p>
            <h2 id="welcome-modules-title">Quatro serviços conectados no seu bolso</h2>
          </div>
          <Link className="welcome-section__link" to="/app/rotas">
            Explorar todos no mapa ›
          </Link>
        </div>
        <div className="welcome-modules-grid">
          {layers.map((layer) => (
            <article className="welcome-module-card" key={layer.id}>
              <div className="welcome-module-card__top">
                <span className="service-shortcut__icon">
                  <ServiceIcon name={layer.icon} />
                </span>
                <span className="welcome-module-card__badge">
                  {layer.count} {layer.unit}
                </span>
              </div>
              <h3>{layer.title}</h3>
              <p>{layer.description}</p>
              <Link className="welcome-module-card__cta" to={layer.to}>
                <span>Acessar {layer.label}</span>
                <span aria-hidden="true">›</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="welcome-section" aria-labelledby="welcome-context-title">
        <div className="welcome-section__head">
          <div>
            <p className="eyebrow">Documentação e Contexto</p>
            <h2 id="welcome-context-title">Conheça os fundamentos do Mileva</h2>
          </div>
        </div>
        <div className="welcome-entries-grid" role="navigation" aria-label="Páginas institucionais">
          {institutionalCards.map(({ number, to, tag, title, description, cta }) => (
            <Link className="welcome-context-card" to={to} key={to}>
              <div className="welcome-context-card__top">
                <span className="welcome-context-card__num">{number}</span>
                <span className="welcome-context-card__tag">{tag}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="welcome-context-card__cta">
                <span>{cta}</span>
                <ServiceIcon name="arrowUpRight" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
