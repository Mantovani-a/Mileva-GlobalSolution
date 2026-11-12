import ServiceIcon from './ServiceIcon.jsx'
import { plannedFeatures } from '../data/homeData.js'

export default function FutureRoadmapSection({ compact = false }) {

  return (
    <section
      className={`roadmap-section${compact ? ' roadmap-section--compact' : ''}`}
      aria-labelledby="roadmap-heading"
    >
      <div className="roadmap-section__head">
        <p className="eyebrow">Próximos passos do MVP</p>
        <h2 id="roadmap-heading">Evolução da experiência no aplicativo</h2>
        <p className="section-note">
          Recursos planejados para expandir a navegabilidade e a conexão com a rotina de Pires do
          Rio.
        </p>
      </div>
      <div className="roadmap-grid">
        {plannedFeatures.map((feature, index) => (
          <article className="roadmap-card" key={feature.id}>
            <div className="roadmap-card__top">
              <span className="service-shortcut__icon">
                <ServiceIcon name={feature.icon} />
              </span>
              <div className="roadmap-card__title-group">
                <span className="roadmap-card__phase">{feature.phase}</span>
                <h3>{feature.title}</h3>
              </div>
              <span className="roadmap-card__index" aria-hidden="true">
                0{index + 1}
              </span>
            </div>
            <p className="roadmap-card__summary">{feature.summary}</p>
            <p className="roadmap-card__tech">{feature.technicalScope}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
