import { transitLines } from './transitData.js'
import { rideOffers } from './ridesData.js'
import { collectionRegions } from './collectionData.js'
import { accessibleRecords, filterAccessibleRecords } from './accessibilityData.js'

export const homeServices = [
  {
    id: 'transporte',
    title: 'Transporte Público',
    description: 'Linhas, paradas e horários simulados',
    href: '/app/rotas/transporte',
    icon: 'bus',
  },
  {
    id: 'caronas',
    title: 'Carona Diária',
    description: 'Ofertas recorrentes de demonstração',
    href: '/app/rotas/caronas',
    icon: 'car',
  },
  {
    id: 'coleta',
    title: 'Coleta Seletiva',
    description: 'Dias e janelas por região fictícia',
    href: '/app/rotas/coleta',
    icon: 'recycle',
  },
  {
    id: 'acessibilidade',
    title: 'Acessibilidade',
    description: 'Rotas, locais e pedidos simulados',
    href: '/app/rotas/acessibilidade',
    icon: 'accessibility',
  },
]

const firstLine = transitLines[0]

export const nextBusDemo = {
  id: firstLine.id,
  line: firstLine.name,
  route: `${firstLine.origin} → ${firstLine.destination}`,
  scheduledTime: firstLine.departure,
  estimatedArrival: '5 min',
  progress: 58,
  href: `/app/rotas/transporte/${firstLine.id}`,
}

export const plannedFeatures = [
  {
    id: 'urban-info-hub',
    title: 'Guia de locais e informações úteis da cidade',
    pillar: 'Cidade no Cotidiano',
    phase: 'Etapa 01 · Mapa Urbano Local',
    icon: 'pin',
    summary:
      'Consulta rápida no mapa para unidades de saúde, escolas, praças, feiras e pontos de atendimento em Pires do Rio.',
    technicalScope:
      'Camada interativa no Leaflet com filtros rápidos por categoria e atalho direto para traçar chegada pelo transporte local.',
    targetAudiences: ['Idosos', 'Estudantes', 'Moradores que consultam informações da cidade'],
  },
  {
    id: 'community-participation',
    title: 'Participação comunitária no mapa',
    pillar: 'Colaboração Cidadã',
    phase: 'Etapa 02 · Relatos da Vizinhança',
    icon: 'clipboard',
    summary:
      'Marcação visual de avisos úteis entre moradores sobre condições de calçadas, rampas, iluminação e abrigos de parada.',
    technicalScope:
      'Fluxo simplificado em etapas rápidas pensado para uso com uma mão no smartphone.',
    targetAudiences: ['Pessoas com deficiência', 'Usuários do transporte público', 'Trabalhadores'],
  },
  {
    id: 'smart-journey-flow',
    title: 'Planejador visual de trajeto combinado',
    pillar: 'Experiência e Navegabilidade',
    phase: 'Etapa 03 · Fluxo Integrado MVP',
    icon: 'bus',
    summary:
      'Combinação visual em uma única tela entre caminhada acessível, linha de ônibus ou carona disponível para o mesmo destino.',
    technicalScope:
      'Comparação limpa de opções lado a lado com destaque de tempo estimado, acessibilidade do percurso e favoritos.',
    targetAudiences: ['Trabalhadores', 'Estudantes', 'Pessoas com deficiência'],
  },
]

export const combinedTrips = [
  {
    id: 'combo-rodoviaria',
    title: 'Vila Nova → Centro → Rodoviária',
    totalDuration: '34 min estimados',
    summary:
      'Combina carona de bairro até o Centro com a Linha A e trecho acessível com piso tátil.',
    steps: [
      {
        badge: '01',
        mode: 'Carona Diária',
        icon: 'car',
        title: 'Vila Nova → Centro',
        detail: 'Saída 08:10 com Bruno M. · 12 min',
        to: '/app/rotas/caronas?oferta=carona-b',
      },
      {
        badge: '02',
        mode: 'Transporte Público',
        icon: 'bus',
        title: 'Centro → Rodoviária (Linha A)',
        detail: 'Embarque na Praça Central · 18 min · R$ 4,40',
        to: '/app/rotas/transporte/linha-a',
      },
      {
        badge: '03',
        mode: 'Rota Acessível',
        icon: 'accessibility',
        title: 'Avenida Modelo — trecho central',
        detail: 'Percurso com piso tátil indicado · 4 min',
        to: '/app/rotas/acessibilidade/avenida-demo',
      },
    ],
  },
  {
    id: 'combo-escolar',
    title: 'Centro → Área Escolar → Rodoviária',
    totalDuration: '36 min estimados',
    summary:
      'Integração entre carona matinal, trecho oeste sinalizado e Linha C no período da tarde.',
    steps: [
      {
        badge: '01',
        mode: 'Carona Diária',
        icon: 'car',
        title: 'Centro → Área Escolar',
        detail: 'Saída 07:30 com Ana L. · 2 vagas',
        to: '/app/rotas/caronas?oferta=carona-a',
      },
      {
        badge: '02',
        mode: 'Rota Acessível',
        icon: 'accessibility',
        title: 'Trecho Oeste — circulação local',
        detail: 'Sinalização simples e apoio visual no entorno escolar',
        to: '/app/rotas/acessibilidade/trecho-demo',
      },
      {
        badge: '03',
        mode: 'Transporte Público',
        icon: 'bus',
        title: 'Área Escolar → Rodoviária (Linha C)',
        detail: 'Saída 13:40 · 22 min · R$ 4,80',
        to: '/app/rotas/transporte/linha-c',
      },
    ],
  },
]

export function getHubLayers() {
  return [
    {
      id: 'transporte',
      label: 'Transporte',
      title: 'Transporte Público',
      icon: 'bus',
      to: '/app/rotas/transporte',
      count: transitLines.length,
      unit: 'linhas',
      description: 'Linhas urbanas, paradas numeradas e horários previstos.',
    },
    {
      id: 'caronas',
      label: 'Caronas',
      title: 'Carona Diária',
      icon: 'car',
      to: '/app/rotas/caronas',
      count: rideOffers.length,
      unit: 'ofertas',
      description: 'Deslocamentos recorrentes compartilhados entre bairros.',
    },
    {
      id: 'coleta',
      label: 'Coleta',
      title: 'Coleta Seletiva',
      icon: 'recycle',
      to: '/app/rotas/coleta',
      count: collectionRegions.length,
      unit: 'regiões',
      description: 'Dias de atendimento, pontos de apoio e materiais recicláveis.',
    },
    {
      id: 'acessibilidade',
      label: 'Acessibilidade',
      title: 'Acessibilidade',
      icon: 'accessibility',
      to: '/app/rotas/acessibilidade',
      count: accessibleRecords.length,
      unit: 'registros',
      description: 'Rotas com rampas, piso tátil, apoio sonoro e participação cidadã.',
    },
  ]
}

export function getLayerSnapshot(layerId, selectedId = null) {
  if (layerId === 'caronas') {
    const active = rideOffers.find((item) => item.id === selectedId) || rideOffers[0] || null
    return {
      routes: rideOffers,
      area: undefined,
      serviceType: 'ride',
      title: 'Mapa de caronas recorrentes em Pires do Rio – GO',
      items: rideOffers.map((item) => ({
        id: item.id,
        title: item.getDriverDisplayName(),
        subtitle: `${item.origin} → ${item.destination}`,
        meta: `${item.days.join(', ')} · ${item.time} · ${item.seats} vaga${item.seats > 1 ? 's' : ''}`,
        detailTo: `/app/rotas/caronas?oferta=${item.id}`,
        detailLabel: 'Abrir carona',
      })),
      activeId: active?.id || null,
    }
  }

  if (layerId === 'coleta') {
    const active =
      collectionRegions.find((item) => item.id === selectedId) || collectionRegions[0] || null
    return {
      routes: active ? [active.toMapRouteEntity()] : [],
      area: active ? { points: active.area, color: active.color } : undefined,
      serviceType: 'collection',
      title: 'Mapa das regiões de coleta seletiva em Pires do Rio – GO',
      items: collectionRegions.map((item) => ({
        id: item.id,
        title: item.name,
        subtitle: `${item.days} · ${item.window}`,
        meta: item.stops.map((stop) => stop.name).join(' · '),
        detailTo: `/app/rotas/coleta?regiao=${item.id}`,
        detailLabel: 'Ver região',
      })),
      activeId: active?.id || null,
    }
  }

  if (layerId === 'acessibilidade') {
    const records = filterAccessibleRecords({ kind: 'route' })
    const routes = records.map((item) => item.toMapProjection())
    const active = records.find((item) => item.id === selectedId) || records[0] || null
    return {
      routes,
      area: undefined,
      serviceType: 'accessibility',
      title: 'Mapa de rotas acessíveis em Pires do Rio – GO',
      items: records.map((item) => ({
        id: item.id,
        title: item.name.replace(' — trecho demonstrativo', ''),
        subtitle: item.region,
        meta: item.resources.join(' · '),
        detailTo: `/app/rotas/acessibilidade/${item.id}`,
        detailLabel: 'Ver condições',
      })),
      activeId: active?.id || null,
    }
  }

  const active = transitLines.find((item) => item.id === selectedId) || transitLines[0] || null
  return {
    routes: transitLines,
    area: undefined,
    serviceType: 'transit',
    title: 'Mapa das linhas de transporte em Pires do Rio – GO',
    items: transitLines.map((item) => ({
      id: item.id,
      title: item.name,
      subtitle: `${item.origin} ↔ ${item.destination}`,
      meta: `${item.departure} · ${item.duration} · ${item.fare}`,
      detailTo: `/app/rotas/transporte/${item.id}`,
      detailLabel: 'Ver itinerário',
    })),
    activeId: active?.id || null,
  }
}

