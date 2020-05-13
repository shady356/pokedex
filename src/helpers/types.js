export const $types = (type) => {
  const bug = {
    name: 'bug',
    description: 'foobar',
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
  const dark = {
    name: 'dark',
    description: 'foobar',
    resistantTo: ['psychic'],
    superEffectiveTo: ['psychic', 'ghost'],
    notVeryEffectiveTo: ['fighting', 'fairy'],
    vulnerableTo: ['fighting', 'bug', 'fairy'],
  }
  const dragon = {
    name: 'dragon',
    description: 'foobar',
    resistantTo: ['fire', 'water', 'electric', 'grass'],
    notVeryEffectiveTo: ['steel'],
    superEffectiveTo: ['dragon'],
    vulnerableTo: ['ice', 'dragon', 'fairy'],
  }
  const electric = {
    name: 'electric',
    description: 'foobar',
    superEffectiveTo: ['water', 'flying'],
    vulnerableTo: ['ground'],
  }
  const fairy = {
    name: 'fairy',
    description: 'foobar',
    superEffectiveTo: ['dragon', 'fighting', 'dark'],
    vulnerableTo: ['poison', 'steel'],
  }
  const fighting = {
    name: 'fighting',
    description: 'foobar',
    superEffectiveTo: ['normal', 'ice', 'rock', 'dark', 'steel'],
    vulnerableTo: ['flying', 'psychic', 'fairy'],
  }
  const fire = {
    name: 'fire',
    description:
      'Fire is one of the three basic elemental types along with Water and Grass, which constitute the three starter Pokémon. This creates a simple triangle to explain the type concept easily to new players.',
    superEffectiveTo: ['grass', 'bug', 'steel', 'ice'],
    vulnerableTo: ['water', 'ground', 'rock'],
  }
  const flying = {
    name: 'flying',
    description: 'foobar',
    superEffectiveTo: ['grass', 'bug', 'fighting'],
    vulnerableTo: ['electric', 'ice', 'rock'],
  }
  const ghost = {
    name: 'ghost',
    description: 'foobar',
    superEffectiveTo: ['psychic', 'ghost'],
    vulnerableTo: ['dark', 'ghost'],
  }
  const grass = {
    name: 'grass',
    description: 'foobar',
    superEffectiveTo: ['water', 'ground', 'rock'],
    vulnerableTo: ['fire', 'ice', 'flying', 'poison', 'bug'],
  }
  const ground = {
    name: 'ground',
    description: 'foobar',
    superEffectiveTo: ['fire', 'rock', 'steel', 'electric', 'poison'],
    vulnerableTo: ['water', 'grass', 'ice'],
  }
  const ice = {
    name: 'ice',
    description: 'foobar',
    superEffectiveTo: ['dragon', 'grass', 'ground', 'flying'],
    vulnerableTo: ['fire', 'rock', 'fighting', 'steel'],
  }
  const normal = {
    name: 'normal',
    description: 'foobar',
    superEffectiveTo: [],
    vulnerableTo: ['fighting'],
  }
  const poison = {
    name: 'poison',
    description: 'foobar',
    superEffectiveTo: ['grass', 'fairy'],
    vulnerableTo: ['ground', 'psychic'],
  }
  const psychic = {
    name: 'psychic',
    description: 'foobar',
    superEffectiveTo: ['fighting', 'poison'],
    vulnerableTo: ['dark', 'bug', 'ghost'],
  }
  const rock = {
    name: 'rock',
    description: 'foobar',
    superEffectiveTo: ['flying', 'ice', 'fire', 'bug'],
    vulnerableTo: ['water', 'grass', 'fighting', 'ground', 'steel'],
  }
  const steel = {
    name: 'steel',
    description: 'foobar',
    superEffectiveTo: ['ice', 'rock', 'fairy'],
    vulnerableTo: ['fire', 'fighting', 'ground'],
  }
  const water = {
    name: 'water',
    description: 'foobar',
    superEffectiveTo: ['fire', 'ground', 'rock'],
    vulnerableTo: ['grass', 'electric'],
  }
  switch (type) {
    case 'bug':
      return bug
    case 'dark':
      return dark
    case 'dragon':
      return dragon
    case 'electric':
      return electric
    case 'fairy':
      return fairy
    case 'fighting':
      return fighting
    case 'fire':
      return fire
    case 'flying':
      return flying
    case 'ghost':
      return ghost
    case 'grass':
      return grass
    case 'ground':
      return ground
    case 'ice':
      return ice
    case 'normal':
      return normal
    case 'poison':
      return poison
    case 'psychic':
      return psychic
    case 'rock':
      return rock
    case 'steel':
      return steel
    case 'water':
      return water
  }
}
export const $typesPokemonList = (type) => {
  const fire = [
    4,
    5,
    6,
    37,
    38,
    58,
    59,
    77,
    78,
    126,
    136,
    146,
    155,
    156,
    157,
    218,
    219,
    228,
    229,
    240,
    244,
    250,
    255,
    256,
    257,
    322,
    323,
    324,
    390,
    391,
    392,
    467,
    485,
    494,
    498,
    499,
    500,
    513,
    514,
    554,
    555,
    607,
    608,
    609,
    631,
    636,
    637,
    643,
    653,
    654,
    655,
    662,
    663,
    667,
    668,
    721,
    725,
    726,
    727,
    741,
    757,
    758,
    776,
    806,
  ]
  const water = [
    7,
    8,
    9,
    54,
    55,
    60,
    61,
    62,
    72,
    73,
    79,
    80,
    86,
    87,
    90,
    91,
    98,
    99,
    116,
    117,
    118,
    119,
    120,
    121,
    129,
    130,
    131,
    134,
    138,
    139,
    140,
    141,
    158,
    159,
    160,
    170,
    171,
    183,
    184,
    186,
    194,
    195,
    199,
    211,
    222,
    223,
    224,
    226,
    230,
    245,
    258,
    259,
    260,
    270,
    271,
    272,
    278,
    279,
    283,
    318,
    319,
    320,
    321,
    339,
    340,
    341,
    342,
    349,
    350,
    363,
    364,
    365,
    366,
    367,
    368,
    369,
    370,
    382,
    393,
    394,
    395,
    400,
    418,
    419,
    422,
    423,
    456,
    457,
    458,
    484,
    489,
    490,
    501,
    502,
    503,
    515,
    516,
    535,
    536,
    537,
    550,
    564,
    565,
    580,
    581,
    592,
    593,
    594,
    647,
    656,
    657,
    658,
    688,
    689,
    690,
    692,
    693,
    721,
    728,
    729,
    730,
    746,
    747,
    748,
    751,
    752,
    767,
    768,
    771,
    779,
    788,
  ]
  switch (type) {
    /*     case 'bug': return bug
    case 'dark': return dark
    case 'dragon': return dragon
    case 'electric': return electric
    case 'fairy': return fairy
    case 'fighting': return fighting */
    case 'fire':
      return fire
    /*     case 'flying': return flying
    case 'ghost': return ghost
    case 'grass': return grass
    case 'ground': return ground
    case 'ice': return ice
    case 'normal': return normal
    case 'poison': return poison
    case 'psychic': return psychic
    case 'rock': return rock
    case 'steel': return steel*/
    case 'water':
      return water
  }
}
