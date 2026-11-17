import { useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import {
  combinedTrips,
  getHubLayers,
  getLayerSnapshot,
  homeServices,
} from '../data/homeData.js'
import ServiceIcon from '../components/ServiceIcon.jsx'
import ModuleTitle from '../components/ModuleTitle.jsx'
import RouteMap from '../components/RouteMap.jsx'
import FutureRoadmapSection from '../components/FutureRoadmapSection.jsx'

export default function RoutesPage() {
  const [params] = useSearchParams()
  const layers = getHubLayers()
  const [activeLayerId, setActiveLayerId] = useState('transporte')
  const [selectedItemId, setSelectedItemId] = useState(null)
  const [selectedComboId, setSelectedComboId] = useState(combinedTrips[0]?.id || null)

  const legacy = homeServices.find((item) => item.id === params.get('servico'))
  if (legacy) return <Navigate to={legacy.href} replace />
  if (params.get('busca'))
    return (
      <Navigate
        to={`/app/rotas/transporte?destino=${encodeURIComponent(params.get('busca'))}`}
        replace
      />
    )

  const activeLayer = layers.find((layer) => layer.id === activeLayerId) || layers[0]
  const snapshot = getLayerSnapshot(activeLayer.id, selectedItemId)
  const activeItem =
    snapshot.items.find((item) => item.id === snapshot.activeId) || snapshot.items[0] || null
  const activeCombo =
    combinedTrips.find((combo) => combo.id === selectedComboId) || combinedTrips[0]

  function handleSelectLayer(layerId) {
    setActiveLayerId(layerId)
    setSelectedItemId(null)
  }

  return (
    <section className="compact-screen route-hub">
      <div className="search-sheet">
        <ModuleTitle
          icon="pin"
          title="Central de Rotas"
          subtitle="Mapa integrado e serviços · Pires do Rio – GO"
        />
        <div className="compact-form">
          <div className="region-pills hub-layer-pills" role="group" aria-label="Camada ativa no mapa">
            {layers.map((layer) => (
              <button
                key={layer.id}
                type="button"
                className={`region-pill${layer.id === activeLayer.id ? ' is-active' : ''}`}
                aria-pressed={layer.id === activeLayer.id}
                onClick={() => handleSelectLayer(layer.id)}
              >
                <ServiceIcon name={layer.icon} />
                <span>{layer.label}</span>
              </button>
            ))}
          </div>
          {activeItem && (
            <div className="hub-active-card">
              <div className="hub-active-card__copy">
                <span className="eyebrow">Destaque na camada {activeLayer.label}</span>
                <strong>{activeItem.title}</strong>
                <p>{activeItem.subtitle}</p>
                <small>{activeItem.meta}</small>
              </div>
              <div className="hub-active-card__actions">
                <Link className="module-back-pill" to={activeItem.detailTo}>
                  {activeItem.detailLabel} ›
                </Link>
                <Link className="module-primary" to={activeLayer.to}>
                  Abrir {activeLayer.title}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <RouteMap
        compact
        key={`${activeLayer.id}-${snapshot.activeId}`}
        routes={snapshot.routes}
        selectedRouteId={snapshot.activeId}
        onSelectRoute={setSelectedItemId}
        area={snapshot.area}
        serviceType={snapshot.serviceType}
        title={snapshot.title}
      />

      <div className="compact-results route-hub__results">
        <h2>Módulos de mobilidade e cidade</h2>
        <div className="route-hub__list" role="navigation" aria-label="Categorias de serviços">
          {layers.map((service) => (
            <Link to={service.to} className="route-hub__item" key={service.id}>
              <span className="service-shortcut__icon">
                <ServiceIcon name={service.icon} />
              </span>
              <span>
                <strong>{service.title}</strong>
                <small>{service.description}</small>
              </span>
              <span className="route-hub__badge">
                {service.count} {service.unit}
              </span>
              <span className="row-chevron" aria-hidden="true">
                ›
              </span>
            </Link>
          ))}
        </div>

        <section className="combo-planner" aria-labelledby="combo-planner-title">
          <div className="combo-planner__head">
            <span className="eyebrow">Prévia interativa · Etapa 03 do MVP</span>
            <h2 id="combo-planner-title">Simulador de trajeto combinado</h2>
            <p>
              Visualize como o cidadão combina carona, ônibus e calçada acessível em um único fluxo.
            </p>
          </div>
          <div className="region-pills" role="group" aria-label="Cenários de trajeto combinado">
            {combinedTrips.map((combo) => (
              <button
                key={combo.id}
                type="button"
                className={`region-pill${combo.id === activeCombo.id ? ' is-active' : ''}`}
                aria-pressed={combo.id === activeCombo.id}
                onClick={() => setSelectedComboId(combo.id)}
              >
                {combo.title}
              </button>
            ))}
          </div>
          {activeCombo && (
            <article className="combo-planner__card">
              <div className="combo-planner__summary">
                <strong>{activeCombo.title}</strong>
                <span className="favorites-count-badge">{activeCombo.totalDuration}</span>
              </div>
              <p className="combo-planner__desc">{activeCombo.summary}</p>
              <ol className="stop-timeline combo-timeline">
                {activeCombo.steps.map((step) => (
                  <li key={step.badge}>
                    <Link to={step.to} className="combo-timeline__step">
                      <span className="stop-timeline__badge">{step.badge}</span>
                      <span className="combo-timeline__copy">
                        <small>{step.mode}</small>
                        <strong>{step.title}</strong>
                        <span>{step.detail}</span>
                      </span>
                      <span className="row-chevron" aria-hidden="true">
                        ›
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </article>
          )}
        </section>

        <FutureRoadmapSection compact />
      </div>

      <p className="compact-disclaimer">
        Mapas em Leaflet centrados em Pires do Rio – GO · dados demonstrativos
      </p>
    </section>
  )
}
