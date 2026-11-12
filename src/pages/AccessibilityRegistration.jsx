import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import VerificationStatus from '../components/VerificationStatus.jsx'
import ModuleTitle from '../components/ModuleTitle.jsx'
import { registrationCategories, registrationResources } from '../data/accessibilityData.js'
import {
  REGISTRATION_STEPS,
  createEmptyRegistrationDraft,
  generateProtocolCode,
  isRouteCategory,
  validateRegistrationFiles,
  validateRegistrationStep,
} from '../utils/registrationValidation.js'

export default function AccessibilityRegistration() {
  const steps = REGISTRATION_STEPS

  const [step, setStep] = useState(0)
  const [data, setData] = useState(() => createEmptyRegistrationDraft())
  const [files, setFiles] = useState([])
  const [fileError, setFileError] = useState('')
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(null)
  const heading = useRef(null)

  useEffect(() => {
    if (Object.keys(errors).length)
      document.querySelector('.registration-page [aria-invalid="true"]')?.focus()
  }, [errors])

  const route = isRouteCategory(data.category)
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
    const nextErrors = validateRegistrationStep(step, data)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length || (step === 3 && fileError)) return
    if (step === 4) {
      setSent(generateProtocolCode())
      setFiles([])
      setData(createEmptyRegistrationDraft())
      return
    }
    setStep((value) => value + 1)
    heading.current?.focus()
  }

  function chooseFiles(event) {
    const validation = validateRegistrationFiles(event.target.files)
    setFileError(validation.error)
    setFiles(validation.files)
    event.target.value = ''
  }

  if (sent)
    return (
      <section className="compact-screen registration-page">
        <div className="detail-panel registration-success">
          <ModuleTitle
            icon="clipboard"
            title="Simulação concluída"
            subtitle={`Protocolo demonstrativo ${sent}`}
          />
          <p role="status">
            Pedido demonstrativo {sent}. Nenhuma solicitação foi recebida por uma equipe real.
          </p>
          <VerificationStatus status="pending" />
          <p>Os arquivos selecionados foram descartados e nenhum dado do formulário foi salvo.</p>
          <Link className="module-primary" to="/app/rotas/acessibilidade">
            Voltar à consulta
          </Link>
        </div>
      </section>
    )

  return (
    <section className="compact-screen registration-page">
      <div className="search-sheet detail-header-card">
        <ModuleTitle
          icon="clipboard"
          title="Solicitar cadastro"
          subtitle={`Etapa ${step + 1} de 5 · ${steps[step]}`}
        />
        <div className="registration-stepper" aria-hidden="true">
          {steps.map((label, idx) => (
            <span
              key={label}
              className={`registration-stepper__dot${idx === step ? ' is-current' : idx < step ? ' is-done' : ''}`}
            />
          ))}
        </div>
        <div className="detail-header-card__actions">
          <Link className="module-back-pill" to="/app/rotas/acessibilidade">
            ← Voltar à acessibilidade
          </Link>
        </div>
      </div>
      <div className="registration-body">
        <p className="demo-notice">
          Simulação local. Use informações fictícias. Arquivos não são enviados nem persistidos e
          serão descartados ao sair ou concluir.
        </p>
        <VerificationStatus status="draft" />
        <form className="module-form" noValidate onSubmit={advance}>
          <h2 tabIndex="-1" ref={heading}>
            {steps[step]}
          </h2>
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
      </div>
    </section>
  )
}
