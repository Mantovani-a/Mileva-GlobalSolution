import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ServiceIcon from './ServiceIcon.jsx'
import { getTransitPlacesList } from '../data/transitData.js'

const quickDestinations = ['Rodoviária', 'Praça Central', 'Área Escolar', 'Bairro Sul']

export default function HomeSearch() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const placesList = getTransitPlacesList()

  function goToDestination(rawValue) {
    const value = rawValue.trim()
    navigate(`/app/rotas/transporte${value ? `?destino=${encodeURIComponent(value)}` : ''}`)
  }

  function submit(event) {
    event.preventDefault()
    goToDestination(query)
  }

  return (
    <div className="home-search-block">
      <form className="home-search" role="search" onSubmit={submit}>
        <label className="visually-hidden" htmlFor="home-destination">
          Para onde você vai?
        </label>
        <ServiceIcon name="search" />
        <input
          id="home-destination"
          type="search"
          placeholder="Para onde você vai?"
          list="home-places"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <datalist id="home-places">
          {placesList.map((place) => (
            <option key={place} value={place} />
          ))}
        </datalist>
        <button type="submit" aria-label="Buscar em Rotas">
          <span aria-hidden="true">›</span>
        </button>
      </form>
      <div className="home-quick-chips" aria-label="Destinos frequentes">
        {quickDestinations.map((place) => (
          <button
            key={place}
            type="button"
            className="home-quick-chip"
            onClick={() => goToDestination(place)}
          >
            <ServiceIcon name="pin" />
            <span>{place}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
