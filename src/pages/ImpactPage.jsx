import ActionLink from '../components/ActionLink.jsx'

const benefits = [
  {
    title: 'Facilitar deslocamentos cotidianos',
    detail: 'Reúne linhas urbanas, paradas e horários previstos em poucos toques no celular.',
  },
  {
    title: 'Melhorar o acesso às informações urbanas',
    detail: 'Centraliza serviços que antes ficavam dispersos em canais separados.',
  },
  {
    title: 'Incentivar caronas e mobilidade compartilhada',
    detail: 'Conecta moradores com rotinas e horários compatíveis entre bairros.',
  },
  {
    title: 'Facilitar o acesso à coleta seletiva',
    detail: 'Apresenta dias de atendimento por região, ecopontos e materiais aceitos.',
  },
  {
    title: 'Promover acessibilidade e inclusão',
    detail: 'Destaca rampas, piso tátil e sinalização sonora com transparência sobre limitações.',
  },
  {
    title: 'Incentivar a participação cidadã',
    detail: 'Oferece fluxo estruturado para moradores sugerirem e validarem pontos acessíveis.',
  },
]

const goals = [
  {
    number: '10',
    title: 'Redução das desigualdades',
    focus: 'Inclusão no espaço urbano por meio de informações claras de acessibilidade e transporte.',
  },
  {
    number: '11',
    title: 'Cidades e comunidades sustentáveis',
    focus: 'Fortalecimento da mobilidade coletiva e dos serviços públicos na cidade-piloto.',
  },
  {
    number: '12',
    title: 'Consumo e produção responsáveis',
    focus: 'Apoio direto ao descarte consciente e à programação regional de coleta seletiva.',
  },
  {
    number: '13',
    title: 'Ação contra a mudança global do clima',
    focus: 'Estímulo à mobilidade compartilhada e ao uso racional de deslocamentos diários.',
  },
]

export default function ImpactPage() {
  return (
    <article className="editorial-page">
      <header className="editorial-hero">
        <div className="editorial-hero__copy">
          <p className="eyebrow">Impacto esperado</p>
          <h1>Uma cidade mais fácil de viver.</h1>
          <p className="lead">
            O Mileva busca tornar a informação urbana mais acessível e apoiar escolhas conscientes de
            mobilidade e serviços no dia a dia.
          </p>
        </div>
        <aside className="editorial-summary-card" aria-label="Nota metodológica sobre o impacto">
          <span className="eyebrow">Transparência do MVP</span>
          <p className="editorial-summary-card__text">
            Os pontos desta página descrevem os <strong>benefícios esperados</strong> pela proposta
            do projeto e seu alinhamento com a Agenda 2030, não representando indicadores já medidos
            em campo.
          </p>
        </aside>
      </header>

      <section className="editorial-section" aria-labelledby="impact-benefits">
        <div className="editorial-section__head">
          <p className="eyebrow">Frentes de transformação</p>
          <h2 id="impact-benefits">O que queremos favorecer</h2>
        </div>
        <div className="editorial-cards-grid">
          {benefits.map((item, index) => (
            <article className="editorial-card" key={item.title}>
              <span className="editorial-card__index">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-section" aria-labelledby="impact-ods">
        <div className="editorial-section__head">
          <p className="eyebrow">Agenda 2030 da ONU</p>
          <h2 id="impact-ods">ODS relacionados à proposta</h2>
        </div>
        <div className="ods-cards-grid">
          {goals.map((goal) => (
            <article className="ods-card" key={goal.number}>
              <span className="ods-card__badge">ODS {goal.number}</span>
              <h3>{goal.title}</h3>
              <p>{goal.focus}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="evidence-area" aria-labelledby="impact-evidence">
        <span className="eyebrow">Validação e pesquisa</span>
        <h2 id="impact-evidence">Resultados e fontes</h2>
        <p>
          Esta área será atualizada pela equipe com dados verificados, fontes públicas e
          aprendizados das entrevistas com moradores quando estiverem disponíveis.
        </p>
        <p className="evidence-area__status">
          Nenhum resultado quantitativo foi publicado nesta etapa demonstrativa.
        </p>
      </section>

      <div className="editorial-actions">
        <ActionLink to="/app">Testar o aplicativo</ActionLink>
        <ActionLink to="/equipe" variant="secondary">
          Conhecer nossa equipe
        </ActionLink>
      </div>
    </article>
  )
}
