export const REGISTRATION_STEPS = [
  'Responsável',
  'Tipo de cadastro',
  'Informações do local',
  'Evidências',
  'Revisão',
]

const ROUTE_CATEGORIES = ['Rua ou avenida', 'Trecho de via', 'Rota ou percurso']
const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'application/pdf']
const MAX_FILE_BYTES = 5 * 1024 * 1024

export function createEmptyRegistrationDraft() {
  return {
    responsible: '',
    organization: '',
    email: '',
    relation: '',
    category: '',
    name: '',
    region: '',
    description: '',
    start: '',
    end: '',
    resources: [],
  }
}

export function isRouteCategory(category) {
  return ROUTE_CATEGORIES.includes(category)
}

export function validateRegistrationStep(step, data) {
  const errors = {}
  const isRoute = isRouteCategory(data.category)
  const requiredByStep = [
    ['responsible', 'organization', 'email', 'relation'],
    ['category'],
    ['name', 'region', 'description', ...(isRoute ? ['start', 'end'] : [])],
    [],
    [],
  ]
  const required = requiredByStep[step] || []

  for (const key of required) {
    if (!String(data[key] ?? '').trim()) {
      errors[key] = 'Preencha este campo para continuar.'
    }
  }

  if (step === 0 && data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Informe um e-mail no formato nome@exemplo.com.'
  }

  if (step === 2 && (!Array.isArray(data.resources) || data.resources.length === 0)) {
    errors.resources = 'Selecione ao menos um recurso.'
  }

  return errors
}

export function validateRegistrationFiles(fileList) {
  const selected = Array.from(fileList || [])
  const hasInvalid = selected.some(
    (file) => !ALLOWED_MIME_TYPES.includes(file.type) || file.size > MAX_FILE_BYTES,
  )
  return {
    valid: !hasInvalid,
    files: hasInvalid ? [] : selected,
    error: hasInvalid ? 'Use JPG, PNG ou PDF com até 5 MB por arquivo.' : '',
  }
}

export function generateProtocolCode() {
  return `DEMO-${Date.now().toString().slice(-6)}`
}

