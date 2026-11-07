import ServiceIcon from './ServiceIcon.jsx'
export default function ModuleTitle({ icon, title, subtitle }) {
  return (
    <header className="compact-title">
      <span className="service-shortcut__icon">
        <ServiceIcon name={icon} />
      </span>
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </header>
  )
}
