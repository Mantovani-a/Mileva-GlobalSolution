import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import RouteMap from '../components/RouteMap.jsx'
import FavoriteButton from '../components/FavoriteButton.jsx'
import ModuleTitle from '../components/ModuleTitle.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'
import {
  getTransitPlacesList,
  searchTransitLines,
  transitLines,
} from '../data/transitData.js'

export default function TransitPage() {
  const allLines = transitLines
  const placesList = getTransitPlacesList()
  const [params, setSearchParams] = useSearchParams()
  const initialOrigin = params.get('origem') || ''
  const initialDestination = params.get('destino') || ''

  const [origin, setOrigin] = useState(initialOrigin)
  const [destination, setDestination] = useState(initialDestination)
  const [period, setPeriod] = useState('todos')
  const [results, setResults] = useState(() =>
    initialOrigin || initialDestination
      ? searchTransitLines({
          origin: initialOrigin,
          destination: initialDestination,
          period: 'todos',
        })
      : allLines,
  )
  const [selectedId, setSelectedId] = useState(
    () =>
      (initialOrigin || initialDestination
        ? searchTransitLines({
            origin: initialOrigin,
            destination: initialDestination,
            period: 'todos',
          })[0]?.id
        : allLines[0]?.id) || null,
  )
  const [message, setMessage] = useState(() =>
    initialDestination
      ? `Filtro inicial aplicado para destino "${initialDestination}".`
      : '',
  )

  const hasActiveFilters = Boolean(origin.trim() || destination.trim() || period !== 'todos')

  function search(event) {
    event.preventDefault()
    const found = searchTransitLines({ origin, destination, period })
    setResults(found)
    setSelectedId(found[0]?.id || null)
    setMessage(
      found.length
        ? `${found.length} linha${found.length > 1 ? 's' : ''} encontrada${found.length > 1 ? 's' : ''} para a consulta.`
        : 'Nenhuma linha demonstrativa atende a esses filtros.',
    )
  }

  function clearFilters() {
    setOrigin('')
    setDestination('')
    setPeriod('todos')
    setResults(allLines)
    setSelectedId(allLines[0]?.id || null)
    setMessage('')
    if (params.size) setSearchParams({}, { replace: true })
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
                placeholder="Origem ou parada"
                list="transit-places"
              />
            </label>
            <label>
              <span className="visually-hidden">Destino</span>
              <ServiceIcon name="pin" />
              <input
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                placeholder="Destino ou parada"
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
              <ServiceIcon name="swap" />
            </button>
          </div>
          <datalist id="transit-places">
            {placesList.map((place) => (
              <option key={place} value={place} />
            ))}
          </datalist>
          <details className="extra-filters">
            <summary>Filtrar por período do dia</summary>
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
          <div className="compact-form__actions">
            <button className="module-primary" type="submit">
              <ServiceIcon name="search" />
              Buscar rotas
            </button>
            {hasActiveFilters && (
              <button className="module-back-pill" type="button" onClick={clearFilters}>
                Limpar filtros
              </button>
            )}
          </div>
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
        <div className="compact-results__head">
          <h2 id="transit-results">Linhas disponíveis</h2>
          <span className="favorites-count-badge">
            {results.length} {results.length === 1 ? 'linha' : 'linhas'}
          </span>
        </div>
        {results.map((line) => (
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
                {line.departure} · {line.duration} · {line.fare}
              </p>
              <div className="compact-line__actions">
                <FavoriteButton type="transit" id={line.id} label={line.name} />
                <Link
                  className="module-back-pill"
                  to={`/app/rotas/transporte/${line.id}`}
                  aria-label={`Ver itinerário completo de ${line.name}`}
                >
                  Itinerário ›
                </Link>
              </div>
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
        {!results.length && (
          <div className="empty-state" role="status">
            <p>Nenhuma linha encontrada para os filtros informados.</p>
            <button type="button" className="module-back-pill" onClick={clearFilters}>
              Mostrar todas as linhas
            </button>
          </div>
        )}
      </section>
      <p className="compact-disclaimer">Linhas, horários e valores simulados</p>
    </section>
  )
}
