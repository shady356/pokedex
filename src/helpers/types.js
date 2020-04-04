export const $types = (type) => {
  const bug = {
    name: 'bug',
    description: 'foobar',
    superEffectiveFrom: ['fire', 'flying', 'rock'],
    superEffectiveTo: ['grass', 'dark', 'psychic']
  }
  const dark = {
    name: 'dark',
    description: 'foobar',
    superEffectiveFrom: ['grass', 'electric'],
    superEffectiveTo: ['bug', 'ground', 'rock']
  }
  const dragon = {
    name: 'dragon',
    description: 'foobar',
    superEffectiveFrom: ['grass', 'electric'],
    superEffectiveTo: ['dragon', 'ice', 'fairy']
  }
  const electric = {
    name: 'electric',
    description: 'foobar',
    superEffectiveFrom: ['grass', 'electric'],
    superEffectiveTo: ['dragon', 'ice', 'fairy']
  }
  const fairy = {
    name: 'fairy',
    description: 'foobar',
    superEffectiveFrom: ['grass', 'electric'],
    superEffectiveTo: ['dragon', 'ice', 'fairy']
  }
  const fighting = {
    name: 'fighting',
    description: 'foobar',
    superEffectiveFrom: ['grass', 'electric'],
    superEffectiveTo: ['dragon', 'ice', 'fairy']
  }
  const fire = {
    name: 'fire',
    description: 'foobar',
    superEffectiveFrom: ['grass', 'electric'],
    superEffectiveTo: ['dragon', 'ice', 'fairy']
  }
  const flying = {
    name: 'flying',
    description: 'foobar',
    superEffectiveFrom: ['grass', 'electric'],
    superEffectiveTo: ['dragon', 'ice', 'fairy']
  }
  const ghost = {
    name: 'ghost',
    description: 'foobar',
    superEffectiveFrom: ['grass', 'electric'],
    superEffectiveTo: ['dragon', 'ice', 'fairy']
  }
  const grass = {
    name: 'grass',
    description: 'foobar',
    superEffectiveFrom: ['grass', 'electric'],
    superEffectiveTo: ['dragon', 'ice', 'fairy']
  }
  const ground = {
    name: 'ground',
    description: 'foobar',
    superEffectiveFrom: ['grass', 'electric'],
    superEffectiveTo: ['dragon', 'ice', 'fairy']
  }
  const ice = {
    name: 'ice',
    description: 'foobar',
    superEffectiveFrom: ['grass', 'electric'],
    superEffectiveTo: ['dragon', 'ice', 'fairy']
  }
  const normal = {
    name: 'normal',
    description: 'foobar',
    superEffectiveFrom: ['grass', 'electric'],
    superEffectiveTo: ['dragon', 'ice', 'fairy']
  }
  const poison = {
    name: 'poison',
    description: 'foobar',
    superEffectiveFrom: ['grass', 'electric'],
    superEffectiveTo: ['dragon', 'ice', 'fairy']
  }
  const psychic = {
    name: 'psychic',
    description: 'foobar',
    superEffectiveFrom: ['grass', 'electric'],
    superEffectiveTo: ['dragon', 'ice', 'fairy']
  }
  const rock = {
    name: 'rock',
    description: 'foobar',
    superEffectiveFrom: ['grass', 'electric'],
    superEffectiveTo: ['dragon', 'ice', 'fairy']
  }
  const steel = {
    name: 'steel',
    description: 'foobar',
    superEffectiveFrom: ['grass', 'electric'],
    superEffectiveTo: ['dragon', 'ice', 'fairy']
  }
  const water = {
    name: 'water',
    description: 'foobar',
    superEffectiveFrom: ['grass', 'electric'],
    superEffectiveTo: ['fire', 'ground', 'rock']
  }
  switch (type) {
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