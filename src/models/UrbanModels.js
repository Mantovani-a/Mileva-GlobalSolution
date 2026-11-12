const PIRES_DO_RIO_BOUNDS = {
  northLat: -17.289,
  southLat: -17.312,
  westLng: -48.296,
  eastLng: -48.264,
  svgWidth: 600,
  svgHeight: 400,
  centerLat: -17.3006,
  centerLng: -48.2797,
}

export class GeoCoordinate {
  constructor({ x = 300, y = 200, lat = null, lng = null } = {}) {
    this.x = Number(x)
    this.y = Number(y)
    this.lat =
      typeof lat === 'number'
        ? lat
        : Number(
            (
              PIRES_DO_RIO_BOUNDS.northLat +
              (this.y / PIRES_DO_RIO_BOUNDS.svgHeight) *
                (PIRES_DO_RIO_BOUNDS.southLat - PIRES_DO_RIO_BOUNDS.northLat)
            ).toFixed(6),
          )
    this.lng =
      typeof lng === 'number'
        ? lng
        : Number(
            (
              PIRES_DO_RIO_BOUNDS.westLng +
              (this.x / PIRES_DO_RIO_BOUNDS.svgWidth) *
                (PIRES_DO_RIO_BOUNDS.eastLng - PIRES_DO_RIO_BOUNDS.westLng)
            ).toFixed(6),
          )
  }

  toSvgTuple() {
    return [this.x, this.y]
  }

  toLatLngTuple() {
    return [this.lat, this.lng]
  }

  static fromTuple(tuple) {
    if (tuple instanceof GeoCoordinate) return tuple
    if (Array.isArray(tuple)) {
      const [first, second] = tuple
      if (Math.abs(first) <= 90 && Math.abs(second) <= 180 && first < 0) {
        const y = Math.round(
          ((first - PIRES_DO_RIO_BOUNDS.northLat) /
            (PIRES_DO_RIO_BOUNDS.southLat - PIRES_DO_RIO_BOUNDS.northLat)) *
            PIRES_DO_RIO_BOUNDS.svgHeight,
        )
        const x = Math.round(
          ((second - PIRES_DO_RIO_BOUNDS.westLng) /
            (PIRES_DO_RIO_BOUNDS.eastLng - PIRES_DO_RIO_BOUNDS.westLng)) *
            PIRES_DO_RIO_BOUNDS.svgWidth,
        )
        return new GeoCoordinate({ x, y, lat: first, lng: second })
      }
      return new GeoCoordinate({ x: first, y: second })
    }
    return new GeoCoordinate(tuple)
  }

  static getCityCenter() {
    return [PIRES_DO_RIO_BOUNDS.centerLat, PIRES_DO_RIO_BOUNDS.centerLng]
  }
}

export class MapStop {
  constructor({ id, name, x, y, detail = '', verified = false }) {
    this.id = String(id)
    this.name = String(name)
    this.detail = String(detail)
    this.verified = Boolean(verified)
    this.coordinate = new GeoCoordinate({ x, y })
    this.x = this.coordinate.x
    this.y = this.coordinate.y
  }

  toLatLngTuple() {
    return this.coordinate.toLatLngTuple()
  }
}

export class UrbanServiceEntity {
  constructor({
    id,
    type,
    name,
    color = '#087f72',
    points = [],
    stops = [],
    status = 'approved',
  }) {
    this.id = String(id)
    this.type = String(type)
    this.name = String(name)
    this.color = String(color)
    this.status = String(status)
    this.coordinates = points.map((point) => GeoCoordinate.fromTuple(point))
    this.points = this.coordinates.map((coord) => coord.toSvgTuple())
    this.stops = stops.map((stop) => (stop instanceof MapStop ? stop : new MapStop(stop)))
  }

  getLatLngPath() {
    return this.coordinates.map((coord) => coord.toLatLngTuple())
  }
}

export class TransitLine extends UrbanServiceEntity {
  constructor({
    id,
    name,
    origin,
    destination,
    departure,
    period,
    duration,
    fare,
    accessibility = 'Não informada',
    color = '#087f72',
    points = [],
    stops = [],
  }) {
    super({ id, type: 'transit', name, color, points, stops })
    this.origin = String(origin)
    this.destination = String(destination)
    this.departure = String(departure)
    this.period = String(period)
    this.duration = String(duration)
    this.fare = String(fare)
    this.accessibility = String(accessibility)
  }

  getRouteSummary() {
    return `${this.origin} → ${this.destination}`
  }

  toCatalogEntry() {
    return {
      type: 'transit',
      id: this.id,
      category: 'Linhas de ônibus',
      label: `${this.name} · ${this.origin} → ${this.destination}`,
      href: `/app/rotas/transporte/${this.id}`,
    }
  }
}

export class RideOffer extends UrbanServiceEntity {
  constructor({
    id,
    driver,
    origin,
    destination,
    days = [],
    time,
    period,
    seats = 1,
    color = '#087f72',
    points = [],
    stops = [],
  }) {
    super({ id, type: 'ride', name: driver, color, points, stops })
    this.driver = String(driver)
    this.origin = String(origin)
    this.destination = String(destination)
    this.days = Array.isArray(days) ? [...days] : []
    this.time = String(time)
    this.period = String(period)
    this.seats = Number(seats)
  }

  getDriverDisplayName() {
    return this.driver.split(' (')[0]
  }

  matchesDay(day) {
    return !day || day === 'todos' || this.days.includes(day)
  }

  matchesMinTime(minTime) {
    return !minTime || this.time >= minTime
  }

  toCatalogEntry() {
    return {
      type: 'ride',
      id: this.id,
      category: 'Caronas recorrentes',
      label: `${this.driver} · ${this.origin} → ${this.destination}`,
      href: `/app/rotas/caronas?oferta=${this.id}`,
    }
  }
}

export class CollectionRegion extends UrbanServiceEntity {
  constructor({
    id,
    name,
    days,
    window,
    color = '#087f72',
    area = [],
    points = [],
    stops = [],
  }) {
    super({ id, type: 'collection', name, color, points, stops })
    this.days = String(days)
    this.window = String(window)
    this.areaCoordinates = area.map((point) => GeoCoordinate.fromTuple(point))
    this.area = this.areaCoordinates.map((coord) => coord.toSvgTuple())
    this.origin = this.name
    this.destination = 'Percurso de coleta ilustrativo'
  }

  getAreaLatLngPolygon() {
    return this.areaCoordinates.map((coord) => coord.toLatLngTuple())
  }

  toMapRouteEntity() {
    return this
  }

  toCatalogEntry() {
    return {
      type: 'collection',
      id: this.id,
      category: 'Regiões de coleta',
      label: this.name,
      href: `/app/rotas/coleta?regiao=${this.id}`,
    }
  }
}

export class AccessibleRecord extends UrbanServiceEntity {
  constructor({
    id,
    kind,
    name,
    category,
    region,
    status = 'approved',
    features = [],
    resources = [],
    x,
    y,
    points,
    limitation,
    reviewDate,
    color,
  }) {
    const resolvedPoints =
      points ||
      (typeof x === 'number' && typeof y === 'number'
        ? [
            [x, y],
            [x + 1, y + 1],
          ]
        : [])
    const resolvedColor = color || (status === 'approved' ? '#087f72' : '#8054a3')
    const stops = (kind === 'place' ? resolvedPoints.slice(0, 1) : resolvedPoints).map(
      ([px, py], index) => ({
        id: `${id}-${index}`,
        verified: status === 'approved',
        name:
          kind === 'place'
            ? `${name} · ${status === 'approved' ? 'verificação simulada' : 'sem informação'}`
            : `Ponto ${index + 1}`,
        x: px,
        y: py,
        detail: resources.join(', '),
      }),
    )

    super({
      id,
      type: 'accessibility',
      name,
      color: resolvedColor,
      points: resolvedPoints,
      stops,
      status,
    })

    this.kind = String(kind)
    this.category = String(category)
    this.region = String(region)
    this.features = Array.isArray(features) ? [...features] : []
    this.resources = Array.isArray(resources) ? [...resources] : []
    if (typeof x === 'number') this.x = x
    if (typeof y === 'number') this.y = y
    this.reviewDate =
      reviewDate !== undefined
        ? reviewDate
        : status === 'approved'
          ? '01/10/2026 (fictícia)'
          : null
    this.limitation =
      limitation || 'Recursos descritos individualmente, sem garantia de acessibilidade universal.'
  }

  hasResourceTerm(term) {
    const lower = String(term).toLowerCase()
    return this.resources.some((resource) => resource.toLowerCase().includes(lower))
  }

  matchesFilter({ kind, category, status, features = [] }) {
    return (
      (!kind || this.kind === kind) &&
      (!category || this.category === category) &&
      (!status || this.status === status) &&
      features.every((feature) => this.features.includes(feature))
    )
  }

  toMapProjection() {
    return this
  }

  toCatalogEntry() {
    return {
      type: 'accessibility',
      id: this.id,
      category: this.kind === 'place' ? 'Locais acessíveis' : 'Rotas de acessibilidade',
      label: this.name,
      href: `/app/rotas/acessibilidade/${this.id}`,
    }
  }
}
