import ActionLink from '../components/ActionLink.jsx'

const audiences = [
  'Trabalhadores',
  'Estudantes',
  'Usuários do transporte público',
  'Idosos',
  'Pessoas com deficiência',
  'Moradores que consultam informações da cidade',
]
const features = [
  'Transporte público e itinerários',
  'Caronas recorrentes',
  'Coleta seletiva',
  'Rotas e locais acessíveis',
  'Rotas e informações úteis da cidade',
  'Participação comunitária',
]

export default function AboutPage() {
  return (
    <article className="editorial-page">
      <header className="page-intro">
        <p className="eyebrow">Sobre o projeto</p>
        <h1>Mobilidade e cidade em um só lugar.</h1>
        <p className="lead">
          O Mileva é uma plataforma em desenvolvimento que reúne trajetos e informações sobre
          serviços urbanos em uma experiência simples.
        </p>
      </header>
      <div className="editorial-grid">
        <section aria-labelledby="about-what">
          <span className="section-number">01</span>
          <h2 id="about-what">O que é o Mileva?</h2>
          <p>
            Uma proposta para aproximar as pessoas das opções de deslocamento e dos serviços urbanos
            do cotidiano, começando por uma cidade-piloto demonstrativa: Pires do Rio, Goiás.
          </p>
        </section>
        <section aria-labelledby="about-problem">
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
        <p className="eyebrow">Para quem</p>
        <h2 id="about-people">Informação útil para mais pessoas.</h2>
        <ul className="text-columns">
          {audiences.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="editorial-section" aria-labelledby="about-features">
        <p className="eyebrow">O que estamos construindo</p>
        <h2 id="about-features">Recursos previstos</h2>
        <ul className="text-columns">
          {features.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="section-note">
          Essas funcionalidades serão desenvolvidas por etapas. As informações exibidas no
          aplicativo ainda não representam serviços validados.
        </p>
      </section>
      <aside className="editorial-callout">
        <h2>Como se diferencia do Google Maps?</h2>
        <p>
          O Mileva não pretende substituí-lo. A proposta é integrar informações e serviços urbanos
          locais e apresentá-los conforme as necessidades dos moradores.
        </p>
      </aside>
      <ActionLink to="/app">Conhecer o aplicativo</ActionLink>
    </article>
  )
}
