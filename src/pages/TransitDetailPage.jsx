import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import RouteMap from '../components/RouteMap.jsx'
import FavoriteButton from '../components/FavoriteButton.jsx'
import DemoNotice from '../components/DemoNotice.jsx'
import { transitLines } from '../js/demoTransit.js'

export default function TransitDetailPage() {
  const { id } = useParams()
  const [selectedStopId, setSelectedStopId] = useState(null)
  const line = transitLines.find((item) => item.id === id)
  if (!line)
    return (
      <section className="app-state-page">
        <h1>Linha não encontrada</h1>
        <p>Este trajeto demonstrativo não está mais disponível.</p>
        <Link className="text-link" to="/app/rotas/transporte">
          Voltar ao transporte
        </Link>
      </section>
    )
  return (
    <article className="module-page">
      <Link className="module-back" to="/app/rotas/transporte">
        ← Voltar às linhas
      </Link>
      <header className="module-heading">
        <p className="eyebrow">Trajeto demonstrativo</p>
        <h1>{line.name}</h1>
        <p className="lead">
          {line.origin} → {line.destination}
        </p>
        <FavoriteButton type="transit" id={line.id} label={line.name} />
      </header>
      <DemoNotice />
      <div className="detail-layout">
        <RouteMap
          routes={[line]}
          selectedRouteId={line.id}
          title={`Mapa de ${line.name}`}
          activeStopId={selectedStopId}
          onSelectStop={setSelectedStopId}
        />
        <div className="detail-panel">
          <h2>Paradas do trajeto</h2>
          <ol className="stop-list">
            {line.stops.map((stop) => (
              <li key={stop.id}>
                <button
                  type="button"
                  className={selectedStopId === stop.id ? 'is-selected' : ''}
                  onClick={() => setSelectedStopId(stop.id)}
                  aria-pressed={selectedStopId === stop.id}
                >
                  <strong>{stop.name}</strong>
                  <span>{stop.detail}</span>
                </button>
              </li>
            ))}
          </ol>
          <h2>Informações programadas</h2>
          <dl className="detail-facts">
            <div>
              <dt>Saída</dt>
              <dd>{line.departure} (simulada)</dd>
            </div>
            <div>
              <dt>Duração</dt>
              <dd>{line.duration} (estimativa fictícia)</dd>
            </div>
            <div>
              <dt>Tarifa</dt>
              <dd>{line.fare} (simulada)</dd>
            </div>
            <div>
              <dt>Acessibilidade</dt>
              <dd>{line.accessibility}</dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  )
}
