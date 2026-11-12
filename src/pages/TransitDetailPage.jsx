import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import RouteMap from '../components/RouteMap.jsx'
import FavoriteButton from '../components/FavoriteButton.jsx'
import ModuleTitle from '../components/ModuleTitle.jsx'
import { findTransitLine } from '../data/transitData.js'

export default function TransitDetailPage() {
  const { id } = useParams()
  const [selectedStopId, setSelectedStopId] = useState(null)
  const line = findTransitLine(id)
  if (!line)
    return (
      <section className="compact-screen app-state-page">
        <div className="detail-panel">
          <h1>Linha não encontrada</h1>
          <p>Este trajeto demonstrativo não está mais disponível.</p>
          <Link className="module-primary" to="/app/rotas/transporte">
            Voltar ao transporte
          </Link>
        </div>
      </section>
    )
  return (
    <article className="compact-screen detail-screen">
      <div className="search-sheet detail-header-card">
        <ModuleTitle icon="bus" title={line.name} subtitle={line.getRouteSummary()} />
        <div className="detail-header-card__actions">
          <Link className="module-back-pill" to="/app/rotas/transporte">
            ← Linhas
          </Link>
          <FavoriteButton type="transit" id={line.id} label={line.name} />
        </div>
      </div>
      <RouteMap
        compact
        routes={[line]}
        selectedRouteId={line.id}
        title={`Mapa de ${line.name}`}
        activeStopId={selectedStopId}
        onSelectStop={setSelectedStopId}
      />
      <div className="compact-results detail-panel">
        <h2>Paradas do trajeto</h2>
        <ol className="stop-list stop-timeline">
          {line.stops.map((stop, index) => (
            <li key={stop.id}>
              <button
                type="button"
                className={selectedStopId === stop.id ? 'is-selected' : ''}
                onClick={() => setSelectedStopId(stop.id)}
                aria-pressed={selectedStopId === stop.id}
              >
                <span className="stop-timeline__badge" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <strong>{stop.name}</strong>
                  <span>{stop.detail}</span>
                </div>
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
        <p className="compact-disclaimer">Dados e paradas ilustrativas para demonstração</p>
      </div>
    </article>
  )
}
