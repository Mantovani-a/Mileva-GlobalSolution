import { Link } from 'react-router-dom'
import FavoriteButton from '../components/FavoriteButton.jsx'
import ModuleTitle from '../components/ModuleTitle.jsx'
import { useFavorites } from '../hooks/useFavorites.js'
import { resolveSavedFavorites } from '../data/catalogData.js'
import ServiceIcon from '../components/ServiceIcon.jsx'

const icons = { transit: 'bus', ride: 'car', collection: 'recycle', accessibility: 'accessibility' }

function favoriteDetails(item) {
  const [name, journey] = item.label.split(' · ')
  return { name, journey: journey || '' }
}

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
          {favorites.length === 1 ? '1 item salvo' : `${favorites.length} itens salvos`}
        </p>
      </div>
      <div className="favorites-page__body">
        {!favorites.length && (
          <div className="empty-state">
            <span className="favorites-empty-icon" aria-hidden="true"><ServiceIcon name="star" /></span>
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
            <div className="favorite-group__heading">
              <h2>{category}</h2>
              <span>{savedItems.filter((item) => item.category === category).length}</span>
            </div>
            <div className="favorite-list">
              {savedItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <div className="favorite-item" key={`${item.type}:${item.id}`}>
                    <Link className="favorite-item__link" to={item.href} aria-label={`Abrir ${item.label}`}>
                      <span className="favorite-item__icon" aria-hidden="true"><ServiceIcon name={icons[item.type]} /></span>
                      <span className="favorite-item__copy">
                        <strong>{favoriteDetails(item).name}</strong>
                        {favoriteDetails(item).journey && <small>{favoriteDetails(item).journey}</small>}
                        <em>{category}</em>
                      </span>
                      <ServiceIcon name="chevronRight" />
                    </Link>
                    <div className="favorite-item__remove">
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
              <div className="favorite-item favorite-item--missing" key={`${item.type}:${item.id}`}>
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
