import { TransitLine } from '../models/UrbanModels.js'

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
}

function matchesText(source, query) {
  const normalizedQuery = normalizeText(query)
  if (!normalizedQuery) return true
  return normalizeText(source).includes(normalizedQuery)
}

export const transitLines = [
  new TransitLine({
    id: 'linha-a',
    name: 'Linha demonstrativa A',
    origin: 'Centro',
    destination: 'Rodoviária',
    departure: '08:00',
    period: 'manha',
    duration: '18 min',
    fare: 'R$ 4,40',
    accessibility: 'Não informada',
    color: '#087f72',
    points: [
      [145, 105],
      [205, 135],
      [260, 185],
      [330, 210],
      [390, 270],
      [470, 305],
    ],
    stops: [
      { id: 'a-1', name: 'Centro', x: 145, y: 105, detail: 'Origem ilustrativa' },
      { id: 'a-2', name: 'Praça Central', x: 260, y: 185, detail: 'Parada intermediária simulada' },
      { id: 'a-3', name: 'Mercado', x: 390, y: 270, detail: 'Parada intermediária simulada' },
      { id: 'a-4', name: 'Rodoviária', x: 470, y: 305, detail: 'Destino ilustrativo' },
    ],
  }),
  new TransitLine({
    id: 'linha-b',
    name: 'Linha demonstrativa B',
    origin: 'Vila Nova',
    destination: 'Centro',
    departure: '09:20',
    period: 'manha',
    duration: '16 min',
    fare: 'R$ 4,40',
    accessibility: 'Não informada',
    color: '#305fba',
    points: [
      [490, 90],
      [440, 115],
      [370, 115],
      [300, 160],
      [230, 140],
      [145, 105],
    ],
    stops: [
      { id: 'b-1', name: 'Vila Nova', x: 490, y: 90, detail: 'Origem ilustrativa' },
      { id: 'b-2', name: 'Avenida Norte', x: 370, y: 115, detail: 'Parada intermediária simulada' },
      { id: 'b-3', name: 'Praça Central', x: 230, y: 140, detail: 'Parada intermediária simulada' },
      { id: 'b-4', name: 'Centro', x: 145, y: 105, detail: 'Destino ilustrativo' },
    ],
  }),
  new TransitLine({
    id: 'linha-c',
    name: 'Linha demonstrativa C',
    origin: 'Área Escolar',
    destination: 'Rodoviária',
    departure: '13:40',
    period: 'tarde',
    duration: '22 min',
    fare: 'R$ 4,80',
    accessibility: 'Não informada',
    color: '#a45b19',
    points: [
      [100, 305],
      [170, 285],
      [230, 250],
      [310, 285],
      [390, 270],
      [470, 305],
    ],
    stops: [
      { id: 'c-1', name: 'Área Escolar', x: 100, y: 305, detail: 'Origem ilustrativa' },
      { id: 'c-2', name: 'Bairro Oeste', x: 230, y: 250, detail: 'Parada intermediária simulada' },
      { id: 'c-3', name: 'Mercado', x: 390, y: 270, detail: 'Parada intermediária simulada' },
      { id: 'c-4', name: 'Rodoviária', x: 470, y: 305, detail: 'Destino ilustrativo' },
    ],
  }),
  new TransitLine({
    id: 'linha-d',
    name: 'Linha demonstrativa D',
    origin: 'Centro',
    destination: 'Bairro Sul',
    departure: '18:10',
    period: 'noite',
    duration: '15 min',
    fare: 'R$ 4,40',
    accessibility: 'Não informada',
    color: '#8054a3',
    points: [
      [145, 105],
      [180, 180],
      [260, 185],
      [320, 245],
      [335, 335],
    ],
    stops: [
      { id: 'd-1', name: 'Centro', x: 145, y: 105, detail: 'Origem ilustrativa' },
      { id: 'd-2', name: 'Praça Central', x: 260, y: 185, detail: 'Parada intermediária simulada' },
      { id: 'd-3', name: 'Bairro Sul', x: 335, y: 335, detail: 'Destino ilustrativo' },
    ],
  }),
]

export function findTransitLine(id) {
  return transitLines.find((line) => line.id === id) || null
}

export function searchTransitLines({ origin = '', destination = '', period = 'todos' } = {}) {
  return transitLines.filter((line) => {
    const matchesOrigin =
      !origin ||
      matchesText(line.origin, origin) ||
      line.stops.some((stop) => matchesText(stop.name, origin))
    const matchesDestination =
      !destination ||
      matchesText(line.destination, destination) ||
      matchesText(line.name, destination) ||
      line.stops.some((stop) => matchesText(stop.name, destination))
    const matchesPeriod = period === 'todos' || line.period === period
    return matchesOrigin && matchesDestination && matchesPeriod
  })
}

export function getTransitPlacesList() {
  const places = new Set()
  for (const line of transitLines) {
    places.add(line.origin)
    places.add(line.destination)
    for (const stop of line.stops) {
      places.add(stop.name)
    }
  }
  return [...places]
}

