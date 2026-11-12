import ActionLink from '../components/ActionLink.jsx'
import TeamMember from '../components/TeamMember.jsx'
import { teamContext, teamMembers } from '../data/teamData.js'

export default function TeamPage() {
  return (
    <article className="team-page">
      <header className="editorial-hero team-page__hero">
        <div className="editorial-hero__copy">
          <p className="eyebrow">O time por trás do Mileva</p>
          <h1>
            Nossa <span>Equipe</span>
          </h1>
          <p className="lead">
            Conheça as pessoas que participam do desenvolvimento do Mileva e suas responsabilidades
            na construção do projeto.
          </p>
        </div>
        <aside className="editorial-summary-card team-summary-card" aria-label="Contexto acadêmico">
          <span className="eyebrow">{teamContext.course}</span>
          <dl className="editorial-summary-list">
            <div>
              <dt>Integrantes</dt>
              <dd>{teamMembers.length} membros</dd>
            </div>
            <div>
              <dt>Padrão de código</dt>
              <dd>POO + Camadas de Domínio</dd>
            </div>
            <div>
              <dt>Design System</dt>
              <dd>Mobile-First · Zero Emojis</dd>
            </div>
          </dl>
        </aside>
      </header>

      <section aria-label="Integrantes da equipe" className="team-grid">
        {teamMembers.map((member) => (
          <TeamMember key={member.name} member={member} />
        ))}
      </section>

      <section className="team-technologies" aria-labelledby="team-tech-title">
        <div>
          <p className="eyebrow">{teamContext.course}</p>
          <h2 id="team-tech-title">Tecnologias e arquitetura da interface</h2>
          <p>
            Ferramentas e padrões aplicados na construção do front-end mobile-first e dos mapas
            interativos do Mileva.
          </p>
        </div>
        <ul>
          {teamContext.technologies.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {teamContext.pitchUrl && (
        <p>
          <a href={teamContext.pitchUrl}>Assistir ao vídeo pitch</a>
        </p>
      )}

      <div className="editorial-actions">
        <ActionLink to="/app">Explorar o aplicativo</ActionLink>
        <ActionLink to="/sobre" variant="secondary">
          Sobre o projeto
        </ActionLink>
      </div>
    </article>
  )
}
