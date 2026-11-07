import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import RouteMap from '../components/RouteMap.jsx'
import ModuleTitle from '../components/ModuleTitle.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'
import { transitLines } from '../js/demoTransit.js'
import { matchesText } from '../js/filterDemo.js'

export default function TransitPage() {
  const [params] = useSearchParams()
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState(params.get('destino') || '')
  const [period, setPeriod] = useState('todos')
  const [results, setResults] = useState(transitLines)
  const [selectedId, setSelectedId] = useState(transitLines[0].id)
  const [showAll, setShowAll] = useState(false)
  const [message, setMessage] = useState('')

  function search(event) {
    event.preventDefault()
    if (Boolean(origin.trim()) !== Boolean(destination.trim())) {
      setMessage('Preencha origem e destino ou deixe ambos vazios para ver todas as linhas.')
      return
    }
    const found = transitLines.filter(
      (line) =>
        (!origin || matchesText(line.origin, origin)) &&
        (!destination || matchesText(line.destination, destination)) &&
        (period === 'todos' || line.period === period),
    )
    setResults(found)
    setSelectedId(found[0]?.id || null)
    setMessage(
      found.length
        ? `${found.length} linha${found.length > 1 ? 's' : ''} demonstrativa${found.length > 1 ? 's' : ''} encontrada${found.length > 1 ? 's' : ''}.`
        : 'Nenhuma linha demonstrativa atende a esses filtros.',
    )
  }

  return (
    <section className="compact-screen transit-screen">
      <div className="search-sheet">
        <ModuleTitle
          icon="bus"
          title="Transporte Público"
          subtitle="Linhas e horários · Pires do Rio – GO"
        />
        <form className="compact-form" onSubmit={search} aria-label="Buscar linhas demonstrativas">
          <div className="compact-field-pair">
            <label>
              <span className="visually-hidden">Origem</span>
              <ServiceIcon name="pin" />
              <input
                value={origin}
                onChange={(event) => setOrigin(event.target.value)}
                placeholder="Origem"
                list="transit-places"
              />
            </label>
            <label>
              <span className="visually-hidden">Destino</span>
              <ServiceIcon name="pin" />
              <input
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                placeholder="Destino"
                list="transit-places"
              />
            </label>
            <button
              className="compact-swap"
              type="button"
              aria-label="Inverter origem e destino"
              onClick={() => {
                setOrigin(destination)
                setDestination(origin)
              }}
            >
              ⇅
            </button>
          </div>
          <datalist id="transit-places">
            {['Centro', 'Rodoviária', 'Vila Nova', 'Área Escolar', 'Bairro Sul'].map((place) => (
              <option key={place}>{place}</option>
            ))}
          </datalist>
          <details className="extra-filters">
            <summary>Filtrar horário</summary>
            <label>
              Período do horário
              <select value={period} onChange={(event) => setPeriod(event.target.value)}>
                <option value="todos">Todos os períodos</option>
                <option value="manha">Manhã</option>
                <option value="tarde">Tarde</option>
                <option value="noite">Noite</option>
              </select>
            </label>
          </details>
          <button className="module-primary" type="submit">
            <ServiceIcon name="search" />
            Buscar rotas
          </button>
          {message && (
            <p className="form-message" role="status">
              {message}
            </p>
          )}
        </form>
      </div>
      <RouteMap
        compact
        routes={results}
        selectedRouteId={selectedId}
        onSelectRoute={setSelectedId}
        title="Mapa das linhas demonstrativas"
      />
      <section className="compact-results" aria-labelledby="transit-results">
        <h2 id="transit-results">Linhas disponíveis</h2>
        {results.slice(0, showAll ? results.length : 2).map((line) => (
          <article
            className={`compact-line${selectedId === line.id ? ' is-selected' : ''}`}
            key={line.id}
          >
            <span className="service-shortcut__icon">
              <ServiceIcon name="bus" />
            </span>
            <div>
              <button
                className="route-choice"
                type="button"
                onClick={() => setSelectedId(line.id)}
                aria-pressed={selectedId === line.id}
              >
                {line.name}
                <span>
                  {line.origin} ↔ {line.destination}
                </span>
              </button>
              <p>
                {line.departure} · {line.fare} <span className="visually-hidden">simulados</span>
              </p>
              <details className="line-more">
                <summary>Informações</summary>
                <p>
                  {line.duration} · Acessibilidade: {line.accessibility}
                </p>
              </details>
            </div>
            <Link
              className="row-chevron"
              to={`/app/rotas/transporte/${line.id}`}
              aria-label={`Ver trajeto de ${line.name}`}
            >
              ›
            </Link>
          </article>
        ))}
        {results.length > 2 && (
          <button type="button" className="show-more" onClick={() => setShowAll((value) => !value)}>
            {showAll ? 'Mostrar menos' : 'Ver todas as linhas'}
          </button>
        )}
        {!results.length && (
          <p className="empty-state">Nenhuma linha encontrada. Ajuste os filtros.</p>
        )}
      </section>
      <p className="compact-disclaimer">ⓘ Linhas, horários e valores simulados</p>
    </section>
  )
}
