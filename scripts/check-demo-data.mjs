import assert from 'node:assert/strict'
import { demoCatalog } from '../src/js/demoCatalog.js'
import { transitLines } from '../src/js/demoTransit.js'
import { rideOffers } from '../src/js/demoRides.js'
import { collectionRegions } from '../src/js/demoCollection.js'
import { accessibleRecords, accessibilityMapRecord } from '../src/js/demoAccessibility.js'
import { nextBusDemo } from '../src/js/homeDemoData.js'

assert.ok(demoCatalog.length >= 10, 'O catálogo deve conter ao menos dez registros.')
assert.equal(new Set(demoCatalog.map((item) => `${item.type}:${item.id}`)).size, demoCatalog.length)
for (const records of [transitLines, rideOffers, collectionRegions]) {
  assert.ok(records.length >= 4)
}
for (const record of [
  ...transitLines,
  ...rideOffers,
  ...collectionRegions,
  ...accessibleRecords.map(accessibilityMapRecord),
]) {
  assert.ok(record.id && record.points.length > 0)
  for (const [x, y] of record.points) assert.ok(x >= 0 && x <= 600 && y >= 0 && y <= 400)
  assert.equal(new Set(record.stops.map((stop) => stop.id)).size, record.stops.length)
}
assert.ok(
  accessibleRecords.every((record) => ['approved', 'unknown'].includes(record.status)),
  'Pedidos pendentes não devem estar na consulta pública.',
)
assert.equal(nextBusDemo.line, transitLines[0].name)
assert.equal(nextBusDemo.scheduledTime, transitLines[0].departure)
console.log(
  `Dados consistentes: ${demoCatalog.length} registros no catálogo, IDs únicos e coordenadas dentro do SVG.`,
)
