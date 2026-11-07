import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ServiceIcon from './ServiceIcon.jsx'

export default function HomeSearch() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function submit(event) {
    event.preventDefault()
    const value = query.trim()
    navigate(`/app/rotas/transporte${value ? `?destino=${encodeURIComponent(value)}` : ''}`)
  }

  return (
    <form className="home-search" role="search" onSubmit={submit}>
      <label className="visually-hidden" htmlFor="home-destination">
        Para onde você vai?
      </label>
      <ServiceIcon name="search" />
      <input
        id="home-destination"
        type="search"
        placeholder="Para onde você vai?"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit" aria-label="Buscar em Rotas">
        <span aria-hidden="true">›</span>
      </button>
    </form>
  )
}
