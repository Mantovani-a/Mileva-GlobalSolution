const benefits = [
  'Facilitar deslocamentos cotidianos',
  'Melhorar o acesso às informações urbanas',
  'Incentivar caronas e mobilidade compartilhada',
  'Facilitar o acesso à coleta seletiva',
  'Promover acessibilidade e inclusão',
  'Incentivar a participação cidadã',
]
const goals = [
  { number: '10', title: 'Redução das desigualdades' },
  { number: '11', title: 'Cidades e comunidades sustentáveis' },
  { number: '12', title: 'Consumo e produção responsáveis' },
  { number: '13', title: 'Ação contra a mudança global do clima' },
]

export default function ImpactPage() {
  return (
    <article className="editorial-page">
      <header className="page-intro">
        <p className="eyebrow">Impacto esperado</p>
        <h1>Uma cidade mais fácil de viver.</h1>
        <p className="lead">
          O Mileva busca tornar a informação urbana mais acessível e apoiar escolhas de mobilidade e
          serviços no dia a dia.
        </p>
        <p className="section-note">
          Os pontos abaixo são benefícios esperados do projeto, não resultados já medidos.
        </p>
      </header>
      <section className="editorial-section" aria-labelledby="impact-benefits">
        <h2 id="impact-benefits">O que queremos favorecer</h2>
        <ul className="text-columns">
          {benefits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="editorial-section" aria-labelledby="impact-ods">
        <p className="eyebrow">Agenda 2030</p>
        <h2 id="impact-ods">ODS relacionados à proposta</h2>
        <div className="ods-list">
          {goals.map((goal) => (
            <div className="ods-item" key={goal.number}>
              <strong>ODS {goal.number}</strong>
              <span>{goal.title}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="evidence-area" aria-labelledby="impact-evidence">
        <h2 id="impact-evidence">Resultados e fontes</h2>
        <p>
          Esta área será atualizada pela equipe com dados verificados, fontes e aprendizados das
          entrevistas quando estiverem disponíveis.
        </p>
        <p className="evidence-area__status">
          Nenhum resultado quantitativo foi publicado nesta etapa.
        </p>
      </section>
    </article>
  )
}
