import { Link } from 'react-router-dom'

export default function ActionLink({ to, variant = 'primary', children, className = '' }) {
  return (
    <Link className={`action-link action-link--${variant} ${className}`.trim()} to={to}>
      {children}
    </Link>
  )
}
