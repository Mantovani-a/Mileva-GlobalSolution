import ServiceIcon from './ServiceIcon.jsx'
import { nextBusDemo } from '../js/homeDemoData.js'

export default function NextBusPreview() {
  return (
    <section className="next-bus" aria-labelledby="next-bus-title">
      <div className="next-bus__top">
        <span className="next-bus__icon">
          <ServiceIcon name="bus" />
        </span>
        <div>
          <h2 id="next-bus-title">Próximo ônibus</h2>
          <p>{nextBusDemo.line}</p>
        </div>
        <strong className="next-bus__time">{nextBusDemo.estimatedArrival}</strong>
      </div>
      <p className="next-bus__route">{nextBusDemo.route}</p>
      <progress
        className="next-bus__track"
        value={nextBusDemo.progress}
        max="100"
        aria-label="Progresso ilustrativo do trajeto"
      />
      <p className="next-bus__disclaimer">ⓘ Previsão simulada · sem dados ao vivo</p>
    </section>
  )
}
