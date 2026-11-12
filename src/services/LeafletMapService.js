import L from 'leaflet'
import { GeoCoordinate } from '../models/UrbanModels.js'

export class LeafletMapService {
  constructor(containerElement) {
    if (!containerElement) {
      throw new Error('Elemento container é obrigatório para inicializar o mapa.')
    }
    this.defaultCenter = GeoCoordinate.getCityCenter()
    this.defaultZoom = 14
    this.minZoom = 12
    this.maxZoom = 18

    this.map = L.map(containerElement, {
      center: this.defaultCenter,
      zoom: this.defaultZoom,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      zoomControl: false,
      attributionControl: true,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap · Pires do Rio, GO',
      maxZoom: this.maxZoom,
    }).addTo(this.map)

    this.areaLayer = L.layerGroup().addTo(this.map)
    this.routesLayer = L.layerGroup().addTo(this.map)
    this.stopsLayer = L.layerGroup().addTo(this.map)

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.map) {
          this.map.invalidateSize({ animate: false })
        }
      })
      this.resizeObserver.observe(containerElement)
    }
  }

  getZoomLevel() {
    return this.map ? this.map.getZoom() : this.defaultZoom
  }

  getMinZoom() {
    return this.minZoom
  }

  getMaxZoom() {
    return this.maxZoom
  }

  zoomIn() {
    if (!this.map) return this.defaultZoom
    this.map.zoomIn(1)
    return this.map.getZoom()
  }

  zoomOut() {
    if (!this.map) return this.defaultZoom
    this.map.zoomOut(1)
    return this.map.getZoom()
  }

  resetView(boundsPoints = []) {
    if (!this.map) return this.defaultZoom
    if (boundsPoints.length >= 2) {
      const bounds = L.latLngBounds(boundsPoints)
      if (bounds.isValid()) {
        this.map.fitBounds(bounds, { padding: [32, 32], maxZoom: 15 })
        return this.map.getZoom()
      }
    }
    this.map.setView(this.defaultCenter, this.defaultZoom)
    return this.map.getZoom()
  }

  renderLayers({
    routes = [],
    selectedRouteId = null,
    onSelectRoute = null,
    area = null,
    serviceType = 'transit',
    stops = [],
    selectedStopId = null,
    onSelectStop = null,
    showRoute = true,
    showArea = true,
    showStops = true,
    autoFit = false,
  }) {
    if (!this.map) return

    this.areaLayer.clearLayers()
    this.routesLayer.clearLayers()
    this.stopsLayer.clearLayers()

    const boundsCoordinates = []

    if (showArea && area?.points?.length) {
      const latLngs = area.points.map((point) => GeoCoordinate.fromTuple(point).toLatLngTuple())
      boundsCoordinates.push(...latLngs)
      const areaColor = area.color || '#087f72'
      L.polygon(latLngs, {
        color: areaColor,
        weight: 2.5,
        fillColor: areaColor,
        fillOpacity: 0.18,
        dashArray: '8 6',
      }).addTo(this.areaLayer)
    }

    if (showRoute && routes.length > 0) {
      for (const route of routes) {
        const latLngs =
          typeof route.getLatLngPath === 'function'
            ? route.getLatLngPath()
            : (route.points || []).map((point) => GeoCoordinate.fromTuple(point).toLatLngTuple())

        if (!latLngs.length) continue
        const isSelected = route.id === selectedRouteId
        if (isSelected || routes.length === 1) {
          boundsCoordinates.push(...latLngs)
        }

        if (isSelected) {
          L.polyline(latLngs, {
            color: '#ffffff',
            weight: 10,
            opacity: 0.75,
            lineCap: 'round',
            lineJoin: 'round',
            interactive: false,
          }).addTo(this.routesLayer)
        }

        const polyline = L.polyline(latLngs, {
          color: route.color || '#087f72',
          weight: isSelected ? 6 : 4,
          opacity: isSelected ? 1 : 0.55,
          dashArray:
            serviceType === 'collection' || route.status === 'unknown' ? '12 7' : undefined,
          lineCap: 'round',
          lineJoin: 'round',
        })

        if (typeof onSelectRoute === 'function') {
          polyline.on('click', () => onSelectRoute(route.id))
        }

        polyline.addTo(this.routesLayer)
      }
    }

    let selectedStopLatLng = null

    if (showStops && stops.length > 0) {
      stops.forEach((stop, index) => {
        const latLng =
          typeof stop.toLatLngTuple === 'function'
            ? stop.toLatLngTuple()
            : GeoCoordinate.fromTuple([stop.x, stop.y]).toLatLngTuple()

        boundsCoordinates.push(latLng)
        const isSelected = selectedStopId === stop.id
        if (isSelected) {
          selectedStopLatLng = latLng
        }
        const isOrigin = index === 0
        const verifiedBadge = stop.verified
          ? '<span class="mileva-marker__verified" aria-hidden="true"></span>'
          : ''

        const icon = L.divIcon({
          className: `mileva-leaflet-marker${isSelected ? ' is-selected' : ''}${isOrigin ? ' is-origin' : ''}`,
          html: `<div class="mileva-marker__pin"><span>${index + 1}</span>${verifiedBadge}</div>`,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        })

        const marker = L.marker(latLng, {
          icon,
          title: `Ponto ${index + 1}: ${stop.name}`,
          alt: `Ponto ${index + 1}: ${stop.name}`,
          keyboard: true,
        })

        if (typeof onSelectStop === 'function') {
          marker.on('click', () => onSelectStop(stop.id))
        }

        marker.addTo(this.stopsLayer)
      })
    }

    if (selectedStopLatLng && !autoFit) {
      this.map.panTo(selectedStopLatLng, { animate: true })
    } else if (autoFit && boundsCoordinates.length >= 1) {
      if (boundsCoordinates.length === 1) {
        this.map.setView(boundsCoordinates[0], 15)
      } else {
        const bounds = L.latLngBounds(boundsCoordinates)
        if (bounds.isValid()) {
          this.map.fitBounds(bounds, { padding: [32, 32], maxZoom: 15 })
        }
      }
    }
  }

  destroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
    if (this.map) {
      this.map.remove()
      this.map = null
    }
  }
}

