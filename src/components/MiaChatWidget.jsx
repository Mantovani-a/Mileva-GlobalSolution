import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { miaTopicCategories, miaWelcomeMessage } from '../data/miaData.js'
import { MiaAssistantService } from '../services/MiaAssistantService.js'
import ServiceIcon from './ServiceIcon.jsx'

const categoryLabels = {
  'boas-vindas': 'Assistente Urbana',
  transito: 'Fluxo de Trânsito',
  lugares: 'Recomendação de Lugares',
  acessibilidade: 'Situação de Acessibilidade',
  geral: 'Consulta Urbana',
}

export default function MiaChatWidget() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTopic, setActiveTopic] = useState('')
  const [messages, setMessages] = useState([miaWelcomeMessage])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const typingTimerRef = useRef(null)

  const submitPrompt = useCallback((promptText, topicId = '') => {
    const cleanPrompt = String(promptText ?? '').trim()
    if (!cleanPrompt) return

    if (topicId) {
      setActiveTopic(topicId)
    }

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: cleanPrompt,
    }

    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    if (typingTimerRef.current) {
      window.clearTimeout(typingTimerRef.current)
    }

    typingTimerRef.current = window.setTimeout(() => {
      const reply = MiaAssistantService.getReply(cleanPrompt)
      setActiveTopic(reply.category || '')
      setMessages((prev) => [...prev, reply])
      setIsTyping(false)
    }, 260)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isTyping, isOpen])

  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        window.clearTimeout(typingTimerRef.current)
      }
    }
  }, [])

  function handleFormSubmit(event) {
    event.preventDefault()
    submitPrompt(inputValue)
  }

  function handleResetChat() {
    if (typingTimerRef.current) {
      window.clearTimeout(typingTimerRef.current)
    }
    setIsTyping(false)
    setActiveTopic('')
    setMessages([miaWelcomeMessage])
  }

  function handleActionClick(targetRoute) {
    setIsOpen(false)
    navigate(targetRoute)
  }

  return (
    <div className={`mia-widget ${isOpen ? 'is-open' : ''}`}>
      {isOpen && (
        <div
          className="mia-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {isOpen && (
        <section
          id="mia-chat-panel"
          className="mia-sheet"
          role="dialog"
          aria-modal="false"
          aria-label="Assistente urbana MIA"
        >
          <div className="mia-sheet__handle" aria-hidden="true">
            <span />
          </div>

          <header className="mia-sheet__header">
            <div className="mia-sheet__identity">
              <div className="mia-sheet__avatar" aria-hidden="true">
                <ServiceIcon name="sparkles" />
                <span className="mia-sheet__status-dot" />
              </div>
              <div className="mia-sheet__meta">
                <div className="mia-sheet__title-row">
                  <strong>MIA</strong>
                  <span className="mia-sheet__badge">Mileva IA</span>
                </div>
                <p>Assistente urbana · Pires do Rio – GO</p>
              </div>
            </div>

            <div className="mia-sheet__header-actions">
              {messages.length > 1 && (
                <button
                  type="button"
                  className="mia-sheet__reset"
                  onClick={handleResetChat}
                  title="Reiniciar conversa"
                >
                  Limpar
                </button>
              )}
              <button
                type="button"
                className="mia-sheet__close"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar conversa com a MIA"
              >
                <ServiceIcon name="close" />
              </button>
            </div>
          </header>

          <div className="mia-domain-bar" aria-label="Categorias principais da MIA">
            {miaTopicCategories.map((topic) => {
              const isTopicActive = activeTopic === topic.id
              return (
                <button
                  key={topic.id}
                  type="button"
                  className={`mia-domain-btn ${isTopicActive ? 'is-active' : ''}`}
                  onClick={() => submitPrompt(topic.defaultPrompt, topic.id)}
                >
                  <span className="mia-domain-btn__icon" aria-hidden="true">
                    <ServiceIcon name={topic.icon} />
                  </span>
                  <span className="mia-domain-btn__label">{topic.shortLabel || topic.label}</span>
                </button>
              )
            })}
          </div>

          <div className="mia-sheet__messages" role="log" aria-live="polite">
            {messages.map((msg) =>
              msg.sender === 'user' ? (
                <div key={msg.id} className="mia-msg mia-msg--user">
                  <div className="mia-msg__bubble">
                    <p>{msg.text}</p>
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="mia-msg mia-msg--mia">
                  <div className="mia-msg__bubble">
                    <div className="mia-msg__head">
                      <span className="mia-msg__mini-avatar" aria-hidden="true">
                        <ServiceIcon name="sparkles" />
                      </span>
                      <span className="mia-msg__tag">
                        {categoryLabels[msg.category] || 'MIA · Mileva IA'}
                      </span>
                    </div>

                    {msg.title && <strong className="mia-msg__title">{msg.title}</strong>}
                    <p className="mia-msg__text">{msg.text}</p>

                    {Array.isArray(msg.highlights) && msg.highlights.length > 0 && (
                      <div className="mia-msg__cards">
                        {msg.highlights.map((item) => (
                          <div key={item} className="mia-msg__card-item">
                            <span className="mia-msg__card-bullet" aria-hidden="true" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {Array.isArray(msg.actions) && msg.actions.length > 0 && (
                      <div className="mia-msg__actions">
                        {msg.actions.map((action) => (
                          <button
                            key={`${msg.id}-${action.label}`}
                            type="button"
                            className="mia-msg__action-btn"
                            onClick={() => handleActionClick(action.to)}
                          >
                            <span>{action.label}</span>
                            <ServiceIcon name="chevronRight" />
                          </button>
                        ))}
                      </div>
                    )}

                    {Array.isArray(msg.followUps) && msg.followUps.length > 0 && (
                      <div className="mia-msg__followups">
                        <small className="mia-msg__followups-label">Sugestões rápidas:</small>
                        <div className="mia-msg__followups-list">
                          {msg.followUps.map((prompt) => (
                            <button
                              key={prompt}
                              type="button"
                              className="mia-msg__followup-chip"
                              onClick={() => submitPrompt(prompt)}
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ),
            )}

            {isTyping && (
              <div className="mia-msg mia-msg--mia">
                <div className="mia-msg__bubble mia-msg__bubble--typing">
                  <span className="mia-typing-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                  <small>MIA está analisando os dados urbanos...</small>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="mia-sheet__form" onSubmit={handleFormSubmit}>
            <div className="mia-input-pill">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Pergunte sobre trânsito, lugares ou acessibilidade..."
                aria-label="Digite sua pergunta para a MIA"
              />
              <button
                type="submit"
                className="mia-sheet__send"
                disabled={!inputValue.trim()}
                aria-label="Enviar pergunta para a MIA"
              >
                <ServiceIcon name="send" />
              </button>
            </div>
          </form>
        </section>
      )}

      <button
        type="button"
        className={`mia-fab ${isOpen ? 'is-active' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mia-chat-panel"
        aria-label={isOpen ? 'Fechar assistente MIA' : 'Abrir assistente MIA (Mileva IA)'}
      >
        <span className="mia-fab__icon" aria-hidden="true">
          <ServiceIcon name={isOpen ? 'close' : 'sparkles'} />
          {!isOpen && <span className="mia-fab__online-dot" />}
        </span>
        <span className="mia-fab__content">
          <span className="mia-fab__title-row">
            <strong>MIA</strong>
            <span className="mia-fab__tag">IA</span>
          </span>
          <small>{isOpen ? 'Fechar chat' : 'Ajuda urbana'}</small>
        </span>
      </button>
    </div>
  )
}
