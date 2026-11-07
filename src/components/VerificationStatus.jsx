import { verificationStates } from '../js/demoAccessibility.js'
export default function VerificationStatus({ status }) {
  const state = verificationStates[status] || [
    'Sem informação',
    'Não há dados suficientes para avaliar o percurso.',
  ]
  return (
    <div className="verification-status">
      <strong>
        {status === 'approved' ? '✓ ' : ''}
        {state[0]}
        {status === 'approved' ? ' · demonstração' : ''}
      </strong>
      <p>{state[1]}</p>
    </div>
  )
}
