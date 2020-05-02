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
    for (let i = (252-1); i < 400; i++) {
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
  else {
    let list = []
    for (let i = 0; i < 700; i++) {
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