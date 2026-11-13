export const miaTopicCategories = [
  {
    id: 'transito',
    label: 'Fluxo de trânsito',
    shortLabel: 'Trânsito',
    icon: 'bus',
    defaultPrompt: 'Como está o fluxo de trânsito e as linhas agora?',
    description: 'Horários de pico, linhas de ônibus e caronas em Pires do Rio.',
  },
  {
    id: 'lugares',
    label: 'Recomendar lugares',
    shortLabel: 'Lugares',
    icon: 'pin',
    defaultPrompt: 'Quais lugares você recomenda visitar ou utilizar hoje?',
    description: 'Pontos de referência, serviços públicos, estudo e coleta seletiva.',
  },
  {
    id: 'acessibilidade',
    label: 'Situação de acessibilidade',
    shortLabel: 'Acessibilidade',
    icon: 'accessibility',
    defaultPrompt: 'Qual é a situação de acessibilidade nos locais e rotas?',
    description: 'Locais verificados, rampas, piso tátil, Libras e trechos pendentes.',
  },
]

export const miaQuickPrompts = [
  'Como está o fluxo de trânsito agora?',
  'Quais lugares você recomenda em Pires do Rio?',
  'Qual a situação de acessibilidade no Centro?',
  'Como ir do Centro até a Rodoviária?',
  'Quais locais têm rampa e piso tátil verificados?',
  'Quando passa a coleta seletiva no meu bairro?',
]

export const miaTrafficCorridors = [
  {
    id: 'corredor-central',
    name: 'Eixo Centro – Praça Central',
    status: 'Fluxo moderado',
    peakWindow: '07:30–08:30 e 17:30–18:30',
    summary:
      'Concentra a maior circulação de pedestres e integração entre as Linhas A, B e D.',
    recommendedOption: 'Linha demonstrativa A (08:00, 18 min) ou Carona A para a Área Escolar.',
  },
  {
    id: 'corredor-rodoviaria',
    name: 'Corredor Mercado – Rodoviária',
    status: 'Fluxo estável',
    peakWindow: '13:00–14:30 e 17:15–18:15',
    summary:
      'Trânsito fluido na maior parte do dia, com leve retenção próxima ao Mercado Municipal.',
    recommendedOption: 'Linha demonstrativa A (manhã) ou Linha demonstrativa C (13:40).',
  },
  {
    id: 'corredor-escolar',
    name: 'Acesso Área Escolar – Bairro Oeste',
    status: 'Atenção nos horários de entrada e saída',
    peakWindow: '07:15–07:50 e 13:20–14:00',
    summary:
      'Maior movimento de estudantes e veículos compartilhados nos horários de turno escolar.',
    recommendedOption: 'Carona diária com Ana L. (07:30) ou Linha demonstrativa C (13:40).',
  },
]

export const miaRecommendedPlaces = [
  {
    id: 'rec-praca',
    name: 'Praça Exemplo (Setor Central)',
    category: 'Convivência e conexão urbana',
    accessibilityBadge: 'Verificado · Rampa e piso tátil',
    transitAccess: 'Atendida pelas Linhas A, B e D (Parada Praça Central)',
    highlight:
      'Melhor ponto de encontro e integração rápida no Centro, com calçamento regular e travessia assistida.',
    routeLink: '/app/rotas/acessibilidade?kind=place',
  },
  {
    id: 'rec-biblioteca',
    name: 'Biblioteca Modelo (Setor Norte)',
    category: 'Estudo e serviço público',
    accessibilityBadge: 'Verificado · Sinalização visual e pictogramas',
    transitAccess: 'Acesso próximo pela Linha B (Vila Nova → Centro)',
    highlight:
      'Ambiente silencioso recomendado para estudo e leitura, com comunicação visual clara e atendimento orientado.',
    routeLink: '/app/rotas/acessibilidade?kind=place',
  },
  {
    id: 'rec-rodoviaria',
    name: 'Terminal Rodoviário e Entorno do Mercado',
    category: 'Mobilidade e comércio',
    accessibilityBadge: 'Acesso por linhas regulares e caronas',
    transitAccess: 'Destino final das Linhas A e C + Carona C (17:40)',
    highlight:
      'Principal polo de embarque intermunicipal e abastecimento cotidiano em Pires do Rio.',
    routeLink: '/app/rotas/transporte?destination=Rodovi%C3%A1ria',
  },
  {
    id: 'rec-loja-horizonte',
    name: 'Comércio Acessível — Setor Leste (Loja Horizonte)',
    category: 'Comércio com acessibilidade',
    accessibilityBadge: 'Verificado · Entrada sem degraus e comunicação escrita',
    transitAccess: 'Próximo ao corredor leste / Rodoviária',
    highlight:
      'Referência de estabelecimento comercial sem degraus na entrada e preparado para atendimento inclusivo.',
    routeLink: '/app/rotas/acessibilidade?kind=place',
  },
]

export const miaWelcomeMessage = {
  id: 'mia-welcome',
  sender: 'mia',
  category: 'boas-vindas',
  title: 'Olá! Eu sou a MIA, a inteligência urbana do Mileva.',
  text: 'Posso ajudar você agora mesmo com informações sobre fluxo de trânsito e linhas, recomendação de lugares em Pires do Rio – GO e situação de acessibilidade verificada.',
  highlights: [
    'Trânsito: 4 linhas de ônibus e 4 rotas de carona monitoradas no catálogo.',
    'Lugares: pontos de estudo, praças, serviços e ecopontos de coleta seletiva.',
    'Acessibilidade: 5 registros aprovados e 1 percurso com alerta de trecho incompleto.',
  ],
  actions: [
    { label: 'Ver mapa de rotas', to: '/app/rotas' },
    { label: 'Locais acessíveis', to: '/app/rotas/acessibilidade' },
  ],
}

