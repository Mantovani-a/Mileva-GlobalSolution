import { Link, useParams } from 'react-router-dom'
import { accessibleRecords, accessibilityMapRecord } from '../js/demoAccessibility.js'
import VerificationStatus from '../components/VerificationStatus.jsx'
import FavoriteButton from '../components/FavoriteButton.jsx'
import RouteMap from '../components/RouteMap.jsx'
export default function AccessibleDetailPage() {
  const { id } = useParams()
  const item = accessibleRecords.find((record) => record.id === id)
  if (!item)
    return (
      <section>
        <h1>Exemplo não encontrado</h1>
        <Link to="/app/rotas/acessibilidade">Voltar à consulta</Link>
      </section>
    )
  return (
    <article className="module-page">
      <Link className="module-back" to={`/app/rotas/acessibilidade?tipo=${item.kind}`}>
        ← Voltar à consulta
      </Link>
      <header className="module-heading">
        <p className="eyebrow">Exemplo fictício · {item.category}</p>
        <h1>{item.name}</h1>
        <p>{item.region}</p>
        <FavoriteButton type="accessibility" id={item.id} label={item.name} />
      </header>
      <VerificationStatus status={item.status} />
      <RouteMap
        routes={[accessibilityMapRecord(item)]}
        selectedRouteId={item.id}
        title={item.name}
      />
      <section className="detail-panel">
        <h2>Recursos cadastrados</h2>
        <ul>
          {item.resources.map((resource) => (
            <li key={resource}>{resource}</li>
          ))}
        </ul>
        {item.reviewDate && <p>Revisão: {item.reviewDate}</p>}
        <h2>Observações e limitações</h2>
        <p>{item.limitation}</p>
        <p>Este exemplo não certifica um local real nem substitui informações verificadas.</p>
      </section>
    </article>
  )
}
