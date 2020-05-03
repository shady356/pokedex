import { $typesPokemonList } from '@/helpers/types.js'
export const $filterData = (filters) => {
  
  if(filters.generations.includes('kanto')) {
    let list = []
    for (let i = 0; i < 151; i++) {
      list.push(
        {
          id: i,
          name: '',
          sprite: ''
        }
      )
    }
    return list
  }
  else if(filters.generations.includes('johto')) {
    let list = []
    for (let i = (152-1); i < 251; i++) {
      list.push(
        {
          id: i,
          name: '',
          sprite: ''
        }
      )
    }
    return list
  }
  else if(filters.generations.includes('hoenn')) {
    let list = []
    for (let i = (252-1); i < 385; i++) {
      list.push(
        {
          id: i,
          name: '',
          sprite: ''
        }
      )
    }
    return list
  }
  else if(filters.types.includes('fire')) {
    let list = []
    let typeList = $typesPokemonList('fire')
    
    for (let i = 0; i < typeList.length; i++) {
      list.push(
        {
          id: typeList[i],
          name: '',
          sprite: ''
        }
      )
    } 
    return list
  }
  // All pokemon:
  else {
    let list = []
    for (let i = 0; i < 809; i++) {
      list.push(
        {
          id: i,
          name: '',
          sprite: ''
        }
      )
    }
    return list
  }

  
}