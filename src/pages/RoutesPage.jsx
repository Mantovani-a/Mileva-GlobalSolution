import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { homeServices } from '../js/homeDemoData.js'
import ServiceIcon from '../components/ServiceIcon.jsx'

export default function RoutesPage() {
  const [params] = useSearchParams()
  const legacy = homeServices.find((item) => item.id === params.get('servico'))
  if (legacy) return <Navigate to={legacy.href} replace />
  if (params.get('busca'))
    return (
      <Navigate
        to={`/app/rotas/transporte?destino=${encodeURIComponent(params.get('busca'))}`}
        replace
      />
    )
  return (
    <section className="route-hub">
      <p className="eyebrow">Rotas e serviços</p>
      <h1>O que você quer consultar?</h1>
      <p className="lead">Escolha uma categoria para ver trajetos e informações demonstrativas.</p>
      <div className="route-hub__list">
        {homeServices.map((service) => (
          <Link to={service.href} className="route-hub__item" key={service.id}>
            <span className="service-shortcut__icon">
              <ServiceIcon name={service.icon} />
            </span>
            <span>
              <strong>{service.title}</strong>
              <small>{service.description}</small>
            </span>
            <span aria-hidden="true">›</span>
          </Link>
        ))}
      </div>
      <p className="section-note">Mapas e dados desta etapa são esquemáticos e simulados.</p>
    </section>
  )
}
