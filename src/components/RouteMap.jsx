import { useEffect, useState } from 'react'

const WORLD_WIDTH = 600
const WORLD_HEIGHT = 400

function MapBase() {
  return (
    <g className="route-map__base">
      <rect width="600" height="400" fill="#e8eff0" />
      <path
        d="M0 55 600 75M0 145 600 135M0 235 600 250M0 345 600 325M75 0 90 400M185 0 170 400M295 0 310 400M405 0 390 400M520 0 530 400M0 0 600 400M0 390 500 0"
        stroke="#fff"
        strokeWidth="21"
        fill="none"
      />
      <path
        d="M0 55 600 75M0 145 600 135M0 235 600 250M0 345 600 325M75 0 90 400M185 0 170 400M295 0 310 400M405 0 390 400M520 0 530 400M0 0 600 400M0 390 500 0"
        stroke="#cedbdd"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M0 0h95l-20 42H0zM430 155l80-10 17 65-90 18zM130 255l75 0-15 65-65 2z"
        fill="#cde5d7"
      />
      <path
        d="M575 0c-35 85-30 140-15 210s5 120 40 190"
        stroke="#bedfe6"
        strokeWidth="25"
        fill="none"
      />
      <g
        className="map-minor-streets"
        transform="rotate(-28 300 200)"
        stroke="#fff"
        strokeWidth="2.5"
        opacity=".85"
      >
        {Array.from({ length: 23 }, (_, index) => (
          <path key={index} d={`M${index * 32 - 60} -200v800M-200 ${index * 26 - 60}h1000`} />
        ))}
      </g>
      <g className="map-labels" fill="#263d49" fontSize="17" fontWeight="600">
        <text x="200" y="105">
          Centro
        </text>
        <text x="370" y="350">
          Setor ilustrativo
        </text>
      </g>
    </g>
  )
}

function MapArea({ points, color }) {
  if (!points?.length) return null
  return (
    <polygon
      points={points.map((point) => point.join(',')).join(' ')}
      fill={color}
      fillOpacity=".2"
      stroke={color}
      strokeWidth="3"
      strokeDasharray="8 6"
    />
  )
}

function MapRoutes({ routes, selectedRouteId, onSelectRoute, serviceType }) {
  return (
    <g>
      {routes.map((route) => {
        const selected = route.id === selectedRouteId
        return (
          <polyline
            key={route.id}
            points={route.points.map((point) => point.join(',')).join(' ')}
            fill="none"
            stroke={route.color}
            strokeWidth={selected ? '7' : '4'}
            strokeOpacity={selected ? '1' : '.52'}
            strokeDasharray={
              serviceType === 'collection' || route.status === 'unknown' ? '12 7' : undefined
            }
            strokeLinecap="round"
            strokeLinejoin="round"
            role={onSelectRoute ? 'button' : undefined}
            tabIndex={onSelectRoute ? 0 : undefined}
            aria-label={
              onSelectRoute ? `Selecionar trajeto ${route.name || route.driver}` : undefined
            }
            onClick={onSelectRoute ? () => onSelectRoute(route.id) : undefined}
            onKeyDown={
              onSelectRoute
                ? (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      onSelectRoute(route.id)
                    }
                  }
                : undefined
            }
          />
        )
      })}
    </g>
  )
}

function MapPoints({ stops, selectedStopId, onSelectStop }) {
  return (
    <g>
      {stops.map((stop, index) => (
        <g
          key={stop.id}
          className="route-map__marker"
          role="button"
          tabIndex="0"
          aria-label={`Ponto ${index + 1}: ${stop.name}`}
          aria-pressed={selectedStopId === stop.id}
          onClick={() => onSelectStop(stop.id)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onSelectStop(stop.id)
            }
          }}
        >
          <circle cx={stop.x} cy={stop.y} r="23" fill="transparent" />
          <circle
            cx={stop.x}
            cy={stop.y}
            r={selectedStopId === stop.id ? 17 : 14}
            fill="#fff"
            stroke="#0f263a"
            strokeWidth="2"
          />
          <circle cx={stop.x} cy={stop.y} r="9" fill={index === 0 ? '#0f263a' : '#087f72'} />
          {stop.verified && (
            <text x={stop.x + 14} y={stop.y - 12} fill="#0f263a" fontSize="16" fontWeight="700">
              ✓
            </text>
          )}
          <text
            x={stop.x}
            y={stop.y + 4}
            textAnchor="middle"
            fill="#fff"
            fontSize="10"
            fontWeight="700"
          >
            {index + 1}
          </text>
        </g>
      ))}
    </g>
  )
}

function MapControls({ zoom, setZoom, reset }) {
  return (
    <div className="route-map__controls" aria-label="Controles do mapa">
      <button
        type="button"
        onClick={() => setZoom((value) => Math.min(2, Math.round((value + 0.25) * 100) / 100))}
        disabled={zoom >= 2}
        aria-label="Aproximar mapa"
      >
        +
      </button>
      <button
        type="button"
        onClick={() => setZoom((value) => Math.max(1, Math.round((value - 0.25) * 100) / 100))}
        disabled={zoom <= 1}
        aria-label="Afastar mapa"
      >
        −
      </button>
      <button type="button" onClick={reset}>
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
  const [zoom, setZoom] = useState(1)
  const [selectedStopId, setSelectedStopId] = useState(null)
  const [showRoute, setShowRoute] = useState(routes.length > 0)
  const [showArea, setShowArea] = useState(true)
  const [showStops, setShowStops] = useState(routes.length > 0)
  const route = routes.find((item) => item.id === selectedRouteId) || routes[0]
  const effectiveStopId = activeStopId || selectedStopId
  const stop = route?.stops?.find((item) => item.id === effectiveStopId)

  useEffect(() => {
    setSelectedStopId(null)
    setZoom(1)
  }, [selectedRouteId])

  const viewWidth = WORLD_WIDTH / zoom
  const viewHeight = WORLD_HEIGHT / zoom
  const middle = route?.points?.[Math.floor(route.points.length / 2)] || [300, 200]
  const viewX = Math.max(0, Math.min(WORLD_WIDTH - viewWidth, middle[0] - viewWidth / 2))
  const viewY = Math.max(0, Math.min(WORLD_HEIGHT - viewHeight, middle[1] - viewHeight / 2))

  function reset() {
    setZoom(1)
    setSelectedStopId(null)
    onSelectStop?.(null)
    setShowRoute(true)
    setShowArea(true)
    setShowStops(true)
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
          <span>Mapa ilustrativo · sem precisão geográfica</span>
        </div>
        <MapControls zoom={zoom} setZoom={setZoom} reset={reset} />
      </div>
      <div className="route-map__viewport">
        <svg
          viewBox={`${viewX} ${viewY} ${viewWidth} ${viewHeight}`}
          role="group"
          aria-label={`${title}. ${route ? `${route.origin || route.name} para ${route.destination || 'região selecionada'}.` : 'Sem trajeto selecionado.'}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <MapBase />
          {showArea && (
            <MapArea points={area?.points} color={area?.color || route?.color || '#087f72'} />
          )}
          {showRoute && (
            <MapRoutes
              routes={compact && route ? [route] : routes}
              selectedRouteId={route?.id}
              onSelectRoute={onSelectRoute}
              serviceType={serviceType}
            />
          )}
          {showStops && (
            <MapPoints
              stops={markers || route?.stops || []}
              selectedStopId={effectiveStopId}
              onSelectStop={selectStop}
            />
          )}
        </svg>
      </div>
      {compact && <span className="map-stamp">Mapa ilustrativo</span>}
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
