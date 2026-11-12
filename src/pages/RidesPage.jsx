import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import RouteMap from '../components/RouteMap.jsx'
import FavoriteButton from '../components/FavoriteButton.jsx'
import ModuleTitle from '../components/ModuleTitle.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'
import { getRidePlacesList, rideOffers, searchRideOffers } from '../data/ridesData.js'

export default function RidesPage() {
  const allOffers = rideOffers
  const placesList = getRidePlacesList()
  const [params, setSearchParams] = useSearchParams()
  const preferred = allOffers.find((offer) => offer.id === params.get('oferta'))
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [day, setDay] = useState('todos')
  const [time, setTime] = useState('')
  const [results, setResults] = useState(allOffers)
  const [selectedId, setSelectedId] = useState(preferred?.id || allOffers[0]?.id || null)
  const [message, setMessage] = useState('')

  const hasActiveFilters = Boolean(origin.trim() || destination.trim() || day !== 'todos' || time)

  function search(event) {
    event.preventDefault()
    const found = searchRideOffers({ origin, destination, day, time })
    setResults(found)
    setSelectedId(found[0]?.id || null)
    setMessage(
      found.length
        ? `${found.length} oferta${found.length > 1 ? 's' : ''} encontrada${found.length > 1 ? 's' : ''} para a consulta.`
        : 'Nenhuma carona demonstrativa atende a esses filtros.',
    )
  }

  function clearFilters() {
    setOrigin('')
    setDestination('')
    setDay('todos')
    setTime('')
    setResults(allOffers)
    setSelectedId(allOffers[0]?.id || null)
    setMessage('')
    if (params.size) setSearchParams({}, { replace: true })
  }

  return (
    <section className="compact-screen rides-screen">
      <div className="search-sheet">
        <ModuleTitle
          icon="car"
          title="Carona Diária"
          subtitle="Conexões recorrentes · Pires do Rio – GO"
        />
        <form className="compact-form" onSubmit={search} aria-label="Buscar caronas demonstrativas">
          <div className="compact-field-pair">
            <label>
              <span className="visually-hidden">Origem</span>
              <ServiceIcon name="pin" />
              <input
                value={origin}
                onChange={(event) => setOrigin(event.target.value)}
                placeholder="Bairro ou local de saída"
                list="ride-places"
              />
            </label>
            <label>
              <span className="visually-hidden">Destino</span>
              <ServiceIcon name="pin" />
              <input
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                placeholder="Destino"
                list="ride-places"
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
          <datalist id="ride-places">
            {placesList.map((place) => (
              <option key={place} value={place} />
            ))}
          </datalist>
          <label>
            <span className="visually-hidden">Dia da semana</span>
            <ServiceIcon name="calendar" />
            <select value={day} onChange={(event) => setDay(event.target.value)}>
              <option value="todos">Todos os dias da semana</option>
              {['Seg', 'Ter', 'Qua', 'Qui', 'Sex'].map((value, index) => (
                <option value={value} key={value}>
                  {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'][index]}
                </option>
              ))}
            </select>
          </label>
          <details className="extra-filters">
            <summary>Filtrar por horário de saída</summary>
            <label>
              Horário a partir de
              <input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
            </label>
          </details>
          <div className="compact-form__actions">
            <button className="module-primary" type="submit">
              <ServiceIcon name="search" />
              Buscar caronas
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
        serviceType="ride"
        title="Mapa das caronas demonstrativas"
      />
      <section className="compact-results ride-results" aria-labelledby="rides-results-heading">
        <div className="compact-results__head">
          <h2 id="rides-results-heading">Caronas disponíveis</h2>
          <span className="favorites-count-badge">
            {results.length} {results.length === 1 ? 'oferta' : 'ofertas'}
          </span>
        </div>
        {results.map((offer) => (
          <article
            className={`ride-card${selectedId === offer.id ? ' is-selected' : ''}`}
            key={offer.id}
          >
            <button
              className="ride-card__main"
              type="button"
              onClick={() => setSelectedId(offer.id)}
              aria-pressed={selectedId === offer.id}
            >
              <span className="ride-avatar" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="7" r="4" />
                  <path d="M4 22v-3a8 8 0 0 1 16 0v3z" />
                </svg>
              </span>
              <span className="ride-card__copy">
                <strong>{offer.getDriverDisplayName()}</strong>
                <span>
                  {offer.origin} → {offer.destination}
                </span>
                <small>
                  {offer.days.join(', ')} · {offer.time}
                </small>
              </span>
              <span className="ride-card__seats">
                {offer.seats} vaga{offer.seats > 1 ? 's' : ''}
              </span>
            </button>
            <div className="ride-card__selected">
              <span>
                {selectedId === offer.id ? 'Em destaque no mapa' : 'Toque no cartão para destacar'}
              </span>
              <FavoriteButton type="ride" id={offer.id} label={offer.driver} />
            </div>
          </article>
        ))}
        {!results.length && (
          <div className="empty-state" role="status">
            <p>Nenhuma carona encontrada para os filtros selecionados.</p>
            <button type="button" className="module-back-pill" onClick={clearFilters}>
              Mostrar todas as ofertas
            </button>
          </div>
        )}
        <p className="compact-disclaimer">Ofertas e responsáveis simulados</p>
      </section>
    </section>
  )
}
