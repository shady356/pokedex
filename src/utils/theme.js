const STORAGE_KEY = 'theme-preference'

export function getTheme() {
  return localStorage.getItem(STORAGE_KEY) || 'system'
}

export function setTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme)
  applyTheme(theme)
}

export function applyTheme(theme) {
  document.documentElement.classList.remove('theme-light', 'theme-dark')
  if (theme === 'light') document.documentElement.classList.add('theme-light')
  if (theme === 'dark') document.documentElement.classList.add('theme-dark')
}
