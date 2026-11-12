import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import RouteMap from '../components/RouteMap.jsx'
import FavoriteButton from '../components/FavoriteButton.jsx'
import ModuleTitle from '../components/ModuleTitle.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'
import {
  collectionRegions,
  findCollectionRegion,
  materialExamples,
} from '../data/collectionData.js'

export default function CollectionPage() {
  const [params] = useSearchParams()
  const initial = findCollectionRegion(params.get('regiao')) || collectionRegions[0]
  const [regionId, setRegionId] = useState(initial.id)
  const [selectedStopId, setSelectedStopId] = useState(null)

  const region = findCollectionRegion(regionId) || collectionRegions[0]
  const route = region.toMapRouteEntity()

  function selectRegion(nextId) {
    setRegionId(nextId)
    setSelectedStopId(null)
  }

  return (
    <section className="compact-screen collection-screen">
      <div className="search-sheet">
        <ModuleTitle
          icon="recycle"
          title="Coleta Seletiva"
          subtitle="Regiões e programação · Pires do Rio – GO"
        />
        <div className="compact-form">
          <div className="region-pills" role="group" aria-label="Atalhos de região">
            {collectionRegions.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`region-pill${item.id === region.id ? ' is-active' : ''}`}
                aria-pressed={item.id === region.id}
                onClick={() => selectRegion(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <label>
            <span className="visually-hidden">Região ilustrativa</span>
            <ServiceIcon name="pin" />
            <select
              aria-label="Região ilustrativa"
              value={regionId}
              onChange={(event) => selectRegion(event.target.value)}
            >
              {collectionRegions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <p className="form-message" role="status">
            Exibindo programação simulada de {region.name}.
          </p>
        </div>
      </div>
      <RouteMap
        compact
        key={region.id}
        routes={[route]}
        selectedRouteId={region.id}
        area={{ points: region.area, color: region.color }}
        activeStopId={selectedStopId}
        onSelectStop={setSelectedStopId}
        serviceType="collection"
        title={`Mapa da coleta em ${region.name}`}
      />
      <section className="compact-results collection-info" aria-labelledby="collection-schedule">
        <div className="collection-info__heading">
          <div>
            <span className="eyebrow">Programação da região</span>
            <h2 id="collection-schedule">{region.name}</h2>
          </div>
          <FavoriteButton type="collection" id={region.id} label={`região ${region.name}`} />
        </div>
        <dl className="detail-facts">
          <div>
            <dt>Dias ilustrativos</dt>
            <dd>{region.days}</dd>
          </div>
          <div>
            <dt>Faixa de horário simulada</dt>
            <dd>{region.window}</dd>
          </div>
        </dl>
        <h3>Materiais recicláveis</h3>
        <ul className="material-list">
          {materialExamples.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3>Pontos de apoio no mapa</h3>
        <ol className="stop-list">
          {region.stops.map((stop) => (
            <li key={stop.id}>
              <button
                type="button"
                className={selectedStopId === stop.id ? 'is-selected' : ''}
                aria-pressed={selectedStopId === stop.id}
                onClick={() => setSelectedStopId(stop.id)}
              >
                <strong>{stop.name}</strong>
                <span>{stop.detail}</span>
              </button>
            </li>
          ))}
        </ol>
        <p className="compact-disclaimer">
          Programação, área e pontos simulados · confirme regras locais antes do descarte
        </p>
      </section>
    </section>
  )
}
