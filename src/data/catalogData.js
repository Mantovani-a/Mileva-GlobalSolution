import { transitLines } from './transitData.js'
import { rideOffers } from './ridesData.js'
import { collectionRegions } from './collectionData.js'
import { accessibleRecords } from './accessibilityData.js'

const allEntities = [
  ...transitLines,
  ...rideOffers,
  ...collectionRegions,
  ...accessibleRecords,
]

export const demoCatalog = allEntities.map((entity) => entity.toCatalogEntry())

export function findCatalogEntry(type, id) {
  return demoCatalog.find((entry) => entry.type === type && entry.id === id) || null
}

export function resolveSavedFavorites(favoritesList = []) {
  const savedItems = demoCatalog.filter((record) =>
    favoritesList.some((saved) => saved.type === record.type && saved.id === record.id),
  )
  const categories = [...new Set(savedItems.map((record) => record.category))]
  const missingItems = favoritesList.filter(
    (saved) => !demoCatalog.some((record) => record.type === saved.type && record.id === saved.id),
  )
  return { savedItems, categories, missingItems }
}
