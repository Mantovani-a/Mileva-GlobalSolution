export default function TeamMember({ member }) {
  return (
    <article className="team-card">
      <div className="team-card__portrait">
        <img src={member.photo} alt={`Retrato de ${member.name}`} loading="lazy" />
      </div>
      <div className="team-card__text">
        <h2>{member.name}</h2>
        <p>{member.responsibility}</p>
        {member.description && <p className="team-card__description">{member.description}</p>}
      </div>
    </article>
  )
}
