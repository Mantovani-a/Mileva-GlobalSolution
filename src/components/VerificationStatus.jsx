import { verificationStates } from '../data/accessibilityData.js'

export default function VerificationStatus({ status }) {
  const state = verificationStates[status] || [
    'Sem informação',
    'Não há dados suficientes para avaliar o percurso.',
  ]
  return (
    <div className="verification-status">
      <strong>
        {state[0]}
        {status === 'approved' ? ' · demonstração verificada' : ''}
      </strong>
      <p>{state[1]}</p>
    </div>
  )
}
