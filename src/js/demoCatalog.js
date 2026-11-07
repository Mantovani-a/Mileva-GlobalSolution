import { transitLines } from './demoTransit.js'
import { rideOffers } from './demoRides.js'
import { collectionRegions } from './demoCollection.js'
import { accessibleRecords } from './demoAccessibility.js'

// Catálogo único de 18 objetos, derivado das bases para não duplicar dados.
export const demoCatalog = [
  ...transitLines.map((line) => ({
    type: 'transit',
    id: line.id,
    category: 'Linhas de ônibus',
    label: `${line.name} · ${line.origin} → ${line.destination}`,
    href: `/app/rotas/transporte/${line.id}`,
  })),
  ...rideOffers.map((offer) => ({
    type: 'ride',
    id: offer.id,
    category: 'Caronas recorrentes',
    label: `${offer.driver} · ${offer.origin} → ${offer.destination}`,
    href: `/app/rotas/caronas?oferta=${offer.id}`,
  })),
  ...collectionRegions.map((region) => ({
    type: 'collection',
    id: region.id,
    category: 'Regiões de coleta',
    label: region.name,
    href: `/app/rotas/coleta?regiao=${region.id}`,
  })),
  ...accessibleRecords.map((record) => ({
    type: 'accessibility',
    id: record.id,
    category: record.kind === 'place' ? 'Locais acessíveis' : 'Rotas de acessibilidade',
    label: record.name,
    href: `/app/rotas/acessibilidade/${record.id}`,
  })),
]
