import TeamMember from '../components/TeamMember.jsx'
import { teamContext, teamMembers } from '../js/teamData.js'

export default function TeamPage() {
  return (
    <article className="team-page">
      <header className="team-page__intro">
        <p className="eyebrow">O time por trás do Mileva</p>
        <h1>
          Nossa <span>Equipe</span>
        </h1>
        <p>
          Conheça as pessoas que participam do desenvolvimento do Mileva e suas responsabilidades no
          projeto.
        </p>
      </header>
      <section aria-label="Integrantes da equipe" className="team-grid">
        {teamMembers.map((member) => (
          <TeamMember key={member.name} member={member} />
        ))}
      </section>
      <section className="team-technologies" aria-labelledby="team-tech-title">
        <div>
          <p className="eyebrow">Global Solution FIAP 2026/2</p>
          <h2 id="team-tech-title">Tecnologias da interface</h2>
          <p>Ferramentas utilizadas no front-end do Mileva.</p>
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
    </article>
  )
}
