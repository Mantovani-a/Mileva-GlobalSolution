import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import RouteMap from '../components/RouteMap.jsx'
import FavoriteButton from '../components/FavoriteButton.jsx'
import ModuleTitle from '../components/ModuleTitle.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'
import {
  accessibilityFeatures,
  filterAccessibleRecords,
  registrationCategories,
} from '../data/accessibilityData.js'

export default function AccessibilityPage() {
  const [params] = useSearchParams()
  const [kind, setKind] = useState(params.get('tipo') || 'route')
  const [features, setFeatures] = useState([])
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [selected, setSelected] = useState(null)

  const results = filterAccessibleRecords({ kind, category, status, features })
  const routes = results.map((item) => item.toMapProjection())
  const active = results.find((item) => item.id === selected) || results[0] || null
  const hasActiveFilters = Boolean(features.length > 0 || category || status)

  function toggleFeature(featureId) {
    setFeatures((current) =>
      current.includes(featureId)
        ? current.filter((id) => id !== featureId)
        : [...current, featureId],
    )
  }

  function clearFilters() {
    setFeatures([])
    setCategory('')
    setStatus('')
    setSelected(null)
  }

  return (
    <section className="compact-screen accessibility-screen">
      <div className="search-sheet">
        <ModuleTitle
          icon="accessibility"
          title="Acessibilidade"
          subtitle="Rotas e locais · Pires do Rio – GO"
        />
        <div className="compact-form">
          <div className="access-segments" role="group" aria-label="Tipo de consulta">
            {[
              ['route', 'Rotas'],
              ['place', 'Locais'],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={kind === value}
                onClick={() => {
                  setKind(value)
                  setCategory('')
                  setSelected(null)
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="region-pills" role="group" aria-label="Filtrar por necessidade">
            {accessibilityFeatures.map((feature) => {
              const activeChip = features.includes(feature.id)
              return (
                <button
                  key={feature.id}
                  type="button"
                  className={`region-pill${activeChip ? ' is-active' : ''}`}
                  aria-pressed={activeChip}
                  onClick={() => toggleFeature(feature.id)}
                >
                  {feature.name}
                </button>
              )
            })}
          </div>
          <details className="extra-filters">
            <summary>Categoria e estado de verificação</summary>
            <div className="extra-filters__grid">
              <label>
                Categoria
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  <option value="">Todas as categorias</option>
                  {registrationCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Estado de verificação
                <select value={status} onChange={(event) => setStatus(event.target.value)}>
                  <option value="">Todos os registros</option>
                  <option value="approved">Verificação simulada</option>
                  <option value="unknown">Sem informação suficiente</option>
                </select>
              </label>
            </div>
          </details>
          {hasActiveFilters && (
            <button type="button" className="module-back-pill" onClick={clearFilters}>
              Limpar filtros ({features.length + (category ? 1 : 0) + (status ? 1 : 0)})
            </button>
          )}
        </div>
      </div>

      <RouteMap
        compact
        key={kind}
        routes={routes}
        selectedRouteId={active?.id}
        onSelectRoute={setSelected}
        markers={kind === 'place' ? routes.flatMap((item) => item.stops) : undefined}
        activeStopId={kind === 'place' && active ? `${active.id}-0` : undefined}
        onSelectStop={(id) => {
          const item = results.find((record) => id === `${record.id}-0`)
          if (item) setSelected(item.id)
        }}
        serviceType="accessibility"
        title={kind === 'place' ? 'Locais ilustrativos' : 'Trajetos ilustrativos'}
      />

      <div className="compact-results">
        {active && (
          <article className="access-main-card">
            <div className="collection-info__heading">
              <div>
                <span className="eyebrow">
                  {active.kind === 'place' ? 'Local selecionado' : 'Trecho selecionado'}
                </span>
                <h2>{active.name.replace(' — trecho demonstrativo', '')}</h2>
              </div>
              <FavoriteButton type="accessibility" id={active.id} label={active.name} />
            </div>
            <p>{active.region}</p>
            <div className="access-resource-grid">
              {[
                ['ramp', 'Rampas', 'rampa'],
                ['tactile', 'Piso tátil', 'tátil'],
                ['sound', 'Sinalização sonora', 'sonora'],
              ].map(([icon, label, term]) => {
                const known = active.hasResourceTerm(term)
                return (
                  <div className={known ? '' : 'is-unknown'} key={label}>
                    <span>
                      <ServiceIcon name={icon} />
                    </span>
                    <strong>{label}</strong>
                    {!known && <small>Não informado</small>}
                  </div>
                )
              })}
            </div>
            <Link className="module-primary" to={`/app/rotas/acessibilidade/${active.id}`}>
              Ver condições completas <span aria-hidden="true">›</span>
            </Link>
          </article>
        )}

        <div className="compact-results__head" style={{ marginTop: '14px' }}>
          <h2>{kind === 'place' ? 'Locais catalogados' : 'Rotas catalogadas'}</h2>
          <span className="favorites-count-badge">
            {results.length} {results.length === 1 ? 'item' : 'itens'}
          </span>
        </div>

        <div className="result-list">
          {results.map((item) => (
            <article
              className={`compact-line${active?.id === item.id ? ' is-selected' : ''}`}
              key={item.id}
            >
              <span className="service-shortcut__icon">
                <ServiceIcon name="accessibility" />
              </span>
              <div>
                <button
                  className="route-choice"
                  type="button"
                  onClick={() => setSelected(item.id)}
                  aria-pressed={active?.id === item.id}
                >
                  {item.name.replace(' — trecho demonstrativo', '')}
                  <span>{item.category}</span>
                </button>
                <p>
                  {item.status === 'approved'
                    ? 'Verificação simulada'
                    : 'Sem informação suficiente'}
                </p>
              </div>
              <Link
                className="row-chevron"
                to={`/app/rotas/acessibilidade/${item.id}`}
                aria-label={`Ver detalhes de ${item.name}`}
              >
                ›
              </Link>
            </article>
          ))}
        </div>

        {!results.length && (
          <div className="empty-state" role="status">
            <p>Nenhum registro combina esses filtros.</p>
            <button type="button" className="module-back-pill" onClick={clearFilters}>
              Limpar filtros
            </button>
          </div>
        )}

        <div className="access-community-actions">
          <Link className="register-secondary" to="/app/rotas/acessibilidade/solicitar">
            <ServiceIcon name="clipboard" />
            <span>Registrar local ou rota</span>
          </Link>
          <Link className="register-secondary" to="/app/rotas/acessibilidade/analise">
            <ServiceIcon name="check" />
            <span>Painel de análise de cadastros</span>
          </Link>
        </div>
      </div>

      <p className="compact-disclaimer">
        Simulação de dados · continuidade do percurso não garantida
      </p>
    </section>
  )
}
