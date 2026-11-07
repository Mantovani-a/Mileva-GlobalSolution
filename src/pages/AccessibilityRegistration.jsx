import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { registrationResources, registrationCategories } from '../js/demoAccessibility.js'
import VerificationStatus from '../components/VerificationStatus.jsx'

const steps = ['Responsável', 'Tipo de cadastro', 'Informações do local', 'Evidências', 'Revisão']
const emptyRegistration = {
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

export default function AccessibilityRegistration() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(emptyRegistration)
  const [files, setFiles] = useState([])
  const [fileError, setFileError] = useState('')
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(null)
  const heading = useRef(null)
  useEffect(() => {
    if (Object.keys(errors).length)
      document.querySelector('.registration-page [aria-invalid="true"]')?.focus()
  }, [errors])
  const route = ['Rua ou avenida', 'Trecho de via', 'Rota ou percurso'].includes(data.category)
  const update = (key, value) => setData((current) => ({ ...current, [key]: value }))
  function field(key, label, type = 'text') {
    return (
      <div>
        <label>
          {label} *
          <input
            type={type}
            aria-required="true"
            value={data[key]}
            onChange={(event) => update(key, event.target.value)}
            aria-invalid={Boolean(errors[key])}
            aria-describedby={errors[key] ? `${key}-error` : undefined}
          />
        </label>
        {errors[key] && (
          <span className="field-error" id={`${key}-error`}>
            {errors[key]}
          </span>
        )}
      </div>
    )
  }
  function advance(event) {
    event.preventDefault()
    const requiredByStep = [
      ['responsible', 'organization', 'email', 'relation'],
      ['category'],
      ['name', 'region', 'description', ...(route ? ['start', 'end'] : [])],
      [],
      [],
    ]
    const nextErrors = {}
    for (const key of requiredByStep[step]) {
      if (!data[key].trim()) nextErrors[key] = 'Preencha este campo para continuar.'
    }
    if (step === 0 && data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      nextErrors.email = 'Informe um e-mail no formato nome@exemplo.com.'
    if (step === 2 && !data.resources.length)
      nextErrors.resources = 'Selecione ao menos um recurso.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length || (step === 3 && fileError)) return
    if (step === 4) {
      setSent(`DEMO-${Date.now().toString().slice(-6)}`)
      setFiles([])
      setData(emptyRegistration)
      return
    }
    setStep((value) => value + 1)
    heading.current?.focus()
  }
  function chooseFiles(event) {
    const selected = Array.from(event.target.files || [])
    const invalid = selected.some(
      (file) =>
        !['image/png', 'image/jpeg', 'application/pdf'].includes(file.type) ||
        file.size > 5 * 1024 * 1024,
    )
    setFileError(invalid ? 'Use JPG, PNG ou PDF com até 5 MB por arquivo.' : '')
    setFiles(invalid ? [] : selected)
    event.target.value = ''
  }
  if (sent)
    return (
      <section className="registration-page">
        <h1>Simulação concluída</h1>
        <p role="status">
          Pedido demonstrativo {sent}. Nenhuma solicitação foi recebida por uma equipe real.
        </p>
        <VerificationStatus status="pending" />
        <p>Os arquivos selecionados foram descartados e nenhum dado do formulário foi salvo.</p>
        <Link className="text-link" to="/app/rotas/acessibilidade">
          Voltar à consulta
        </Link>
      </section>
    )
  return (
    <section className="registration-page">
      <Link className="module-back" to="/app/rotas/acessibilidade">
        ← Voltar à acessibilidade
      </Link>
      <h1>Solicitar cadastro</h1>
      <p className="demo-notice">
        Simulação local. Use informações fictícias. Arquivos não são enviados nem persistidos e
        serão descartados ao sair ou concluir.
      </p>
      <p>Etapa {step + 1} de 5</p>
      <h2 tabIndex="-1" ref={heading}>
        {steps[step]}
      </h2>
      <VerificationStatus status="draft" />
      <form className="module-form" noValidate onSubmit={advance}>
        {step === 0 && (
          <>
            {field('responsible', 'Nome do responsável')}
            {field('organization', 'Organização ou estabelecimento')}
            {field('email', 'E-mail de contato', 'email')}
            <label>
              Tipo de vínculo *
              <select
                value={data.relation}
                aria-label="Tipo de vínculo *"
                aria-required="true"
                onChange={(event) => update('relation', event.target.value)}
                aria-invalid={Boolean(errors.relation)}
                aria-describedby="relation-error"
              >
                <option value="">Selecione</option>
                <option>Representante do poder público</option>
                <option>Proprietário ou responsável por local privado</option>
              </select>
              <span className="field-error" id="relation-error">
                {errors.relation}
              </span>
            </label>
          </>
        )}
        {step === 1 && (
          <label>
            O que deseja cadastrar? *
            <select
              value={data.category}
              aria-label="O que deseja cadastrar? *"
              aria-required="true"
              onChange={(event) =>
                setData((current) => ({
                  ...current,
                  category: event.target.value,
                  start: '',
                  end: '',
                }))
              }
              aria-invalid={Boolean(errors.category)}
              aria-describedby="category-error"
            >
              <option value="">Selecione</option>
              {registrationCategories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
            <span className="field-error" id="category-error">
              {errors.category}
            </span>
          </label>
        )}
        {step === 2 && (
          <>
            {field('name', 'Nome')}
            {field('region', 'Endereço ou região')}
            {field('description', 'Descrição')}
            {route && (
              <>
                {field('start', 'Início do trecho ou percurso')}
                {field('end', 'Fim do trecho ou percurso')}
              </>
            )}
            <fieldset
              tabIndex="-1"
              aria-invalid={Boolean(errors.resources)}
              aria-describedby="resources-error"
            >
              <legend>Recursos existentes *</legend>
              {registrationResources.map((resource) => (
                <label className="check-label" key={resource}>
                  <input
                    type="checkbox"
                    checked={data.resources.includes(resource)}
                    onChange={() =>
                      update(
                        'resources',
                        data.resources.includes(resource)
                          ? data.resources.filter((item) => item !== resource)
                          : [...data.resources, resource],
                      )
                    }
                  />
                  <span>{resource}</span>
                </label>
              ))}
              <span className="field-error" id="resources-error">
                {errors.resources}
              </span>
            </fieldset>
          </>
        )}
        {step === 3 && (
          <>
            <label>
              Fotos, documentos ou comprovantes técnicos (opcional)
              <input
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={chooseFiles}
                aria-describedby="file-guidance file-error"
              />
            </label>
            <p id="file-guidance">JPG, PNG ou PDF, até 5 MB cada. Somente seleção temporária.</p>
            <p className="field-error" id="file-error" role="status">
              {fileError}
            </p>
            <ul>
              {files.map((file, index) => (
                <li key={`${file.name}-${index}`}>
                  {file.name} · {file.type} · {Math.ceil(file.size / 1024)} KB
                </li>
              ))}
            </ul>
            {(files.length > 0 || fileError) && (
              <button
                type="button"
                className="favorite-button"
                onClick={() => {
                  setFiles([])
                  setFileError('')
                }}
              >
                Remover arquivos
              </button>
            )}
          </>
        )}
        {step === 4 && (
          <>
            <h3>Revise o pedido fictício</h3>
            <dl className="detail-facts">
              {Object.entries(data)
                .filter(([, value]) => value.length > 0)
                .map(([key, value]) => (
                  <div key={key}>
                    <dt>
                      {
                        {
                          responsible: 'Responsável',
                          organization: 'Organização',
                          email: 'E-mail',
                          relation: 'Vínculo',
                          category: 'Categoria',
                          name: 'Nome',
                          region: 'Região',
                          description: 'Descrição',
                          start: 'Início',
                          end: 'Fim',
                          resources: 'Recursos',
                        }[key]
                      }
                    </dt>
                    <dd>{Array.isArray(value) ? value.join(' ') : value}</dd>
                  </div>
                ))}
            </dl>
            <p>Evidências temporárias: {files.length} arquivo(s).</p>
            <p>O envio abaixo é somente uma simulação.</p>
          </>
        )}
        <div className="result-row__actions">
          {step > 0 && (
            <button
              type="button"
              onClick={() => {
                setStep((value) => value - 1)
                setErrors({})
                heading.current?.focus()
              }}
            >
              Voltar
            </button>
          )}
          <button className="module-primary" type="submit">
            {step === 4 ? 'Enviar solicitação' : 'Continuar'}
          </button>
        </div>
      </form>
    </section>
  )
}
