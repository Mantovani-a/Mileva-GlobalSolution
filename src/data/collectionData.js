import { CollectionRegion } from '../models/UrbanModels.js'

export const collectionRegions = [
  new CollectionRegion({
    id: 'centro',
    name: 'Centro',
    days: 'Terça e sexta',
    window: '08:00–11:00',
    color: '#087f72',
    area: [
      [85, 60],
      [310, 60],
      [340, 205],
      [105, 230],
    ],
    points: [
      [120, 100],
      [190, 105],
      [260, 145],
      [300, 195],
    ],
    stops: [
      { id: 'co-1', name: 'Ponto ilustrativo 1', x: 120, y: 100, detail: 'Descarte demonstrativo' },
      { id: 'co-2', name: 'Ponto ilustrativo 2', x: 300, y: 195, detail: 'Descarte demonstrativo' },
    ],
  }),
  new CollectionRegion({
    id: 'vila-nova',
    name: 'Vila Nova',
    days: 'Quarta',
    window: '13:00–16:00',
    color: '#305fba',
    area: [
      [330, 45],
      [555, 45],
      [550, 185],
      [335, 200],
    ],
    points: [
      [390, 75],
      [490, 90],
      [510, 150],
      [400, 170],
    ],
    stops: [
      { id: 'vn-1', name: 'Ponto ilustrativo 1', x: 390, y: 75, detail: 'Descarte demonstrativo' },
      { id: 'vn-2', name: 'Ponto ilustrativo 2', x: 510, y: 150, detail: 'Descarte demonstrativo' },
    ],
  }),
  new CollectionRegion({
    id: 'bairro-sul',
    name: 'Bairro Sul',
    days: 'Quinta',
    window: '09:00–12:00',
    color: '#a45b19',
    area: [
      [230, 215],
      [435, 205],
      [485, 365],
      [240, 370],
    ],
    points: [
      [280, 245],
      [330, 285],
      [390, 270],
      [420, 340],
    ],
    stops: [
      { id: 'bs-1', name: 'Ponto ilustrativo 1', x: 280, y: 245, detail: 'Descarte demonstrativo' },
      { id: 'bs-2', name: 'Ponto ilustrativo 2', x: 420, y: 340, detail: 'Descarte demonstrativo' },
    ],
  }),
  new CollectionRegion({
    id: 'area-escolar',
    name: 'Área Escolar',
    days: 'Segunda',
    window: '14:00–17:00',
    color: '#8054a3',
    area: [
      [40, 205],
      [225, 210],
      [230, 375],
      [45, 375],
    ],
    points: [
      [80, 250],
      [100, 305],
      [170, 315],
      [205, 345],
    ],
    stops: [
      { id: 'ae-1', name: 'Ponto ilustrativo 1', x: 80, y: 250, detail: 'Descarte demonstrativo' },
      { id: 'ae-2', name: 'Ponto ilustrativo 2', x: 205, y: 345, detail: 'Descarte demonstrativo' },
    ],
  }),
]

export const materialExamples = ['Papel', 'Plástico', 'Metal', 'Vidro']

export function findCollectionRegion(id) {
  return collectionRegions.find((region) => region.id === id) || null
}

