import { Link } from 'react-router-dom'
import FavoriteButton from '../components/FavoriteButton.jsx'
import ModuleTitle from '../components/ModuleTitle.jsx'
import { useFavorites } from '../hooks/useFavorites.js'
import { resolveSavedFavorites } from '../data/catalogData.js'

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const { savedItems, categories, missingItems } = resolveSavedFavorites(favorites)

  return (
    <section className="compact-screen favorites-page">
      <div className="favorites-page__header">
        <ModuleTitle
          icon="star"
          title="Meus Favoritos"
          subtitle="Itens salvos neste navegador para acesso rápido"
        />
        <p className="favorites-count-badge" role="status" aria-live="polite">
          {favorites.length === 1 ? '1 item salvo.' : favorites.length + ' itens salvos.'}
        </p>
      </div>
      <div className="favorites-page__body">
        {!favorites.length && (
          <div className="empty-state">
            <h2>Você ainda não salvou favoritos.</h2>
            <p>
              Explore linhas, caronas, regiões de coleta ou acessibilidade e use o botão Favoritar.
            </p>
            <Link className="module-primary" to="/app/rotas">
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
      </div>
    </section>
  )
}
