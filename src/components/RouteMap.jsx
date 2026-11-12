import { useEffect, useRef, useState } from 'react'
import { LeafletMapService } from '../services/LeafletMapService.js'
import { GeoCoordinate } from '../models/UrbanModels.js'

function MapControls({ zoomLevel, minZoom, maxZoom, onZoomIn, onZoomOut, onReset }) {
  return (
    <div className="route-map__controls" aria-label="Controles do mapa">
      <button
        type="button"
        onClick={onZoomIn}
        disabled={zoomLevel >= maxZoom}
        aria-label="Aproximar mapa"
      >
        +
      </button>
      <button
        type="button"
        onClick={onZoomOut}
        disabled={zoomLevel <= minZoom}
        aria-label="Afastar mapa"
      >
        −
      </button>
      <button type="button" onClick={onReset}>
        Repor
      </button>
    </div>
  )
}

function MapLegend({ hasArea, showArea, showRoute, showStops, serviceType, color, unknownRoute }) {
  return (
    <div className="route-map__legend" aria-label="Legenda do mapa">
      {showRoute && (
        <span>
          <svg aria-hidden="true" width="20" height="12" viewBox="0 0 20 12">
            <path
              d="M1 6h18"
              stroke={color}
              strokeWidth="3"
              strokeDasharray={serviceType === 'collection' || unknownRoute ? '5 3' : undefined}
            />
          </svg>{' '}
          Trajeto
        </span>
      )}
      {hasArea && showArea && (
        <span>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
            <rect
              x="1"
              y="1"
              width="14"
              height="14"
              fill={color}
              fillOpacity=".2"
              stroke={color}
              strokeDasharray="3 2"
            />
          </svg>{' '}
          Área atendida
        </span>
      )}
      {showStops && (
        <span>
          <i className="legend-point" /> Ponto ilustrativo
        </span>
      )}
    </div>
  )
}

export default function RouteMap({
  routes = [],
  selectedRouteId,
  onSelectRoute,
  area,
  serviceType = 'transit',
  title = 'Mapa de trajetos ilustrativos',
  activeStopId,
  onSelectStop,
  markers,
  compact = false,
}) {
  const OptionsTag = compact ? 'details' : 'div'
  const containerRef = useRef(null)
  const mapServiceRef = useRef(null)
  const lastFittedRouteRef = useRef(undefined)

  const [zoomLevel, setZoomLevel] = useState(14)
  const [selectedStopId, setSelectedStopId] = useState(null)
  const [showRoute, setShowRoute] = useState(routes.length > 0)
  const [showArea, setShowArea] = useState(true)
  const [showStops, setShowStops] = useState(routes.length > 0)

  const route = routes.find((item) => item.id === selectedRouteId) || routes[0]
  const effectiveStopId = activeStopId || selectedStopId
  const activeStops = markers || route?.stops || []
  const stop = activeStops.find((item) => item.id === effectiveStopId)

  useEffect(() => {
    setSelectedStopId(null)
  }, [selectedRouteId])

  useEffect(() => {
    if (!containerRef.current) return undefined
    const service = new LeafletMapService(containerRef.current)
    mapServiceRef.current = service
    setZoomLevel(service.getZoomLevel())

    return () => {
      service.destroy()
      mapServiceRef.current = null
    }
  }, [])

  useEffect(() => {
    const service = mapServiceRef.current
    if (!service) return

    const shouldAutoFit = lastFittedRouteRef.current !== selectedRouteId
    lastFittedRouteRef.current = selectedRouteId

    service.renderLayers({
      routes: compact && route ? [route] : routes,
      selectedRouteId: route?.id,
      onSelectRoute,
      area,
      serviceType,
      stops: activeStops,
      selectedStopId: effectiveStopId,
      onSelectStop: selectStop,
      showRoute,
      showArea,
      showStops,
      autoFit: shouldAutoFit,
    })
    setZoomLevel(service.getZoomLevel())
  }, [
    routes,
    route,
    selectedRouteId,
    area,
    serviceType,
    activeStops,
    effectiveStopId,
    showRoute,
    showArea,
    showStops,
    compact,
  ])

  function handleZoomIn() {
    const service = mapServiceRef.current
    if (!service) return
    setZoomLevel(service.zoomIn())
  }

  function handleZoomOut() {
    const service = mapServiceRef.current
    if (!service) return
    setZoomLevel(service.zoomOut())
  }

  function reset() {
    setSelectedStopId(null)
    onSelectStop?.(null)
    setShowRoute(true)
    setShowArea(true)
    setShowStops(true)
    const service = mapServiceRef.current
    if (service) {
      const boundsPoints = (route?.points || []).map((point) =>
        GeoCoordinate.fromTuple(point).toLatLngTuple(),
      )
      setZoomLevel(service.resetView(boundsPoints))
    }
  }

  function selectStop(id) {
    setSelectedStopId(id)
    onSelectStop?.(id)
  }

  return (
    <section className={`route-map${compact ? ' route-map--compact' : ''}`} aria-label={title}>
      <div className="route-map__head">
        <div>
          <strong>{title}</strong>
          <span>Mapa Leaflet · Pires do Rio – GO (dados demonstrativos)</span>
        </div>
        <MapControls
          zoomLevel={zoomLevel}
          minZoom={mapServiceRef.current?.getMinZoom() ?? 12}
          maxZoom={mapServiceRef.current?.getMaxZoom() ?? 18}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={reset}
        />
      </div>
      <div className="route-map__viewport">
        <div
          ref={containerRef}
          className="route-map__leaflet-canvas"
          role="group"
          aria-label={`${title}. ${route ? `${route.origin || route.name} para ${route.destination || 'região selecionada'}.` : 'Sem trajeto selecionado.'}`}
        />
        <svg
          className="route-map__a11y-overlay"
          viewBox="0 0 600 400"
          aria-label="Camada de navegação por teclado do mapa"
        >
          {showRoute &&
            (compact && route ? [route] : routes).map((item) => (
              <polyline
                key={item.id}
                points={(item.points || []).map((point) => point.join(',')).join(' ')}
                fill="none"
                stroke="transparent"
                strokeWidth="12"
                role={onSelectRoute ? 'button' : undefined}
                tabIndex={onSelectRoute ? 0 : undefined}
                aria-label={
                  onSelectRoute ? `Selecionar trajeto ${item.name || item.driver}` : undefined
                }
                onClick={onSelectRoute ? () => onSelectRoute(item.id) : undefined}
                onKeyDown={
                  onSelectRoute
                    ? (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          onSelectRoute(item.id)
                        }
                      }
                    : undefined
                }
              />
            ))}
          {showStops &&
            activeStops.map((item, index) => (
              <g
                key={item.id}
                className="route-map__marker"
                role="button"
                tabIndex="0"
                aria-label={`Ponto ${index + 1}: ${item.name}`}
                aria-pressed={effectiveStopId === item.id}
                onClick={() => selectStop(item.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    selectStop(item.id)
                  }
                }}
              >
                <circle cx={item.x} cy={item.y} r="18" fill="transparent" />
              </g>
            ))}
        </svg>
      </div>
      {compact && <span className="map-stamp">Leaflet · Pires do Rio</span>}
      <OptionsTag className="map-options">
        {compact && <summary>Camadas e legenda</summary>}
        {(routes.length > 0 || area) && (
          <div className="route-map__layers" aria-label="Camadas do mapa">
            {routes.length > 0 && (
              <button
                type="button"
                aria-pressed={showRoute}
                onClick={() => setShowRoute((value) => !value)}
              >
                Trajeto
              </button>
            )}
            {area && (
              <button
                type="button"
                aria-pressed={showArea}
                onClick={() => setShowArea((value) => !value)}
              >
                Área
              </button>
            )}
            {routes.length > 0 && (
              <button
                type="button"
                aria-pressed={showStops}
                onClick={() => setShowStops((value) => !value)}
              >
                Pontos
              </button>
            )}
          </div>
        )}
        {(routes.length > 0 || area) && (
          <MapLegend
            hasArea={Boolean(area)}
            showArea={showArea}
            showRoute={showRoute}
            showStops={showStops}
            serviceType={serviceType}
            unknownRoute={route?.status === 'unknown'}
            color={area?.color || route?.color || '#087f72'}
          />
        )}
      </OptionsTag>
      {stop && (
        <p className="route-map__point-detail" role="status">
          <strong>{stop.name}</strong> · {stop.detail}
        </p>
      )}
    </section>
  )
}
