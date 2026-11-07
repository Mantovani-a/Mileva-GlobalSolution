import { Link } from 'react-router-dom'
import ServiceIcon from './ServiceIcon.jsx'

export default function ServiceShortcut({ service }) {
  return (
    <Link className="service-shortcut" to={service.href} aria-label={`Abrir ${service.title}`}>
      <span className="service-shortcut__icon">
        <ServiceIcon name={service.icon} />
      </span>
      <strong>{service.title}</strong>
      <span className="service-shortcut__arrow" aria-hidden="true">
        ›
      </span>
    </Link>
  )
}
