import { AccessibleRecord } from '../models/UrbanModels.js'

export const accessibilityFeatures = [
  {
    id: 'mobility',
    name: 'Mobilidade reduzida',
    description: 'Rampas, entrada sem degraus e banheiro adaptado.',
  },
  {
    id: 'visual',
    name: 'Deficiência visual',
    description: 'Piso tátil, braile e orientação sonora.',
  },
  {
    id: 'hearing',
    name: 'Deficiência auditiva',
    description: 'Sinalização visual e comunicação em Libras.',
  },
  {
    id: 'cognitive',
    name: 'Deficiência intelectual ou cognitiva',
    description: 'Pictogramas e informações em linguagem clara.',
  },
]

export const registrationCategories = [
  'Estabelecimento comercial',
  'Edifício ou serviço público',
  'Praça ou parque',
  'Rua ou avenida',
  'Trecho de via',
  'Rota ou percurso',
]

export const registrationResources = [
  'Rampa de acesso',
  'Elevador',
  'Entrada sem degraus',
  'Banheiro adaptado',
  'Piso tátil',
  'Sinalização em braile',
  'Orientação sonora',
  'Informações para leitores de tela',
  'Sinalização visual',
  'Atendimento em Libras',
  'Comunicação escrita',
  'Pictogramas',
  'Informações em linguagem clara',
]

export const verificationStates = {
  draft: ['Rascunho', 'Pedido ainda em preenchimento.'],
  pending: ['Aguardando análise', 'Pedido demonstrativo ainda não analisado.'],
  reviewing: ['Em análise', 'Revisão simulada em andamento.'],
  correction: ['Correção solicitada', 'Exemplo: detalhe os recursos e complemente as evidências.'],
  approved: ['Aprovado', 'Verificação simulada para demonstração; não é certificação real.'],
  rejected: [
    'Rejeitado',
    'Exemplo: as informações apresentadas ainda não permitem confirmar os recursos.',
  ],
}

export const accessibleRecords = [
  new AccessibleRecord({
    id: 'praca-demo',
    kind: 'place',
    name: 'Praça Exemplo',
    category: 'Praça ou parque',
    region: 'Setor Central — endereço fictício',
    status: 'approved',
    features: ['mobility', 'visual'],
    resources: ['Rampa de acesso', 'Piso tátil'],
    x: 180,
    y: 130,
  }),
  new AccessibleRecord({
    id: 'biblioteca-demo',
    kind: 'place',
    name: 'Biblioteca Modelo',
    category: 'Edifício ou serviço público',
    region: 'Setor Norte — endereço fictício',
    status: 'approved',
    features: ['hearing', 'cognitive'],
    resources: ['Sinalização visual', 'Orientação por pictogramas'],
    x: 420,
    y: 120,
  }),
  new AccessibleRecord({
    id: 'loja-demo',
    kind: 'place',
    name: 'Loja Horizonte Fictícia',
    category: 'Estabelecimento comercial',
    region: 'Setor Leste — endereço fictício',
    status: 'approved',
    features: ['mobility', 'hearing'],
    resources: ['Entrada sem degraus', 'Atendimento por comunicação escrita'],
    x: 460,
    y: 290,
  }),
  new AccessibleRecord({
    id: 'avenida-demo',
    kind: 'route',
    name: 'Avenida Modelo — trecho demonstrativo',
    category: 'Rua ou avenida',
    region: 'Setor Central — geometria fictícia',
    status: 'approved',
    features: ['visual'],
    resources: ['Piso tátil no trecho indicado'],
    points: [
      [180, 130],
      [260, 185],
      [330, 210],
    ],
    limitation:
      'A análise simulada cobre apenas o trecho marcado. A continuidade até outros locais não foi avaliada.',
  }),
  new AccessibleRecord({
    id: 'percurso-demo',
    kind: 'route',
    name: 'Percurso Praça–Biblioteca (fictício)',
    category: 'Rota ou percurso',
    region: 'Setores Central e Norte — geometria fictícia',
    status: 'unknown',
    features: ['mobility'],
    resources: ['Rampa cadastrada no ponto de partida'],
    points: [
      [180, 130],
      [260, 185],
      [370, 115],
      [420, 120],
    ],
    limitation:
      'Há trechos sem informação. Os recursos dos pontos não garantem acessibilidade do percurso completo.',
  }),
  new AccessibleRecord({
    id: 'trecho-demo',
    kind: 'route',
    name: 'Trecho Oeste — exemplo',
    category: 'Trecho de via',
    region: 'Setor Oeste — geometria fictícia',
    status: 'approved',
    features: ['cognitive'],
    resources: ['Sinalização simples no trecho indicado'],
    points: [
      [100, 305],
      [170, 285],
      [230, 250],
    ],
  }),
]

export const initialDemoRequests = [
  {
    id: 'DEMO-101',
    name: 'Centro Comunitário Fictício',
    category: 'Edifício ou serviço público',
    responsible: 'Pessoa Exemplo A',
    resources: ['Rampa de acesso'],
    evidence: 'Duas fotos fictícias da entrada; nenhum arquivo real.',
    status: 'pending',
  },
  {
    id: 'DEMO-102',
    name: 'Parque Modelo',
    category: 'Praça ou parque',
    responsible: 'Pessoa Exemplo B',
    resources: ['Sinalização visual'],
    evidence: 'Relato técnico fictício, sem documento real.',
    status: 'reviewing',
  },
]

export function findAccessibleRecord(id) {
  return accessibleRecords.find((record) => record.id === id) || null
}

export function filterAccessibleRecords({ kind = 'route', category = '', status = '', features = [] } = {}) {
  return accessibleRecords.filter((record) =>
    record.matchesFilter({ kind, category, status, features }),
  )
}

export function accessibilityMapRecord(record) {
  return record instanceof AccessibleRecord
    ? record.toMapProjection()
    : new AccessibleRecord(record).toMapProjection()
}

