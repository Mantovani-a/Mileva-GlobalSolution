import { useState } from 'react'
import { Link } from 'react-router-dom'
import { demoRequests, verificationStates } from '../js/demoAccessibility.js'
import VerificationStatus from '../components/VerificationStatus.jsx'
export default function DemoVerificationPanel() {
  const [requests, setRequests] = useState(demoRequests)
  function change(id, status) {
    setRequests((current) => current.map((item) => (item.id === id ? { ...item, status } : item)))
  }
  return (
    <section className="module-page">
      <Link className="module-back" to="/app/rotas/acessibilidade">
        ← Voltar à consulta
      </Link>
      <h1>Simulação da análise de cadastros</h1>
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
            <ul>
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
                <button type="button" key={status} onClick={() => change(item.id, status)}>
                  {label}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
      <details className="favorite-group">
        <summary>Entenda os estados do pedido</summary>
        {Object.keys(verificationStates).map((status) => (
          <VerificationStatus key={status} status={status} />
        ))}
      </details>
    </section>
  )
}
