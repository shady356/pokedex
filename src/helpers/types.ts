export type PokemonTypeName =
  | 'bug' | 'dark' | 'dragon' | 'electric' | 'fairy' | 'fighting'
  | 'fire' | 'flying' | 'ghost' | 'grass' | 'ground' | 'ice'
  | 'normal' | 'poison' | 'psychic' | 'rock' | 'steel' | 'water'

export interface TypeInfo {
  name: string
  description: string
  resistantTo?: PokemonTypeName[]
  notVeryEffectiveTo?: PokemonTypeName[]
  superEffectiveTo?: PokemonTypeName[]
  vulnerableTo?: PokemonTypeName[]
}

export interface TypeEntry {
  name: PokemonTypeName
  color: string
}

export const $getTypeInfoByName = (typeName: PokemonTypeName): TypeInfo | undefined => {
  const bug: TypeInfo = {
    name: 'bug',
    description: 'Bug types are usually encountered early in your Pokémon journey. Due to overall poor move options, this type is seen as a weak choice to have in a party. Although, you can always surprise your opponent\'s psychic type with a super effective attack.',
    resistantTo: [],
    notVeryEffectiveTo: [
      'flying',
      'poison',
      'fighting',
      'steel',
      'fairy',
      'ghost',
    ],
    superEffectiveTo: ['grass', 'dark', 'psychic'],
    vulnerableTo: ['fire', 'flying', 'rock'],
  }
  const dark: TypeInfo = {
    name: 'dark',
    description: 'The dark type was added to nerf the over-powered psychic pokémon prior to generation II.',
    resistantTo: ['psychic'],
    superEffectiveTo: ['psychic', 'ghost'],
    notVeryEffectiveTo: ['fighting', 'fairy'],
    vulnerableTo: ['fighting', 'bug', 'fairy'],
  }
  const dragon: TypeInfo = {
    name: 'dragon',
    description: 'Dragon type is among the strongest in the game. Usually you\'ll encounter semi-legendary and legendary Pokémon equipped with this type. With great bulk and outrageous attacks, this type is almost a prerequisite to conquer competitive trainers.',
    resistantTo: ['fire', 'water', 'electric', 'grass'],
    notVeryEffectiveTo: ['steel'],
    superEffectiveTo: ['dragon'],
    vulnerableTo: ['ice', 'dragon', 'fairy'],
  }
  const electric: TypeInfo = {
    name: 'electric',
    description: 'With only one vulnerability in disfavor of Ground types, Electric Pokémon provide stability to your party. They are lacking good tanks, but put speed and attack on the table, which makes them capable of sweeping aside tanky Water and Flying types.',
    superEffectiveTo: ['water', 'flying'],
    vulnerableTo: ['ground'],
  }
  const fairy: TypeInfo = {
    name: 'fairy',
    description: 'As a consequence of the over-powered Dragon types and bulky Steel types, Fairy was added as a type to balance the game in the sixth generation. Many former Normal types have been changed into Fairy type to make them even stronger.',
    superEffectiveTo: ['dragon', 'fighting', 'dark'],
    vulnerableTo: ['poison', 'steel'],
  }
  const fighting: TypeInfo = {
    name: 'fighting',
    description: 'The only type to properly deal with Normal types. Fighting types offer an array of super effective attacks to various types. A recommended choice to have in your party and it also puts an end to the bulky steel types.',
    superEffectiveTo: ['normal', 'ice', 'rock', 'dark', 'steel'],
    vulnerableTo: ['flying', 'psychic', 'fairy'],
  }
  const fire: TypeInfo = {
    name: 'fire',
    description:
      'Fire is one of the three basic elemental types along with Water and Grass, which constitute the three starter Pokémon. This creates a simple triangle to explain the type concept easily to new players.',
    superEffectiveTo: ['grass', 'bug', 'steel', 'ice'],
    vulnerableTo: ['water', 'ground', 'rock'],
  }
  const flying: TypeInfo = {
    name: 'flying',
    description: 'A popular choice to have in your party, Flying types are almost always paired with another type, giving them great versatility. They are immune to Ground attacks and dominate Bug, Grass, and Fighting types, though they remain vulnerable to Electric, Ice, and Rock moves.',
    superEffectiveTo: ['grass', 'bug', 'fighting'],
    vulnerableTo: ['electric', 'ice', 'rock'],
  }
  const ghost: TypeInfo = {
    name: 'ghost',
    description: 'This mysterious type completes the triangle with Dark and Psychic types.',
    superEffectiveTo: ['psychic', 'ghost'],
    vulnerableTo: ['dark', 'ghost'],
  }
  const grass: TypeInfo = {
    name: 'grass',
    description: 'A good starter in your journey, but will often decline as you progress due to its many vulnerabilities.',
    superEffectiveTo: ['water', 'ground', 'rock'],
    vulnerableTo: ['fire', 'ice', 'flying', 'poison', 'bug'],
  }
  const ground: TypeInfo = {
    name: 'Ground',
    description: 'With an impressively super effective encounter-rate (tied with Fighting type), it gives your party a versatile pokémon to sweep off your opponents. Ground types are great tanks too with an overall high defense stat.',
    superEffectiveTo: ['fire', 'rock', 'steel', 'electric', 'poison'],
    vulnerableTo: ['water', 'grass', 'ice'],
  }
  const ice: TypeInfo = {
    name: 'ice',
    description: 'A balanced type as it\'s super effective and vulnerable to four types respectively. It brings the powerful Dragons down, but can be risky to play due to its vulnerabilities.',
    superEffectiveTo: ['dragon', 'grass', 'ground', 'flying'],
    vulnerableTo: ['fire', 'rock', 'fighting', 'steel'],
  }
  const normal: TypeInfo = {
    name: 'normal',
    description: 'The most balanced Pokémon type. Great for beginners as it has only one vulnerability to Fighting types, but on the attacking front it deals mediocre damage to all types as it\'s lacking super effective advantage. It\'s also ineffective against Ghost types.',
    superEffectiveTo: [],
    vulnerableTo: ['fighting'],
  }
  const poison: TypeInfo = {
    name: 'poison',
    description: 'Poison types excel at wearing down opponents over time with status conditions. They synergize well with Fairy and Grass matchups, and many Poison-type moves inflict the poison status, making them a strategic choice for attrition battles.',
    superEffectiveTo: ['grass', 'fairy'],
    vulnerableTo: ['ground', 'psychic'],
  }
  const psychic: TypeInfo = {
    name: 'psychic',
    description: 'Psychic was the dominant type in Generation I, with almost no counters. Game Freak later introduced Dark and more Ghost moves to rein it in. Today it remains powerful with strong special attack stats and coverage against Fighting and Poison types, though it must watch out for its three weaknesses.',
    superEffectiveTo: ['fighting', 'poison'],
    vulnerableTo: ['dark', 'bug', 'ghost'],
  }
  const rock: TypeInfo = {
    name: 'rock',
    description: 'Often seen in combination with Ground types. Its vulnerability makes it weak in competitive play, but on the bright side it can also land some super effective hits.',
    superEffectiveTo: ['flying', 'ice', 'fire', 'bug'],
    vulnerableTo: ['water', 'grass', 'fighting', 'ground', 'steel'],
  }
  const steel: TypeInfo = {
    name: 'steel',
    description: 'Steel types are one of the best due to their strong resistance to other types.',
    superEffectiveTo: ['ice', 'rock', 'fairy'],
    vulnerableTo: ['fire', 'fighting', 'ground'],
  }
  const water: TypeInfo = {
    name: 'water',
    description: 'Water is one of the three basic elemental types alongside Fire and Grass. It is the most common type in the games and offers excellent offensive and defensive coverage. With only two vulnerabilities, Water-type Pokémon are a reliable and versatile addition to any party.',
    superEffectiveTo: ['fire', 'ground', 'rock'],
    vulnerableTo: ['grass', 'electric'],
  }
  switch (typeName) {
    case 'bug': return bug
    case 'dark': return dark
    case 'dragon': return dragon
    case 'electric': return electric
    case 'fairy': return fairy
    case 'fighting': return fighting
    case 'fire': return fire
    case 'flying': return flying
    case 'ghost': return ghost
    case 'grass': return grass
    case 'ground': return ground
    case 'ice': return ice
    case 'normal': return normal
    case 'poison': return poison
    case 'psychic': return psychic
    case 'rock': return rock
    case 'steel': return steel
    case 'water': return water
  }
}

export const $getTypeColor = (type: PokemonTypeName): string =>
  `var(--color-type-${type})`

export const $getAllTypes = (): TypeEntry[] =>
  (
    ['bug', 'dark', 'dragon', 'electric', 'fire', 'fairy',
     'fighting', 'flying', 'ghost', 'grass', 'ground', 'ice',
     'normal', 'poison', 'psychic', 'rock', 'steel', 'water'] as PokemonTypeName[]
  ).map((name) => ({ name, color: `var(--color-type-${name})` }))
