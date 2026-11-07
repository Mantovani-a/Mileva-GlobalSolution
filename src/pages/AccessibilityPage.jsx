import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import RouteMap from '../components/RouteMap.jsx'
import {
  accessibleRecords,
  accessibilityFeatures,
  accessibilityMapRecord,
  registrationCategories,
} from '../js/demoAccessibility.js'
import ModuleTitle from '../components/ModuleTitle.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'

export default function AccessibilityPage() {
  const [params] = useSearchParams()
  const [kind, setKind] = useState(params.get('tipo') || 'route')
  const [features, setFeatures] = useState([])
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [selected, setSelected] = useState(null)
  const results = accessibleRecords.filter(
    (item) =>
      item.kind === kind &&
      (!category || item.category === category) &&
      (!status || item.status === status) &&
      features.every((feature) => item.features.includes(feature)),
  )
  const routes = results.map(accessibilityMapRecord)
  const active = results.find((item) => item.id === selected) || results[0]
  return (
    <section className="compact-screen accessibility-screen">
      <ModuleTitle
        icon="accessibility"
        title="Acessibilidade"
        subtitle="Rotas e locais · Pires do Rio – GO"
      />
      <div className="access-segments" aria-label="Tipo de consulta">
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
      <RouteMap
        compact
        key={kind}
        routes={routes}
        selectedRouteId={active?.id}
        onSelectRoute={setSelected}
        markers={kind === 'place' ? routes.flatMap((item) => item.stops) : undefined}
        activeStopId={kind === 'place' ? active?.id + '-0' : undefined}
        onSelectStop={(id) => {
          const item = results.find((record) => id === record.id + '-0')
          if (item) setSelected(item.id)
        }}
        title={kind === 'place' ? 'Locais ilustrativos' : 'Trajetos ilustrativos'}
      />
      {active && (
        <article className="access-main-card">
          <h2>{active.name.replace(' — trecho demonstrativo', '')}</h2>
          <p>{active.region}</p>
          <div className="access-resource-grid">
            {[
              ['ramp', 'Rampas', 'rampa'],
              ['tactile', 'Piso tátil', 'tátil'],
              ['sound', 'Sinalização sonora', 'sonora'],
            ].map(([icon, label, term]) => {
              const known = active.resources.some((resource) =>
                resource.toLowerCase().includes(term),
              )
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
            Ver detalhes <span aria-hidden="true">›</span>
          </Link>
        </article>
      )}
      <Link className="register-secondary" to="/app/rotas/acessibilidade/solicitar">
        ▤ Registrar local ou rota
      </Link>
      <p className="compact-disclaimer">
        ⓘ Simulação de dados · continuidade do percurso não garantida
      </p>
      <details className="access-filter-disclosure">
        <summary>Filtrar recursos e categorias</summary>
        <form className="module-form access-filters" onSubmit={(event) => event.preventDefault()}>
          <h2>Filtrar recursos</h2>
          <fieldset>
            <legend>Recursos necessários (combinar filtros)</legend>
            {accessibilityFeatures.map((feature) => (
              <label className="check-label" key={feature.id}>
                <input
                  type="checkbox"
                  checked={features.includes(feature.id)}
                  onChange={() =>
                    setFeatures((current) =>
                      current.includes(feature.id)
                        ? current.filter((id) => id !== feature.id)
                        : [...current, feature.id],
                    )
                  }
                />
                <span>
                  {feature.name}
                  <small>{feature.description}</small>
                </span>
              </label>
            ))}
          </fieldset>
          <label>
            Categoria de local
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="">Todas</option>
              {registrationCategories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Estado de verificação
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">Todos os publicados</option>
              <option value="approved">Verificação simulada</option>
              <option value="unknown">Sem informação suficiente</option>
            </select>
          </label>
        </form>
      </details>
      <details className="access-other-results">
        <summary>Resultados da consulta ({results.length})</summary>
        <section className="favorite-group">
          <h2>Resultados ({results.length})</h2>
          <div className="result-list">
            {results.map((item) => (
              <article
                className={`result-row${active?.id === item.id ? ' is-selected' : ''}`}
                key={item.id}
              >
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <small>
                    {item.status === 'approved'
                      ? 'Verificação simulada'
                      : 'Sem informação suficiente'}
                  </small>
                </div>
                <div className="result-row__actions">
                  <button
                    type="button"
                    onClick={() => setSelected(item.id)}
                    aria-pressed={active?.id === item.id}
                  >
                    Mostrar no mapa
                  </button>
                  <Link to={`/app/rotas/acessibilidade/${item.id}`}>Ver detalhes</Link>
                </div>
              </article>
            ))}
          </div>
          {!results.length && (
            <p className="empty-state" role="status">
              Nenhum exemplo combina esses filtros. Remova um filtro para ampliar a consulta.
            </p>
          )}
        </section>
      </details>
      <p>
        <Link className="text-link" to="/app/rotas/acessibilidade/analise">
          Demonstração: análise de cadastros
        </Link>
      </p>
    </section>
  )
}
