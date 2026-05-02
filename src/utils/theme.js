const STORAGE_KEY = 'theme-preference'

export function getTheme() {
  return localStorage.getItem(STORAGE_KEY) || 'system'
}

export function setTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme)
  applyTheme(theme)
}

const THEME_COLORS = {
  light: '#f5f5f5',
  dark: '#1a1a1a',
}

function resolvedIsDark(theme) {
  if (theme === 'dark') return true
  if (theme === 'light') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function applyTheme(theme) {
  document.documentElement.classList.remove('theme-light', 'theme-dark')
  if (theme === 'light') document.documentElement.classList.add('theme-light')
  if (theme === 'dark') document.documentElement.classList.add('theme-dark')

  const color = resolvedIsDark(theme) ? THEME_COLORS.dark : THEME_COLORS.light
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color)
}
