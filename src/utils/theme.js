const THEME_STORAGE_KEY = 'mileva-theme'

export function getStoredTheme() {
  if (typeof window === 'undefined') return 'light'
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function applyTheme(theme, { persist = true, notify = true } = {}) {
  if (typeof document === 'undefined') return 'light'
  const normalized = theme === 'dark' ? 'dark' : 'light'
  const changed = document.documentElement.dataset.theme !== normalized
  document.documentElement.dataset.theme = normalized
  if (persist) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, normalized)
    } catch {
      // A interface continua funcional quando o armazenamento está indisponível.
    }
  }
  if (changed && notify) window.dispatchEvent(new CustomEvent('mileva:theme', { detail: normalized }))
  return normalized
}

export function syncThemeFromStorage() {
  return applyTheme(getStoredTheme(), { persist: false, notify: false })
}

