import { useFavorites } from '../js/favorites.js'

export default function FavoriteButton({ type, id, label, removal = false }) {
  const { isFavorite, toggle } = useFavorites()
  const saved = isFavorite(type, id)
  return (
    <button
      className="favorite-button"
      type="button"
      aria-pressed={saved}
      onClick={() => toggle(type, id)}
    >
      {removal ? 'Remover dos favoritos' : saved ? '★ Salvo' : '☆ Favoritar'}
      <span className="visually-hidden"> {label}</span>
    </button>
  )
}
