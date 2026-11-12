const THEME_STORAGE_KEY = 'mileva-theme'

export function getStoredTheme() {
  if (typeof window === 'undefined') return 'light'
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return 'light'
  const normalized = theme === 'dark' ? 'dark' : 'light'
  document.documentElement.dataset.theme = normalized
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, normalized)
    window.dispatchEvent(new Event('mileva:theme'))
  } catch {
    // Ignora falhas de armazenamento local.
  }
  return normalized
}

export function syncThemeFromStorage() {
  return applyTheme(getStoredTheme())
}

