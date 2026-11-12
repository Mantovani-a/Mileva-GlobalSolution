import HomeSearch from '../components/HomeSearch.jsx'
import NextBusPreview from '../components/NextBusPreview.jsx'
import ServiceShortcut from '../components/ServiceShortcut.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'
import { homeServices } from '../data/homeData.js'

export default function AppHomePage() {
  return (
    <div className="app-home">
      <section className="app-home__hero" aria-labelledby="app-home-title">
        <div className="app-home__hero-inner">
          <div>
            <h1 id="app-home-title">Olá, João Carlos!</h1>
            <p>Planeje seus deslocamentos e rotinas pela cidade.</p>
            <p className="app-home__location">
              <ServiceIcon name="pin" /> Pires do Rio – GO
            </p>
          </div>
          <HomeSearch />
        </div>
      </section>
      <div className="app-home__content">
        <section className="app-home__services" aria-label="Serviços do Mileva">
          <div className="service-grid">
            {homeServices.map((service) => (
              <ServiceShortcut key={service.id} service={service} />
            ))}
          </div>
        </section>
        <NextBusPreview />
      </div>
    </div>
  )
}
