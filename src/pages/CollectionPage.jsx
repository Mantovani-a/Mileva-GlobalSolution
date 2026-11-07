import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import RouteMap from '../components/RouteMap.jsx'
import FavoriteButton from '../components/FavoriteButton.jsx'
import DemoNotice from '../components/DemoNotice.jsx'
import { collectionRegions, materialExamples } from '../js/demoCollection.js'

export default function CollectionPage() {
  const [params] = useSearchParams()
  const initial =
    collectionRegions.find((item) => item.id === params.get('regiao')) || collectionRegions[0]
  const [regionId, setRegionId] = useState(initial.id)
  const region = collectionRegions.find((item) => item.id === regionId)
  const route = {
    ...region,
    origin: region.name,
    destination: 'Percurso de coleta ilustrativo',
    stops: region.stops,
  }

  return (
    <div className="module-page">
      <Link className="module-back" to="/app/rotas">
        ← Voltar a Rotas
      </Link>
      <header className="module-heading">
        <p className="eyebrow">Mileva Coleta</p>
        <h1>Coleta Seletiva</h1>
        <p className="lead">
          Veja um exemplo de programação por região, área atendida e pontos de descarte.
        </p>
      </header>
      <DemoNotice>
        Programação, percurso, área e pontos fictícios. Confirme serviços e materiais aceitos em
        fontes oficiais antes de usar.
      </DemoNotice>
      <div className="module-layout module-layout--collection">
        <div className="module-map">
          <RouteMap
            key={region.id}
            routes={[route]}
            selectedRouteId={region.id}
            area={{ points: region.area, color: region.color }}
            serviceType="collection"
            title={`Mapa da coleta em ${region.name}`}
          />
        </div>
        <div className="module-form">
          <h2>Consultar região</h2>
          <label>
            Região ilustrativa
            <select value={regionId} onChange={(event) => setRegionId(event.target.value)}>
              {collectionRegions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <p className="form-message" role="status">
            Exibindo programação simulada de {region.name}.
          </p>
        </div>
        <section className="module-results collection-info" aria-labelledby="collection-schedule">
          <div className="collection-info__heading">
            <h2 id="collection-schedule">Coleta programada</h2>
            <FavoriteButton type="collection" id={region.id} label={`região ${region.name}`} />
          </div>
          <p className="collection-info__region">{region.name}</p>
          <dl className="detail-facts">
            <div>
              <dt>Dias ilustrativos</dt>
              <dd>{region.days}</dd>
            </div>
            <div>
              <dt>Faixa de horário simulada</dt>
              <dd>{region.window}</dd>
            </div>
          </dl>
          <h3>Materiais para separar</h3>
          <ul className="material-list">
            {materialExamples.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="section-note">
            Estas categorias são exemplos de separação. A aceitação por um serviço local ainda não
            foi verificada.
          </p>
          <h3>Orientações gerais</h3>
          <p>
            Separe materiais secos de resíduos orgânicos e consulte as regras locais antes do
            descarte.
          </p>
          <h3>Pontos no mapa</h3>
          <ul className="simple-list">
            {region.stops.map((stop) => (
              <li key={stop.id}>
                {stop.name} — {stop.detail}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
