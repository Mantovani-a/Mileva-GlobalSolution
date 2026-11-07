import { useEffect, useState } from 'react'

const KEY = 'mileva-demo-favorites'
let memoryFavorites = []

function readFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(saved)
      ? saved.filter((item) => item && typeof item.id === 'string' && typeof item.type === 'string')
      : []
  } catch {
    return memoryFavorites
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(readFavorites)
  useEffect(() => {
    const sync = () => setFavorites(readFavorites())
    window.addEventListener('storage', sync)
    window.addEventListener('mileva:favorites', sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('mileva:favorites', sync)
    }
  }, [])

  function toggle(type, id) {
    const current = readFavorites()
    const exists = current.some((item) => item.type === type && item.id === id)
    const next = exists
      ? current.filter((item) => item.type !== type || item.id !== id)
      : [...current, { type, id }]
    memoryFavorites = next
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      /* Funciona sem persistência quando o armazenamento está bloqueado. */
    }
    setFavorites(next)
    window.dispatchEvent(new Event('mileva:favorites'))
  }

  return {
    favorites,
    isFavorite: (type, id) => favorites.some((item) => item.type === type && item.id === id),
    toggle,
  }
}
