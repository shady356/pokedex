import type { PokemonTypeName } from '@/helpers/types'

type TypeGradients = Record<PokemonTypeName, string>

export const TYPE_GRADIENTS_LIGHT: TypeGradients = {
  fire:     'linear-gradient(180deg, #75451d 0%, #700f00 100%)',
  grass:    'linear-gradient(180deg, #b9e7a9 0%, #7faf73 100%)',
  water:    'linear-gradient(180deg, #a3dbca 0%, #000d27 100%)',
  electric: 'linear-gradient(180deg, #ffe660 0%, #1e1400 100%)',
  ice:      'linear-gradient(180deg, #a0e8ff 0%, #051e2d 100%)',
  fighting: 'linear-gradient(180deg, #ff8060 0%, #280505 100%)',
  poison:   'linear-gradient(180deg, #d060ff 0%, #1e0528 100%)',
  ground:   'linear-gradient(180deg, #f0b45a 0%, #3c1e05 100%)',
  flying:   'linear-gradient(180deg, #c8d8ff 0%, #0f0f32 100%)',
  psychic:  'linear-gradient(180deg, #ff90c0 0%, #280514 100%)',
  bug:      'linear-gradient(180deg, #b4f028 0%, #141900 100%)',
  rock:     'linear-gradient(180deg, #e0c878 0%, #281e05 100%)',
  ghost:    'linear-gradient(180deg, #9078ff 0%, #0f0528 100%)',
  dragon:   'linear-gradient(180deg, #6090ff 0%, #050528 100%)',
  dark:     'linear-gradient(180deg, #9080a0 0%, #0c0808 100%)',
  steel:    'linear-gradient(180deg, #b4c8e0 0%, #141622 100%)',
  fairy:    'linear-gradient(180deg, #ffaaee 0%, #280514 100%)',
  normal:   'linear-gradient(180deg, #c8c8b4 0%, #1e1c10 100%)',
}

export const TYPE_GRADIENTS_DARK: TypeGradients = {
  fire:     'linear-gradient(180deg, #963e3e 0%, #180300 100%)',
  grass:    'linear-gradient(180deg, #848d63 0%, #050f03 100%)',
  water:    'linear-gradient(180deg, #97bba0 0%, #050f30 100%)',
  electric: 'linear-gradient(180deg, #222222 0%, #000000 100%)',
  ice:      'linear-gradient(180deg, #507888 0%, #030f18 100%)',
  fighting: 'linear-gradient(180deg, #803020 0%, #140303 100%)',
  poison:   'linear-gradient(180deg, #581783 0%, #0f0314 100%)',
  ground:   'linear-gradient(180deg, #785820 0%, #1e0f03 100%)',
  flying:   'linear-gradient(180deg, #506898 0%, #080818 100%)',
  psychic:  'linear-gradient(180deg, #803060 0%, #14030a 100%)',
  bug:      'linear-gradient(180deg, #507810 0%, #0a0f00 100%)',
  rock:     'linear-gradient(180deg, #706030 0%, #140f03 100%)',
  ghost:    'linear-gradient(180deg, #483890 0%, #080314 100%)',
  dragon:   'linear-gradient(180deg, #304880 0%, #030314 100%)',
  dark:     'linear-gradient(180deg, #484050 0%, #060404 100%)',
  steel:    'linear-gradient(180deg, #586878 0%, #0a0b11 100%)',
  fairy:    'linear-gradient(180deg, #804878 0%, #14030a 100%)',
  normal:   'linear-gradient(180deg, #646458 0%, #0f0e08 100%)',
}

export function getTypeGradients(isDark: boolean): TypeGradients {
  return isDark ? TYPE_GRADIENTS_DARK : TYPE_GRADIENTS_LIGHT
}
