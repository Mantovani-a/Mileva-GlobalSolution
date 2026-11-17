import { useEffect, useState } from 'react'

const BASE_WIDTH = 600
const BASE_HEIGHT = 400
const MIN_ZOOM = 1
const MAX_ZOOM = 2.25
const ZOOM_STEP = 0.25

const URBAN_BLOCKS = [
  { x: 55, y: 42, w: 95, h: 52, rx: 8 },
  { x: 168, y: 42, w: 110, h: 52, rx: 8 },
  { x: 300, y: 42, w: 115, h: 52, rx: 8 },
  { x: 432, y: 42, w: 118, h: 52, rx: 8 },
  { x: 55, y: 114, w: 95, h: 64, rx: 8 },
  { x: 168, y: 114, w: 110, h: 64, rx: 8, isPark: true },
  { x: 300, y: 114, w: 115, h: 64, rx: 8 },
  { x: 432, y: 114, w: 118, h: 64, rx: 8 },
  { x: 55, y: 198, w: 95, h: 68, rx: 8 },
  { x: 168, y: 198, w: 110, h: 68, rx: 8 },
  { x: 300, y: 198, w: 115, h: 68, rx: 8 },
  { x: 432, y: 198, w: 118, h: 68, rx: 8 },
  { x: 55, y: 286, w: 95, h: 72, rx: 8, isPark: true },
  { x: 168, y: 286, w: 110, h: 72, rx: 8 },
  { x: 300, y: 286, w: 115, h: 72, rx: 8 },
  { x: 432, y: 286, w: 118, h: 72, rx: 8 },
]

const SECTOR_LABELS = [
  { x: 115, y: 84, text: 'CENTRO' },
  { x: 495, y: 74, text: 'VILA NOVA' },
  { x: 224, y: 152, text: 'PRAÇA CENTRAL' },
  { x: 104, y: 336, text: 'ÁREA ESCOLAR' },
  { x: 222, y: 238, text: 'BAIRRO OESTE' },
  { x: 368, y: 246, text: 'MERCADO' },
  { x: 348, y: 356, text: 'BAIRRO SUL' },
  { x: 492, y: 336, text: 'RODOVIÁRIA' },
]

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function MapControls({ zoom, onZoomIn, onZoomOut, onReset }) {
  return (
    <div className="route-map__controls" aria-label="Controles do mapa">
      <button
        type="button"
        onClick={onZoomIn}
        disabled={zoom >= MAX_ZOOM}
        aria-label="Aproximar mapa"
      >
        +
      </button>
      <button
        type="button"
        onClick={onZoomOut}
        disabled={zoom <= MIN_ZOOM}
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

  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [selectedStopId, setSelectedStopId] = useState(null)
  const [showRoute, setShowRoute] = useState(routes.length > 0)
  const [showArea, setShowArea] = useState(true)
  const [showStops, setShowStops] = useState(routes.length > 0 || Boolean(markers?.length))

  const route = routes.find((item) => item.id === selectedRouteId) || routes[0]
  const effectiveStopId = activeStopId || selectedStopId
  const activeStops = markers || route?.stops || []
  const stop = activeStops.find((item) => item.id === effectiveStopId)
  const visibleRoutes = compact && route ? [route] : routes

  useEffect(() => {
    setSelectedStopId(null)
  }, [selectedRouteId])

  useEffect(() => {
    if (!stop) return
    const targetZoom = Math.max(zoom, 1.25)
    const viewW = BASE_WIDTH / targetZoom
    const viewH = BASE_HEIGHT / targetZoom
    const maxPanX = (BASE_WIDTH - viewW) / 2
    const maxPanY = (BASE_HEIGHT - viewH) / 2
    setZoom(targetZoom)
    setPan({
      x: clamp(stop.x - BASE_WIDTH / 2, -maxPanX, maxPanX),
      y: clamp(stop.y - BASE_HEIGHT / 2, -maxPanY, maxPanY),
    })
  }, [effectiveStopId])

  function handleZoomIn() {
    setZoom((prev) => clamp(Number((prev + ZOOM_STEP).toFixed(2)), MIN_ZOOM, MAX_ZOOM))
  }

  function handleZoomOut() {
    setZoom((prev) => {
      const next = clamp(Number((prev - ZOOM_STEP).toFixed(2)), MIN_ZOOM, MAX_ZOOM)
      if (next === MIN_ZOOM) {
        setPan({ x: 0, y: 0 })
      }
      return next
    })
  }

  function reset() {
    setSelectedStopId(null)
    onSelectStop?.(null)
    setShowRoute(true)
    setShowArea(true)
    setShowStops(true)
    setZoom(MIN_ZOOM)
    setPan({ x: 0, y: 0 })
  }

  function selectStop(id) {
    setSelectedStopId(id)
    onSelectStop?.(id)
  }

  const viewWidth = BASE_WIDTH / zoom
  const viewHeight = BASE_HEIGHT / zoom
  const maxOffsetX = (BASE_WIDTH - viewWidth) / 2
  const maxOffsetY = (BASE_HEIGHT - viewHeight) / 2
  const viewMinX = (BASE_WIDTH - viewWidth) / 2 + clamp(pan.x, -maxOffsetX, maxOffsetX)
  const viewMinY = (BASE_HEIGHT - viewHeight) / 2 + clamp(pan.y, -maxOffsetY, maxOffsetY)
  const viewBoxString = `${viewMinX.toFixed(1)} ${viewMinY.toFixed(1)} ${viewWidth.toFixed(1)} ${viewHeight.toFixed(1)}`

  const activeColor = area?.color || route?.color || '#087f72'

  return (
    <section className={`route-map${compact ? ' route-map--compact' : ''}`} aria-label={title}>
      <div className="route-map__head">
        <div>
          <strong>{title}</strong>
          <span>Mapa esquemático interativo · Pires do Rio – GO (dados demonstrativos)</span>
        </div>
        <MapControls
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={reset}
        />
      </div>

      <div className="route-map__viewport">
        <svg
          className="route-map__svg-canvas"
          viewBox={viewBoxString}
          role="group"
          aria-label={`${title}. ${route ? `${route.origin || route.name} para ${route.destination || 'região selecionada'}.` : 'Sem trajeto selecionado.'}`}
        >
          {/* Fundo urbano e quadras esquemáticas de Pires do Rio */}
          <rect x="0" y="0" width="600" height="400" className="map-canvas-bg" />

          {/* Curso d'água ilustrativo (Córrego urbano) */}
          <path
            d="M 0 340 Q 150 315, 285 355 T 600 375"
            fill="none"
            className="map-waterway"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Quadras e praças */}
          <g className="map-blocks">
            {URBAN_BLOCKS.map((b, idx) => (
              <rect
                key={idx}
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                rx={b.rx}
                className={b.isPark ? 'map-block map-block--park' : 'map-block'}
              />
            ))}
          </g>

          {/* Malha viária secundária e principal */}
          <g className="map-minor-streets" stroke="#cddce1" strokeWidth="6" fill="none">
            <path d="M 40 105 H 565 M 40 185 H 565 M 40 275 H 565" />
            <path d="M 158 28 V 372 M 288 28 V 372 M 422 28 V 372" />
            <path d="M 100 305 L 260 185 L 490 90" strokeWidth="8" />
            <path d="M 145 105 L 260 185 L 390 270 L 470 305" strokeWidth="8" />
          </g>

          {/* Rótulos dos setores e referências */}
          <g className="map-labels" fill="#526b77" fontSize="9.5" fontWeight="700" letterSpacing="0.06em">
            {SECTOR_LABELS.map((label) => (
              <text key={label.text} x={label.x} y={label.y} textAnchor="middle">
                {label.text}
              </text>
            ))}
          </g>

          {/* Polígono de área atendida (Coleta Seletiva) */}
          {showArea && area?.points?.length > 0 && (
            <polygon
              points={area.points.map((point) => point.join(',')).join(' ')}
              fill={area.color || activeColor}
              fillOpacity="0.22"
              stroke={area.color || activeColor}
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />
          )}

          {/* Trajetos (Linhas, Caronas, Rotas Acessíveis e Coleta) */}
          {showRoute &&
            visibleRoutes.map((item) => {
              const isSelected = route?.id === item.id
              const strokeColor = item.color || activeColor
              const isDashed = serviceType === 'collection' || item.status === 'unknown'
              const pointsAttr = (item.points || []).map((point) => point.join(',')).join(' ')

              return (
                <g key={item.id} className={`map-route-group${isSelected ? ' is-selected' : ''}`}>
                  {isSelected && (
                    <polyline
                      points={pointsAttr}
                      fill="none"
                      stroke="#ffffff"
                      strokeOpacity="0.9"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                  <polyline
                    points={pointsAttr}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={isSelected ? '5' : '3.2'}
                    strokeOpacity={isSelected ? '1' : '0.45'}
                    strokeDasharray={isDashed ? '8 5' : undefined}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    role={onSelectRoute ? 'button' : undefined}
                    tabIndex={onSelectRoute ? 0 : undefined}
                    aria-label={
                      onSelectRoute
                        ? `Selecionar trajeto ${item.name || item.driver || item.id}`
                        : undefined
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
                </g>
              )
            })}

          {/* Marcadores e Paradas */}
          {showStops &&
            activeStops.map((item, index) => {
              const isStopActive = effectiveStopId === item.id
              return (
                <g
                  key={item.id}
                  className={`route-map__marker${isStopActive ? ' is-active' : ''}`}
                  role="button"
                  tabIndex="0"
                  aria-label={`Ponto ${index + 1}: ${item.name}`}
                  aria-pressed={isStopActive}
                  onClick={() => selectStop(item.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      selectStop(item.id)
                    }
                  }}
                >
                  {isStopActive && (
                    <circle
                      cx={item.x}
                      cy={item.y}
                      r="16"
                      fill={activeColor}
                      fillOpacity="0.22"
                      stroke={activeColor}
                      strokeWidth="1.5"
                    />
                  )}
                  <circle
                    cx={item.x}
                    cy={item.y}
                    r={isStopActive ? '10.5' : '8.5'}
                    fill={isStopActive ? activeColor : '#0f263a'}
                    stroke="#ffffff"
                    strokeWidth="2.2"
                  />
                  <text
                    x={item.x}
                    y={item.y + 3.5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9.5"
                    fontWeight="700"
                  >
                    {index + 1}
                  </text>
                  <g transform={`translate(${item.x}, ${item.y - 15})`}>
                    <rect
                      x={-(item.name.length * 3.1 + 8)}
                      y="-11"
                      width={item.name.length * 6.2 + 16}
                      height="15"
                      rx="7.5"
                      className="map-stop-pill"
                    />
                    <text
                      x="0"
                      y="-1"
                      textAnchor="middle"
                      fontSize="8.8"
                      fontWeight="700"
                      className="map-stop-pill__text"
                    >
                      {item.name}
                    </text>
                  </g>
                </g>
              )
            })}
        </svg>
      </div>

      {compact && <span className="map-stamp">Mapa SVG · Pires do Rio</span>}
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
            {(routes.length > 0 || Boolean(markers?.length)) && (
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
            color={activeColor}
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
