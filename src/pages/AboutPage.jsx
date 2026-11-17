import ActionLink from '../components/ActionLink.jsx'
import FutureRoadmapSection from '../components/FutureRoadmapSection.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'

const audiences = [
  {
    title: 'Trabalhadores',
    detail: 'Consulta rápida de horários de linhas e caronas recorrentes para o deslocamento diário.',
  },
  {
    title: 'Estudantes',
    detail: 'Trajetos conectados até instituições de ensino e combinação de modais pela cidade.',
  },
  {
    title: 'Usuários do transporte público',
    detail: 'Visualização de paradas numeradas, previsão ilustrativa e itinerários no mapa.',
  },
  {
    title: 'Idosos',
    detail: 'Interface direta, alto contraste e leitura simplificada sem excesso de etapas.',
  },
  {
    title: 'Pessoas com deficiência',
    detail: 'Mapeamento de rampas, piso tátil, orientação sonora e condições reais de percurso.',
  },
  {
    title: 'Moradores da cidade',
    detail: 'Programação de coleta seletiva por região, pontos de apoio e participação comunitária.',
  },
]

const features = [
  {
    icon: 'bus',
    title: 'Transporte público e itinerários',
    detail: 'Linhas urbanas, paradas sequenciais e horários previstos.',
  },
  {
    icon: 'car',
    title: 'Caronas recorrentes',
    detail: 'Conexão entre vizinhos que compartilham o mesmo trajeto semanal.',
  },
  {
    icon: 'recycle',
    title: 'Coleta seletiva',
    detail: 'Dias de atendimento por setor, faixas de horário e pontos de descarte.',
  },
  {
    icon: 'accessibility',
    title: 'Rotas e locais acessíveis',
    detail: 'Consulta por necessidade específica e transparência sobre trechos avaliados.',
  },
  {
    icon: 'pin',
    title: 'Rotas e informações úteis da cidade',
    detail: 'Mapa integrado em Leaflet centrado em Pires do Rio – GO.',
  },
  {
    icon: 'clipboard',
    title: 'Participação comunitária',
    detail: 'Fluxo em etapas para sugerir novos locais ou trechos acessíveis.',
  },
]

export default function AboutPage() {
  return (
    <article className="editorial-page">
      <header className="editorial-hero">
        <div className="editorial-hero__copy">
          <p className="eyebrow">Sobre o projeto</p>
          <h1>Mobilidade e cidade em um só lugar.</h1>
          <p className="lead">
            O Mileva é uma plataforma em desenvolvimento que reúne trajetos e informações sobre
            serviços urbanos em uma experiência simples, pensada prioritariamente para smartphones.
          </p>
        </div>
        <aside className="editorial-summary-card" aria-label="Resumo técnico do projeto">
          <span className="eyebrow">Ficha do MVP</span>
          <dl className="editorial-summary-list">
            <div>
              <dt>Cidade-piloto</dt>
              <dd>Pires do Rio, Goiás</dd>
            </div>
            <div>
              <dt>Foco de uso</dt>
              <dd>Smartphones (Mobile-First)</dd>
            </div>
            <div>
              <dt>Arquitetura</dt>
              <dd>POO + Mapas Leaflet</dd>
            </div>
            <div>
              <dt>Estágio atual</dt>
              <dd>Demonstração interativa</dd>
            </div>
          </dl>
        </aside>
      </header>

      <div className="editorial-grid">
        <section className="editorial-box" aria-labelledby="about-what">
          <span className="section-number">01</span>
          <h2 id="about-what">O que é o Mileva?</h2>
          <p>
            Uma proposta para aproximar as pessoas das opções de deslocamento e dos serviços urbanos
            do cotidiano, começando por uma cidade-piloto demonstrativa: Pires do Rio, Goiás.
          </p>
        </section>
        <section className="editorial-box" aria-labelledby="about-problem">
          <span className="section-number">02</span>
          <h2 id="about-problem">Qual problema queremos resolver?</h2>
          <p>
            Informações sobre transporte, caronas, coleta seletiva e acessibilidade costumam estar
            espalhadas em fontes diferentes. O Mileva busca reuni-las de forma clara e
            contextualizada.
          </p>
        </section>
      </div>

      <section className="editorial-section" aria-labelledby="about-people">
        <div className="editorial-section__head">
          <p className="eyebrow">Para quem</p>
          <h2 id="about-people">Informação útil para mais pessoas</h2>
        </div>
        <div className="editorial-cards-grid">
          {audiences.map((item, index) => (
            <article className="editorial-card" key={item.title}>
              <span className="editorial-card__index">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-section" aria-labelledby="about-features">
        <div className="editorial-split">
          <div>
            <p className="eyebrow">O que estamos construindo</p>
            <h2 id="about-features">Recursos previstos no ecossistema</h2>
            <p className="section-note">
              Essas funcionalidades são desenvolvidas por etapas. As informações exibidas no
              aplicativo representam cenários simulados para validação de fluxo e interface.
            </p>
            <div className="editorial-feature-list">
              {features.map((item) => (
                <div className="editorial-feature-item" key={item.title}>
                  <span className="editorial-feature-item__icon">
                    <ServiceIcon name={item.icon} />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="editorial-callout">
            <span className="eyebrow">Posicionamento</span>
            <h2>Como se diferencia do Google Maps?</h2>
            <p>
              O Mileva não pretende substituí-lo. Enquanto mapas globais focam no trânsito geral, a
              proposta do Mileva é integrar serviços públicos e comunitários hiperlocais — como a
              coleta seletiva do bairro, caronas recorrentes entre moradores e condições de calçadas
              acessíveis — apresentando tudo conforme a rotina da cidade.
            </p>
          </aside>
        </div>
      </section>

      <FutureRoadmapSection />

      <div className="editorial-actions">
        <ActionLink to="/app">Conhecer o aplicativo</ActionLink>
        <ActionLink to="/impacto" variant="secondary">
          Ver impacto esperado e ODS
        </ActionLink>
      </div>
    </article>
  )
}
