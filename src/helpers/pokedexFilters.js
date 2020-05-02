export const $filterData = (filters) => {
  
  console.log(filters)
  if (!filters) {
    let list = []
    for (let i = 1; i < 151; i++) {
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

  
}