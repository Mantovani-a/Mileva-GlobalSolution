import { useState } from 'react'
import { Link } from 'react-router-dom'
import VerificationStatus from '../components/VerificationStatus.jsx'
import ModuleTitle from '../components/ModuleTitle.jsx'
import { initialDemoRequests, verificationStates } from '../data/accessibilityData.js'

export default function DemoVerificationPanel() {
  const [requests, setRequests] = useState(() => initialDemoRequests.map((req) => ({ ...req })))

  function change(id, status) {
    setRequests((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    )
  }

  return (
    <section className="compact-screen verification-screen">
      <div className="search-sheet detail-header-card">
        <ModuleTitle
          icon="clipboard"
          title="Análise de Cadastros"
          subtitle="Simulação temporária · sem publicação real"
        />
        <div className="detail-header-card__actions">
          <Link className="module-back-pill" to="/app/rotas/acessibilidade">
            ← Voltar à consulta
          </Link>
        </div>
      </div>
      <div className="verification-screen__body">
        <p className="demo-notice">
          Área demonstrativa, sem autenticação administrativa. Alterações temporárias não publicam
          locais na consulta.
        </p>
        <div className="result-list">
          {requests.map((item) => (
            <article className="detail-panel" key={item.id}>
              <h2>{item.name}</h2>
              <p>
                {item.id} · {item.category}
              </p>
              <p>Responsável fictício: {item.responsible}</p>
              <ul className="material-list">
                {item.resources.map((resource) => (
                  <li key={resource}>{resource}</li>
                ))}
              </ul>
              <p>Evidências: {item.evidence}</p>
              <VerificationStatus status={item.status} />
              <div className="result-row__actions">
                {[
                  ['reviewing', 'Iniciar análise'],
                  ['approved', 'Aprovar'],
                  ['correction', 'Solicitar correção'],
                  ['rejected', 'Rejeitar'],
                ].map(([status, label]) => (
                  <button
                    type="button"
                    key={status}
                    aria-pressed={item.status === status}
                    onClick={() => change(item.id, status)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
        <details className="access-filter-disclosure">
          <summary>Entenda os estados do pedido</summary>
          <div className="detail-panel">
            {Object.keys(verificationStates).map((status) => (
              <VerificationStatus key={status} status={status} />
            ))}
          </div>
        </details>
      </div>
    </section>
  )
}
