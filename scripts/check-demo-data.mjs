import assert from 'node:assert/strict'
import { demoCatalog } from '../src/data/catalogData.js'
import { searchTransitLines, transitLines } from '../src/data/transitData.js'
import { rideOffers, searchRideOffers } from '../src/data/ridesData.js'
import { collectionRegions } from '../src/data/collectionData.js'
import { accessibleRecords, accessibilityMapRecord } from '../src/data/accessibilityData.js'
import {
  combinedTrips,
  getHubLayers,
  getLayerSnapshot,
  nextBusDemo,
  plannedFeatures,
} from '../src/data/homeData.js'
import {
  AccessibleRecord,
  CollectionRegion,
  RideOffer,
  TransitLine,
  UrbanServiceEntity,
} from '../src/models/UrbanModels.js'

assert.ok(demoCatalog.length >= 10, 'O catálogo deve conter ao menos dez registros.')
assert.equal(new Set(demoCatalog.map((item) => `${item.type}:${item.id}`)).size, demoCatalog.length)

for (const records of [transitLines, rideOffers, collectionRegions]) {
  assert.ok(records.length >= 4)
}

for (const line of transitLines) {
  assert.ok(line instanceof TransitLine && line instanceof UrbanServiceEntity)
}
for (const offer of rideOffers) {
  assert.ok(offer instanceof RideOffer && offer instanceof UrbanServiceEntity)
}
for (const region of collectionRegions) {
  assert.ok(region instanceof CollectionRegion && region instanceof UrbanServiceEntity)
  assert.ok(region.getAreaLatLngPolygon().length >= 3)
}
for (const record of accessibleRecords) {
  assert.ok(record instanceof AccessibleRecord && record instanceof UrbanServiceEntity)
}

for (const record of [
  ...transitLines,
  ...rideOffers,
  ...collectionRegions,
  ...accessibleRecords.map(accessibilityMapRecord),
]) {
  assert.ok(record.id && record.points.length > 0)
  for (const [x, y] of record.points) {
    assert.ok(x >= 0 && x <= 600 && y >= 0 && y <= 400)
  }
  for (const [lat, lng] of record.getLatLngPath()) {
    assert.ok(lat <= -17.28 && lat >= -17.32, 'Latitude deve pertencer a Pires do Rio - GO')
    assert.ok(lng >= -48.31 && lng <= -48.25, 'Longitude deve pertencer a Pires do Rio - GO')
  }
  assert.equal(new Set(record.stops.map((stop) => stop.id)).size, record.stops.length)
}

assert.ok(
  accessibleRecords.every((record) => ['approved', 'unknown'].includes(record.status)),
  'Pedidos pendentes não devem estar na consulta pública.',
)
assert.equal(nextBusDemo.line, transitLines[0].name)
assert.equal(nextBusDemo.scheduledTime, transitLines[0].departure)

const hubLayers = getHubLayers()
assert.equal(hubLayers.length, 4)
for (const layer of hubLayers) {
  const snapshot = getLayerSnapshot(layer.id)
  assert.ok(snapshot.routes.length > 0 && snapshot.items.length > 0)
}
assert.ok(combinedTrips.length >= 2)
assert.ok(searchTransitLines({ destination: 'Rodoviária' }).length >= 1)
assert.ok(searchRideOffers({ origin: 'Centro' }).length >= 1)

console.log(
  `Dados e arquitetura consistentes: ${demoCatalog.length} registros no catálogo, ${plannedFeatures.length} funcionalidades futuras planejadas, ${hubLayers.length} camadas integradas e coordenadas georreferenciadas em Pires do Rio - GO.`,
)
