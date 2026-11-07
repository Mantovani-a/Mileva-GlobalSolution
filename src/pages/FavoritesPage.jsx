import { Link } from 'react-router-dom'
import FavoriteButton from '../components/FavoriteButton.jsx'
import { useFavorites } from '../js/favorites.js'
import { demoCatalog } from '../js/demoCatalog.js'

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const savedItems = demoCatalog.filter((record) =>
    favorites.some((saved) => saved.type === record.type && saved.id === record.id),
  )
  const categories = [...new Set(savedItems.map((record) => record.category))]
  const missingItems = favorites.filter(
    (saved) => !demoCatalog.some((record) => record.type === saved.type && record.id === saved.id),
  )

  return (
    <section className="favorites-page">
      <p className="eyebrow">Favoritos</p>
      <h1>Seus itens salvos.</h1>
      <p className="lead">Salvos somente neste navegador para a demonstração.</p>
      <p role="status" aria-live="polite">
        {favorites.length === 1 ? '1 item salvo.' : favorites.length + ' itens salvos.'}
      </p>
      {!favorites.length && (
        <div className="empty-state">
          <h2>Você ainda não salvou favoritos.</h2>
          <p>
            Explore linhas, caronas, regiões de coleta ou acessibilidade e use o botão Favoritar.
          </p>
          <Link className="text-link" to="/app/rotas">
            Explorar Rotas
          </Link>
        </div>
      )}
      {categories.map((category) => (
        <section className="favorite-group" key={category}>
          <h2>{category}</h2>
          <div className="result-list">
            {savedItems
              .filter((item) => item.category === category)
              .map((item) => (
                <div className="result-row" key={`${item.type}:${item.id}`}>
                  <strong>{item.label}</strong>
                  <div className="result-row__actions">
                    <Link to={item.href}>Abrir detalhe</Link>
                    <FavoriteButton removal type={item.type} id={item.id} label={item.label} />
                  </div>
                </div>
              ))}
          </div>
        </section>
      ))}
      {missingItems.length > 0 && (
        <section className="favorite-group">
          <h2>Itens indisponíveis</h2>
          <p>Estes itens não aparecem mais nos dados demonstrativos. Você pode removê-los.</p>
          {missingItems.map((item) => (
            <div className="result-row" key={`${item.type}:${item.id}`}>
              <span>Item indisponível</span>
              <FavoriteButton removal type={item.type} id={item.id} label="item indisponível" />
            </div>
          ))}
        </section>
      )}
    </section>
  )
}
