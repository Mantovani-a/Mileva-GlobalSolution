import { useEffect, useState } from 'react'

const STORAGE_KEY = 'mileva-demo-favorites'

function readFavorites() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed)
      ? parsed.filter((item) => item && typeof item.type === 'string' && typeof item.id === 'string')
      : []
  } catch {
    return []
  }
}

function writeFavorites(items) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    window.dispatchEvent(new Event('mileva:favorites'))
  } catch {
    // Ignora falhas de armazenamento em modo privado.
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

  function isFavorite(type, id) {
    return favorites.some((item) => item.type === type && item.id === id)
  }

  function toggle(type, id) {
    const current = readFavorites()
    const exists = current.some((item) => item.type === type && item.id === id)
    const next = exists
      ? current.filter((item) => !(item.type === type && item.id === id))
      : [...current, { type, id }]
    writeFavorites(next)
    setFavorites(next)
  }

  return { favorites, isFavorite, toggle }
}

