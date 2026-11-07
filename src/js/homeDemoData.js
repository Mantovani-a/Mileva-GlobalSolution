import { transitLines } from './demoTransit.js'

export const homeServices = [
  {
    id: 'transporte',
    title: 'Transporte Público',
    icon: 'bus',
    description: 'Linhas, horários e paradas demonstrativas.',
    href: '/app/rotas/transporte',
  },
  {
    id: 'caronas',
    title: 'Carona Diária',
    icon: 'car',
    description: 'Ofertas recorrentes para trajetos do cotidiano.',
    href: '/app/rotas/caronas',
  },
  {
    id: 'coleta',
    title: 'Coleta Seletiva',
    icon: 'recycle',
    description: 'Regiões e programação demonstrativas.',
    href: '/app/rotas/coleta',
  },
  {
    id: 'acessibilidade',
    title: 'Acessibilidade',
    icon: 'accessibility',
    description: 'Recursos, locais e trajetos demonstrativos.',
    href: '/app/rotas/acessibilidade',
  },
]

const previewLine = transitLines[0]
export const nextBusDemo = {
  line: previewLine.name,
  route: `${previewLine.origin} → ${previewLine.destination} (exemplo)`,
  scheduledTime: previewLine.departure,
  estimatedArrival: '5 min',
  progress: 58,
}
