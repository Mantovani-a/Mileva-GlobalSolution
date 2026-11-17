import { useState } from 'react'
import {
  CONTACT_SUBJECTS,
  createEmptyContactDraft,
  validateContactForm,
} from '../utils/registrationValidation.js'
import ServiceIcon from './ServiceIcon.jsx'

export default function ContactSection() {
  const [formData, setFormData] = useState(() => createEmptyContactDraft())
  const [errors, setErrors] = useState({})
  const [submittedRecord, setSubmittedRecord] = useState(null)

  function handleFieldChange(field, value) {
    const nextData = { ...formData, [field]: value }
    setFormData(nextData)

    if (errors[field]) {
      const nextErrors = validateContactForm(nextData)
      setErrors((prev) => ({
        ...prev,
        [field]: nextErrors[field] || '',
      }))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validateContactForm(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setSubmittedRecord({
      protocol: `CONTATO-${Date.now().toString().slice(-6)}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject,
      message: formData.message.trim(),
    })
  }

  function handleReset() {
    setFormData(createEmptyContactDraft())
    setErrors({})
    setSubmittedRecord(null)
  }

  const messageLength = formData.message.length

  return (
    <section id="contato" className="team-contact" aria-labelledby="team-contact-title">
      <div className="team-contact__info">
        <p className="eyebrow">Canal de Comunicação e Parcerias</p>
        <h2 id="team-contact-title">Entre em contato com a equipe</h2>
        <p className="team-contact__lead">
          Envie dúvidas sobre a arquitetura do Mileva, sugestões de rotas para a cidade-piloto de
          Pires do Rio – GO ou propostas de integração institucional.
        </p>

        <ul className="team-contact__highlights" aria-label="Frentes de atendimento">
          <li>
            <span className="team-contact__icon" aria-hidden="true">
              <ServiceIcon name="pin" />
            </span>
            <div>
              <strong>Cidade-piloto demonstrativa</strong>
              <span>Pires do Rio – GO · Mobilidade e Serviços Urbanos</span>
            </div>
          </li>
          <li>
            <span className="team-contact__icon" aria-hidden="true">
              <ServiceIcon name="clipboard" />
            </span>
            <div>
              <strong>Validação direta na página</strong>
              <span>Campos verificados em tempo real, sem uso de janelas externas.</span>
            </div>
          </li>
          <li>
            <span className="team-contact__icon" aria-hidden="true">
              <ServiceIcon name="info" />
            </span>
            <div>
              <strong>Privacidade no MVP acadêmico</strong>
              <span>Os dados preenchidos permanecem apenas na sessão local do navegador.</span>
            </div>
          </li>
        </ul>
      </div>

      <div className="team-contact__card">
        {submittedRecord ? (
          <div className="team-contact__success" role="status" aria-live="polite">
            <div className="team-contact__success-badge">
              <ServiceIcon name="check" />
              <span>Mensagem validada e registrada</span>
            </div>
            <h3>Obrigado pelo contato, {submittedRecord.name}!</h3>
            <p>
              Sua mensagem foi validada na demonstração sob o protocolo{' '}
              <strong>{submittedRecord.protocol}</strong>.
            </p>
            <dl className="team-contact__summary">
              <div>
                <dt>E-mail informado</dt>
                <dd>{submittedRecord.email}</dd>
              </div>
              <div>
                <dt>Assunto</dt>
                <dd>{submittedRecord.subject}</dd>
              </div>
              <div>
                <dt>Mensagem</dt>
                <dd>{submittedRecord.message}</dd>
              </div>
            </dl>
            <button type="button" className="team-contact__submit" onClick={handleReset}>
              Enviar nova mensagem
            </button>
          </div>
        ) : (
          <form className="team-contact__form" onSubmit={handleSubmit} noValidate>
            <div className="team-contact__field">
              <label htmlFor="contact-name">Nome completo *</label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(event) => handleFieldChange('name', event.target.value)}
                placeholder="Ex.: João Carlos"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
              />
              {errors.name && (
                <small id="contact-name-error" className="team-contact__error" role="alert">
                  {errors.name}
                </small>
              )}
            </div>

            <div className="team-contact__field">
              <label htmlFor="contact-email">E-mail para retorno *</label>
              <input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(event) => handleFieldChange('email', event.target.value)}
                placeholder="nome@exemplo.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
              />
              {errors.email && (
                <small id="contact-email-error" className="team-contact__error" role="alert">
                  {errors.email}
                </small>
              )}
            </div>

            <div className="team-contact__field">
              <label htmlFor="contact-subject">Assunto *</label>
              <select
                id="contact-subject"
                value={formData.subject}
                onChange={(event) => handleFieldChange('subject', event.target.value)}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
              >
                <option value="">Selecione um assunto</option>
                {CONTACT_SUBJECTS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <small id="contact-subject-error" className="team-contact__error" role="alert">
                  {errors.subject}
                </small>
              )}
            </div>

            <div className="team-contact__field">
              <div className="team-contact__label-row">
                <label htmlFor="contact-message">Mensagem *</label>
                <span className="team-contact__counter">
                  {messageLength}/500 caracteres
                </span>
              </div>
              <textarea
                id="contact-message"
                rows={4}
                maxLength={500}
                value={formData.message}
                onChange={(event) => handleFieldChange('message', event.target.value)}
                placeholder="Descreva sua dúvida, sugestão de rota ou avaliação (mínimo de 15 caracteres)..."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
              />
              {errors.message && (
                <small id="contact-message-error" className="team-contact__error" role="alert">
                  {errors.message}
                </small>
              )}
            </div>

            <div className="team-contact__footer">
              <small>* Campos obrigatórios com validação local.</small>
              <button type="submit" className="team-contact__submit">
                <span>Enviar mensagem</span>
                <ServiceIcon name="send" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
