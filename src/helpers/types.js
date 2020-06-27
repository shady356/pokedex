export const $getTypeInfoByName = (typeName) => {
  const bug = {
    name: 'bug',
    description: 'Bug types are usually encountered early in your pokémon journey. Due to overall poor move options, this type is seen as a weak choice to have in a party. Although, you can always surprise your opponent\'s psychic type with a super effecitve attack',
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
    description: 'The dark type was added to nerf the over-powered psychic pokémon prior to generation II.',
    resistantTo: ['psychic'],
    superEffectiveTo: ['psychic', 'ghost'],
    notVeryEffectiveTo: ['fighting', 'fairy'],
    vulnerableTo: ['fighting', 'bug', 'fairy'],
  }
  const dragon = {
    name: 'dragon',
    description: 'Dragon type is among the strongest in the game. Usually you\'ll encounter semi-legendary and legendary -pokémon equipped with this type. With great bulk and outragous attacks, this type is almost a prerequisite to conquer competitive trainers',
    resistantTo: ['fire', 'water', 'electric', 'grass'],
    notVeryEffectiveTo: ['steel'],
    superEffectiveTo: ['dragon'],
    vulnerableTo: ['ice', 'dragon', 'fairy'],
  }
  const electric = {
    name: 'electric',
    description: 'With only one vulnerability in disfavor for Ground types, Electric pokémon provides stability to your party. They are lacking good tanks, but puts speed and attack on the table, which makes them capable of sweeping off tanky Water and Flying -types.',
    superEffectiveTo: ['water', 'flying'],
    vulnerableTo: ['ground'],
  }
  const fairy = {
    name: 'fairy',
    description: 'As a consequence of the over-powered Dragon types and bulky Steel types, Fairy was added as a type to balance the game in the sixth generation. Many former Normal types has been changed into Fairy type to make them even stronger',
    superEffectiveTo: ['dragon', 'fighting', 'dark'],
    vulnerableTo: ['poison', 'steel'],
  }
  const fighting = {
    name: 'fighting',
    description: 'The only type to properly deal with Normal types. Fighting types offer an array of super effective attacks to various types. A recommended choice to have in your party and it also puts an end to the bulky steel types.',
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
    description: 'A popular choice to have in your party,',
    superEffectiveTo: ['grass', 'bug', 'fighting'],
    vulnerableTo: ['electric', 'ice', 'rock'],
  }
  const ghost = {
    name: 'ghost',
    description: 'This mysteries type completes the triangle with Dark and Psychic types.',
    superEffectiveTo: ['psychic', 'ghost'],
    vulnerableTo: ['dark', 'ghost'],
  }
  const grass = {
    name: 'grass',
    description: 'A good starter in your journey, but will often decline as you progress due its many vulnerabilities',
    superEffectiveTo: ['water', 'ground', 'rock'],
    vulnerableTo: ['fire', 'ice', 'flying', 'poison', 'bug'],
  }
  const ground = {
    name: 'Ground',
    description: 'With an impressively super effective encounter-rate (tied with Fighting type), it gives your party a versatile pokémon to sweep off your opponents. Ground types are great tanks too with an overall high defense stat.',
    superEffectiveTo: ['fire', 'rock', 'steel', 'electric', 'poison'],
    vulnerableTo: ['water', 'grass', 'ice'],
  }
  const ice = {
    name: 'ice',
    description: 'A balanced type as it\'s super effective and vulnerable to four types respectiviely. It brings the powerfull Dragons down, but can be risky to play due to its vulnerabilities.',
    superEffectiveTo: ['dragon', 'grass', 'ground', 'flying'],
    vulnerableTo: ['fire', 'rock', 'fighting', 'steel'],
  }
  const normal = {
    name: 'normal',
    description: 'The most balanced pokémon type. Great for beginners as it has only one vulnerability to Fighting types, but on the attacking front it deals mediocre damage to all types as it\'s lacking super effective advantage. It\'s also inefective to Ghost types',
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
    description: 'Often seen in combination with Ground types. It\'s vulnerability makes it weak in the competitive play, but on the bright side it can also land some super effective hits',
    superEffectiveTo: ['flying', 'ice', 'fire', 'bug'],
    vulnerableTo: ['water', 'grass', 'fighting', 'ground', 'steel'],
  }
  const steel = {
    name: 'steel',
    description: 'Steel types are one of the best due to its strong resistancy to other types.',
    superEffectiveTo: ['ice', 'rock', 'fairy'],
    vulnerableTo: ['fire', 'fighting', 'ground'],
  }
  const water = {
    name: 'water',
    description: 'foobar',
    superEffectiveTo: ['fire', 'ground', 'rock'],
    vulnerableTo: ['grass', 'electric'],
  }
  switch (typeName) {
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
export const $getTypeColor = (type) => {
  switch (type) {
    case "bug":
      return "#92BC2C";
    case "dark":
      return "#595761";
    case "dragon":
      return "#0C69C8";
    case "electric":
      return "#F2D94E";
    case "fire":
      return "#FBA54C";
    case "fairy":
      return "#EE90E6";
    case "fighting":
      return "#D3425F";
    case "flying":
      return "#A1BBEC";
    case "ghost":
      return "#5F6DBC";
    case "grass":
      return "#5FBD58";
    case "ground":
      return "#DA7C4D";
    case "ice":
      return "#75D0C1";
    case "normal":
      return "#A0A29F";
    case "poison":
      return "#B763CF";
    case "psychic":
      return "#FA8581";
    case "rock":
      return "#C9BB8A";
    case "steel":
      return "#5695A3";
    case "water":
      return "#539DDF";
  }
}
export const $getAllTypes = () => {
  return [
    {
      name: "bug",
      color: "#92BC2C"
    }, 
    {
      name: "dark",
      color: "#595761"
    },
    {
      name: "dragon",
      color: "#0C69C8"
    },
    {
      name: "electric",
      color: "#F2D94E"
    },
    {
      name: "fire",
      color: "#FBA54C"
    },
    {    
      name: "fairy",
      color: "#EE90E6"
    },
    {
      name: "fighting",
      color: "#D3425F"
    },
    {
      name: "flying",
      color: "#A1BBEC"
    },
    {
      name: "ghost",
      color: "#5F6DBC"
    },
    {
      name: "grass",
      color: "#5FBD58"
    },
    {
      name: "ground",
      color: "#DA7C4D"
    },{
      name: "ice",
      color: "#75D0C1"
    },
    {
      name: "normal",
      color: "#A0A29F"
    },
    {
      name: "poison",
      color: "#B763CF"
    }, 
    {
      name: "psychic",
      color: "#FA8581"
    }, 
    {
      name: "rock",
      color: "#C9BB8A"
    }, 
    {
      name: "steel",
      color: "#5695A3"
    }, 
    {
      name: "water",
      color: "#539DDF"
    }
  ]
}
