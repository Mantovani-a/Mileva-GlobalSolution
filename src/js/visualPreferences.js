const THEME_KEY = 'mileva-theme'

export function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    /* A interface continua funcional sem armazenamento. */
  }
  window.dispatchEvent(new Event('mileva:theme'))
}

export function syncThemeFromStorage() {
  document.documentElement.dataset.theme = getSavedTheme()
}
