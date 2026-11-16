import ServiceIcon from './ServiceIcon.jsx'
import { useFavorites } from '../hooks/useFavorites.js'

export default function FavoriteButton({ type, id, label, removal = false }) {
  const { isFavorite, toggle } = useFavorites()
  const saved = isFavorite(type, id)

  function handleToggle() {
    toggle(type, id)
    window.dispatchEvent(
      new CustomEvent('mileva:toast', {
        detail: {
          message: saved
            ? `${label} removido dos favoritos`
            : `${label} salvo nos favoritos`,
        },
      }),
    )
  }

  return (
    <button
      className="favorite-button"
      type="button"
      aria-pressed={saved}
      aria-label={removal ? `Remover ${label} dos favoritos` : undefined}
      onClick={handleToggle}
    >
      <ServiceIcon name="star" />
      {!removal && <span>{saved ? 'Salvo' : 'Favoritar'}</span>}
      <span className="visually-hidden"> {label}</span>
    </button>
  )
}
