import { Link, useParams } from 'react-router-dom'
import VerificationStatus from '../components/VerificationStatus.jsx'
import FavoriteButton from '../components/FavoriteButton.jsx'
import RouteMap from '../components/RouteMap.jsx'
import ModuleTitle from '../components/ModuleTitle.jsx'
import { findAccessibleRecord } from '../data/accessibilityData.js'

export default function AccessibleDetailPage() {
  const { id } = useParams()
  const item = findAccessibleRecord(id)
  if (!item)
    return (
      <section className="compact-screen app-state-page">
        <div className="detail-panel">
          <h1>Exemplo não encontrado</h1>
          <Link className="module-primary" to="/app/rotas/acessibilidade">
            Voltar à consulta
          </Link>
        </div>
      </section>
    )
  return (
    <article className="compact-screen detail-screen">
      <div className="search-sheet detail-header-card">
        <ModuleTitle
          icon="accessibility"
          title={item.name}
          subtitle={`${item.category} · ${item.region}`}
        />
        <div className="detail-header-card__actions">
          <Link className="module-back-pill" to={`/app/rotas/acessibilidade?tipo=${item.kind}`}>
            ← Acessibilidade
          </Link>
          <FavoriteButton type="accessibility" id={item.id} label={item.name} />
        </div>
      </div>
      <RouteMap
        compact
        routes={[item.toMapProjection()]}
        selectedRouteId={item.id}
        title={item.name}
      />
      <section className="compact-results detail-panel">
        <VerificationStatus status={item.status} />
        <h2>Recursos cadastrados</h2>
        <ul className="material-list">
          {item.resources.map((resource) => (
            <li key={resource}>{resource}</li>
          ))}
        </ul>
        {item.reviewDate && <p className="section-note">Revisão: {item.reviewDate}</p>}
        <h2>Observações e limitações</h2>
        <p>{item.limitation}</p>
        <p className="compact-disclaimer">
          Este exemplo não certifica um local real nem substitui informações verificadas.
        </p>
      </section>
    </article>
  )
}
