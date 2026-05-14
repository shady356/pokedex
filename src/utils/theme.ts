export type ThemeOption = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme-preference'

export function getTheme(): ThemeOption {
  return (localStorage.getItem(STORAGE_KEY) as ThemeOption) || 'system'
}

export function setTheme(theme: ThemeOption): void {
  localStorage.setItem(STORAGE_KEY, theme)
  applyTheme(theme)
}

const THEME_COLORS: Record<'light' | 'dark', string> = {
  light: '#f5f5f5',
  dark: '#1a1a1a',
}

function resolvedIsDark(theme: ThemeOption): boolean {
  if (theme === 'dark') return true
  if (theme === 'light') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function applyTheme(theme: ThemeOption): void {
  document.documentElement.classList.remove('theme-light', 'theme-dark')
  if (theme === 'light') document.documentElement.classList.add('theme-light')
  if (theme === 'dark') document.documentElement.classList.add('theme-dark')

  const color = resolvedIsDark(theme) ? THEME_COLORS.dark : THEME_COLORS.light
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color)
}
