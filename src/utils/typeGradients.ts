import type { PokemonTypeName } from '@/helpers/types'

type TypeGradients = Record<PokemonTypeName, string>

export const TYPE_GRADIENTS_LIGHT: TypeGradients = {
  fire:     'linear-gradient(180deg, #ff6b42 0%, #B22A00 100%)',
  grass:    'linear-gradient(180deg, #78D850 0%, #1B5E20 100%)',
  water:    'linear-gradient(180deg, #7b88da 0%, #1a56d8 100%)',
  electric: 'linear-gradient(180deg, #FFD740 0%, #7A5800 100%)',
  ice:      'linear-gradient(180deg, #80DEEA 0%, #004D5C 100%)',
  fighting: 'linear-gradient(180deg, #e59f66 0%, #901e1e 100%)',
  poison:   'linear-gradient(180deg, #CE93D8 0%, #4A0072 100%)',
  ground:   'linear-gradient(180deg, #FFCC80 0%, #6D3B00 100%)',
  flying:   'linear-gradient(180deg, #90CAF9 0%, #1A237E 100%)',
  psychic:  'linear-gradient(180deg, #de6a6a 0%, #7B0038 100%)',
  bug:      'linear-gradient(180deg, #C6E35A 0%, #2E5A00 100%)',
  rock:     'linear-gradient(180deg, #D4A84B 0%, #4E3300 100%)',
  ghost:    'linear-gradient(180deg, #9575CD 0%, #1A0038 100%)',
  dragon:   'linear-gradient(180deg, #5C8EE6 0%, #08006B 100%)',
  dark:     'linear-gradient(180deg, #8D6E63 0%, #1C0A00 100%)',
  steel:    'linear-gradient(180deg, #90A4AE 0%, #1C2B35 100%)',
  fairy:    'linear-gradient(180deg, #F48FB1 0%, #7B003A 100%)',
  normal:   'linear-gradient(180deg, #BCAAA4 0%, #2C1A16 100%)',
}

export const TYPE_GRADIENTS_DARK: TypeGradients = {
  fire:     'linear-gradient(180deg, #581f10 0%, #0D0000 100%)',
  grass:    'linear-gradient(180deg, #1c321d 0%, #050D05 100%)',
  water:    'linear-gradient(180deg, #0E3A72 0%, #020510 100%)',
  electric: 'linear-gradient(180deg, #38321d 0%, #100C00 100%)',
  ice:      'linear-gradient(180deg, #0A4D55 0%, #020A0C 100%)',
  fighting: 'linear-gradient(180deg, #6E1818 0%, #0D0000 100%)',
  poison:   'linear-gradient(180deg, #412353 0%, #080010 100%)',
  ground:   'linear-gradient(180deg, #6B3800 0%, #0F0500 100%)',
  flying:   'linear-gradient(180deg, #182058 0%, #020308 100%)',
  psychic:  'linear-gradient(180deg, #620C32 0%, #0D0008 100%)',
  bug:      'linear-gradient(180deg, #30501A 0%, #050800 100%)',
  rock:     'linear-gradient(180deg, #46312A 0%, #0A0500 100%)',
  ghost:    'linear-gradient(180deg, #281660 0%, #060010 100%)',
  dragon:   'linear-gradient(180deg, #0F154A 0%, #020308 100%)',
  dark:     'linear-gradient(180deg, #251715 0%, #050202 100%)',
  steel:    'linear-gradient(180deg, #212C30 0%, #030507 100%)',
  fairy:    'linear-gradient(180deg, #41132c 0%, #0A0008 100%)',
  normal:   'linear-gradient(180deg, #4c4c4c 0%, #060302 100%)',
}

export function getTypeGradients(isDark: boolean): TypeGradients {
  return isDark ? TYPE_GRADIENTS_DARK : TYPE_GRADIENTS_LIGHT
}
