import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import RouteMap from '../components/RouteMap.jsx'
import FavoriteButton from '../components/FavoriteButton.jsx'
import ModuleTitle from '../components/ModuleTitle.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'
import { rideOffers } from '../js/demoRides.js'
import { matchesText } from '../js/filterDemo.js'

export default function RidesPage() {
  const [params] = useSearchParams()
  const preferred = rideOffers.find((item) => item.id === params.get('oferta'))
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [day, setDay] = useState('todos')
  const [time, setTime] = useState('')
  const [results, setResults] = useState(rideOffers)
  const [selectedId, setSelectedId] = useState(preferred?.id || rideOffers[0].id)
  const [message, setMessage] = useState('')

  function search(event) {
    event.preventDefault()
    if (Boolean(origin.trim()) !== Boolean(destination.trim())) {
      setMessage(
        'Informe origem e destino juntos ou deixe os dois vazios para explorar as ofertas.',
      )
      return
    }
    const found = rideOffers.filter(
      (offer) =>
        (!origin || matchesText(offer.origin, origin)) &&
        (!destination || matchesText(offer.destination, destination)) &&
        (day === 'todos' || offer.days.includes(day)) &&
        (!time || offer.time >= time),
    )
    setResults(found)
    setSelectedId(found[0]?.id || null)
    setMessage(
      found.length
        ? `${found.length} oferta${found.length > 1 ? 's' : ''} demonstrativa${found.length > 1 ? 's' : ''} encontrada${found.length > 1 ? 's' : ''}.`
        : 'Nenhuma carona demonstrativa atende a esses filtros.',
    )
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
          <label>
            <span className="visually-hidden">Origem</span>
            <ServiceIcon name="pin" />
            <input
              value={origin}
              onChange={(event) => setOrigin(event.target.value)}
              placeholder="Origem"
            />
          </label>
          <label>
            <span className="visually-hidden">Destino</span>
            <ServiceIcon name="pin" />
            <input
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="Destino"
            />
          </label>
          <label>
            <span className="visually-hidden">Dia da semana</span>
            <span className="field-calendar" aria-hidden="true">
              ▦
            </span>
            <select value={day} onChange={(event) => setDay(event.target.value)}>
              <option value="todos">Dias da semana</option>
              {['Seg', 'Ter', 'Qua', 'Qui', 'Sex'].map((value, index) => (
                <option value={value} key={value}>
                  {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'][index]}
                </option>
              ))}
            </select>
          </label>
          <details className="extra-filters">
            <summary>Filtrar horário</summary>
            <label>
              Horário a partir de
              <input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
            </label>
          </details>
          <button className="module-primary" type="submit">
            <ServiceIcon name="search" />
            Buscar caronas
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
        serviceType="ride"
        title="Mapa das caronas demonstrativas"
      />
      <section className="compact-results ride-results">
        <h2>Caronas disponíveis</h2>
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
                <strong>{offer.driver.split(' (')[0]}</strong>
                <span>
                  {offer.origin} → {offer.destination}
                </span>
                <small>
                  ▦ {offer.days.join(', ')} · ◷ {offer.time}
                </small>
              </span>
              <span className="ride-card__seats">
                {offer.seats} vaga{offer.seats > 1 ? 's' : ''}
              </span>
              <span className="row-chevron" aria-hidden="true">
                ›
              </span>
            </button>
            {selectedId === offer.id && (
              <div className="ride-card__selected">
                <span>Trajeto selecionado</span>
                <FavoriteButton type="ride" id={offer.id} label={offer.driver} />
              </div>
            )}
          </article>
        ))}
        {!results.length && (
          <p className="empty-state">Nenhuma carona encontrada. Ajuste os filtros.</p>
        )}
        <p className="compact-disclaimer">ⓘ Ofertas e responsáveis simulados</p>
      </section>
    </section>
  )
}
