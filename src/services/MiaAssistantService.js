import { accessibleRecords } from '../data/accessibilityData.js'
import { collectionRegions } from '../data/collectionData.js'
import {
  miaQuickPrompts,
  miaRecommendedPlaces,
  miaTrafficCorridors,
} from '../data/miaData.js'
import { rideOffers, searchRideOffers } from '../data/ridesData.js'
import { searchTransitLines, transitLines } from '../data/transitData.js'

function normalizeQuery(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function containsAny(text, keywords) {
  return keywords.some((word) => text.includes(word))
}

function detectPlaceInQuery(normalized) {
  const knownPlaces = [
    { token: 'rodoviaria', label: 'Rodoviária' },
    { token: 'praca central', label: 'Praça Central' },
    { token: 'praca', label: 'Praça Central' },
    { token: 'area escolar', label: 'Área Escolar' },
    { token: 'escola', label: 'Área Escolar' },
    { token: 'vila nova', label: 'Vila Nova' },
    { token: 'bairro sul', label: 'Bairro Sul' },
    { token: 'mercado', label: 'Mercado' },
    { token: 'biblioteca', label: 'Biblioteca Modelo' },
    { token: 'centro', label: 'Centro' },
  ]
  return knownPlaces.find((item) => normalized.includes(item.token)) || null
}

export class MiaAssistantService {
  static getReply(userPrompt) {
    const rawPrompt = String(userPrompt ?? '').trim()
    const normalized = normalizeQuery(rawPrompt)
    const mentionedPlace = detectPlaceInQuery(normalized)

    // 1. Intenção: Situação de Acessibilidade
    if (
      containsAny(normalized, [
        'acessibilidade',
        'acessivel',
        'acessiveis',
        'rampa',
        'cadeirante',
        'mobilidade reduzida',
        'piso tatil',
        'cego',
        'visual',
        'braile',
        'libras',
        'auditiva',
        'surdo',
        'degrau',
        'verificado',
      ])
    ) {
      return MiaAssistantService.buildAccessibilityReply(normalized, mentionedPlace)
    }

    // 2. Intenção: Coleta Seletiva e Ecopontos
    if (
      containsAny(normalized, [
        'coleta',
        'seletiva',
        'reciclagem',
        'reciclavel',
        'lixo',
        'descarte',
        'ecoponto',
      ])
    ) {
      return MiaAssistantService.buildCollectionReply(mentionedPlace)
    }

    // 3. Intenção: Recomendação de Lugares
    if (
      containsAny(normalized, [
        'lugar',
        'lugares',
        'recomenda',
        'recomendacao',
        'sugestao',
        'sugere',
        'visitar',
        'onde ir',
        'estudar',
        'biblioteca',
        'lazer',
        'ponto de referencia',
        'servicos publicos',
      ])
    ) {
      return MiaAssistantService.buildPlacesReply(normalized, mentionedPlace)
    }

    // 4. Intenção: Fluxo de Trânsito, Linhas de Ônibus, Horários ou Caronas
    if (
      containsAny(normalized, [
        'transito',
        'fluxo',
        'engarrafamento',
        'movimento',
        'pico',
        'onibus',
        'linha',
        'horario',
        'rota',
        'como ir',
        'chegar',
        'carona',
        'transporte',
        'passagem',
        'tarifa',
      ]) ||
      mentionedPlace
    ) {
      return MiaAssistantService.buildTrafficAndTransitReply(normalized, mentionedPlace)
    }

    // 5. Fallback contextual orientativo
    return MiaAssistantService.buildOverviewReply(rawPrompt)
  }

  static buildTrafficAndTransitReply(normalized, mentionedPlace) {
    if (mentionedPlace) {
      const matchingLines = searchTransitLines({ destination: mentionedPlace.label }).concat(
        searchTransitLines({ origin: mentionedPlace.label }),
      )
      const uniqueLines = Array.from(new Map(matchingLines.map((l) => [l.id, l])).values())
      const matchingRides = searchRideOffers({ destination: mentionedPlace.label }).concat(
        searchRideOffers({ origin: mentionedPlace.label }),
      )
      const uniqueRides = Array.from(new Map(matchingRides.map((r) => [r.id, r])).values())

      const highlights = []
      for (const line of uniqueLines.slice(0, 3)) {
        highlights.push(
          `${line.name}: ${line.origin} → ${line.destination} às ${line.departure} (${line.duration}, tarifa ${line.fare}).`,
        )
      }
      for (const ride of uniqueRides.slice(0, 2)) {
        highlights.push(
          `Carona com ${ride.driver}: ${ride.origin} → ${ride.destination} às ${ride.time} (${ride.days.join(', ')}).`,
        )
      }

      if (highlights.length === 0) {
        highlights.push(
          'Ainda não há linha direta cadastrada para esse ponto específico, mas o Eixo Central conecta as 4 linhas principais.',
        )
      }

      return {
        id: `mia-transit-${Date.now()}`,
        sender: 'mia',
        category: 'transito',
        title: `Trânsito e deslocamento · ${mentionedPlace.label}`,
        text: `Para a região de ${mentionedPlace.label}, o fluxo é considerado estável fora das janelas de pico (07:30–08:30 e 17:30–18:30). Confira as conexões diretas disponíveis no catálogo:`,
        highlights,
        actions: [
          {
            label: `Ver linhas para ${mentionedPlace.label}`,
            to: `/app/rotas/transporte?destination=${encodeURIComponent(mentionedPlace.label)}`,
          },
          {
            label: 'Ver caronas disponíveis',
            to: '/app/rotas/caronas',
          },
        ],
        followUps: [
          'Qual a situação de acessibilidade no Centro?',
          'Quais lugares você recomenda em Pires do Rio?',
        ],
      }
    }

    const corridorHighlights = miaTrafficCorridors.map(
      (corridor) => `${corridor.name}: ${corridor.status} (pico ${corridor.peakWindow}).`,
    )
    const lineSummary = `${transitLines.length} linhas ativas (${transitLines
      .map((l) => `${l.name.replace('Linha demonstrativa ', 'Linha ')} às ${l.departure}`)
      .join(', ')}) e ${rideOffers.length} ofertas de carona recorrente.`

    return {
      id: `mia-traffic-${Date.now()}`,
      sender: 'mia',
      category: 'transito',
      title: 'Panorama do fluxo de trânsito em Pires do Rio – GO',
      text: `Neste momento o fluxo urbano opera com boa fluidez nos corredores principais, exigindo atenção apenas nas trocas de turno escolar e no entorno do Mercado Municipal. ${lineSummary}`,
      highlights: corridorHighlights,
      actions: [
        { label: 'Abrir Transporte Público', to: '/app/rotas/transporte' },
        { label: 'Ver Caronas Diárias', to: '/app/rotas/caronas' },
      ],
      followUps: [
        'Como ir do Centro até a Rodoviária?',
        'Quais locais têm rampa e piso tátil verificados?',
      ],
    }
  }

  static buildPlacesReply(normalized, mentionedPlace) {
    const filteredPlaces = mentionedPlace
      ? miaRecommendedPlaces.filter((place) =>
          normalizeQuery(`${place.name} ${place.highlight}`).includes(
            normalizeQuery(mentionedPlace.label),
          ),
        )
      : miaRecommendedPlaces

    const listToUse = filteredPlaces.length > 0 ? filteredPlaces : miaRecommendedPlaces

    return {
      id: `mia-places-${Date.now()}`,
      sender: 'mia',
      category: 'lugares',
      title: 'Recomendações de lugares em Pires do Rio – GO',
      text: 'Selecionei os locais mais bem avaliados no catálogo do Mileva considerando facilidade de acesso por transporte público, utilidade no dia a dia e recursos de acessibilidade verificados:',
      highlights: listToUse.map(
        (place) =>
          `${place.name} (${place.category}): ${place.highlight} [${place.accessibilityBadge}]`,
      ),
      actions: [
        { label: 'Ver locais acessíveis no mapa', to: '/app/rotas/acessibilidade?kind=place' },
        { label: 'Consultar pontos de coleta', to: '/app/rotas/coleta' },
      ],
      followUps: [
        'Qual a situação de acessibilidade nos locais e rotas?',
        'Como está o fluxo de trânsito agora?',
      ],
    }
  }

  static buildAccessibilityReply(normalized, mentionedPlace) {
    const wantsMobility = containsAny(normalized, ['rampa', 'cadeirante', 'degrau', 'mobilidade'])
    const wantsVisual = containsAny(normalized, ['piso tatil', 'visual', 'cego', 'braile'])
    const wantsHearing = containsAny(normalized, ['libras', 'auditiva', 'surdo', 'comunicacao'])

    let filtered = accessibleRecords
    let focusLabel = 'todos os perfis de acessibilidade'

    if (wantsMobility) {
      filtered = accessibleRecords.filter((rec) => rec.features.includes('mobility'))
      focusLabel = 'mobilidade reduzida (rampas e acesso sem degraus)'
    } else if (wantsVisual) {
      filtered = accessibleRecords.filter((rec) => rec.features.includes('visual'))
      focusLabel = 'deficiência visual (piso tátil e sinalização)'
    } else if (wantsHearing) {
      filtered = accessibleRecords.filter((rec) => rec.features.includes('hearing'))
      focusLabel = 'deficiência auditiva (sinalização visual e comunicação escrita/Libras)'
    }

    const approvedCount = filtered.filter((rec) => rec.status === 'approved').length
    const unverifiedCount = filtered.filter((rec) => rec.status !== 'approved').length

    const highlights = filtered.map((rec) => {
      const badge = rec.status === 'approved' ? 'Verificado' : 'Trecho com lacuna de dados'
      const resourcesText = rec.resources.join(', ')
      const warning = rec.limitation ? ` Atenção: ${rec.limitation}` : ''
      return `${rec.name} (${badge}): ${resourcesText}.${warning}`
    })

    return {
      id: `mia-access-${Date.now()}`,
      sender: 'mia',
      category: 'acessibilidade',
      title: 'Situação de Acessibilidade Urbana',
      text: `Consultando o foco em ${focusLabel}: encontramos ${approvedCount} registro(s) com verificação aprovada e ${unverifiedCount} percurso(s) com alerta de continuidade pendente${
        mentionedPlace ? ` próximos a ${mentionedPlace.label}` : ' em Pires do Rio – GO'
      }.`,
      highlights,
      actions: [
        { label: 'Abrir Mapa de Acessibilidade', to: '/app/rotas/acessibilidade' },
        { label: 'Cadastrar novo local acessível', to: '/app/rotas/acessibilidade/solicitar' },
      ],
      followUps: [
        'Quais lugares você recomenda em Pires do Rio?',
        'Como está o fluxo de trânsito agora?',
      ],
    }
  }

  static buildCollectionReply(mentionedPlace) {
    const highlights = collectionRegions.map(
      (reg) => `${reg.name}: atendimento ${reg.days}, janela das ${reg.window}.`,
    )

    return {
      id: `mia-collection-${Date.now()}`,
      sender: 'mia',
      category: 'lugares',
      title: 'Cronograma e Pontos de Coleta Seletiva',
      text: mentionedPlace
        ? `Confira os dias e janelas de coleta seletiva atendendo ${mentionedPlace.label} e demais setores de Pires do Rio:`
        : 'A coleta seletiva em Pires do Rio – GO é dividida em 4 setores com ecopontos para Papel, Plástico, Metal e Vidro:',
      highlights,
      actions: [{ label: 'Ver setores de coleta no mapa', to: '/app/rotas/coleta' }],
      followUps: [
        'Quais lugares você recomenda em Pires do Rio?',
        'Como está o fluxo de trânsito agora?',
      ],
    }
  }

  static buildOverviewReply(rawPrompt) {
    return {
      id: `mia-overview-${Date.now()}`,
      sender: 'mia',
      category: 'geral',
      title: 'MIA · Assistente Urbana do Mileva',
      text: rawPrompt
        ? `Analisei sua pergunta ("${rawPrompt}"). Eu monitoro três frentes principais em Pires do Rio – GO para facilitar sua rotina:`
        : 'Estou pronta para responder sobre deslocamento, locais úteis e acessibilidade em Pires do Rio – GO:',
      highlights: [
        'Fluxo de trânsito: horários das Linhas A, B, C e D, corredores de pico e caronas.',
        'Recomendação de lugares: Praça Exemplo, Biblioteca Modelo, Rodoviária, Comércio Acessível e Ecopontos.',
        'Situação de acessibilidade: distinção clara entre locais verificados (rampas, piso tátil, comunicação) e percursos sem confirmação.',
      ],
      actions: [
        { label: 'Explorar Transporte Público', to: '/app/rotas/transporte' },
        { label: 'Consultar Acessibilidade', to: '/app/rotas/acessibilidade' },
      ],
      followUps: miaQuickPrompts.slice(0, 3),
    }
  }
}

