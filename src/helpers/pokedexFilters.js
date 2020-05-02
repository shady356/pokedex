export const $filterData = (filters) => {
  
  console.log(filters)
  if (!filters) {
    let list = []
    for (let i = 0; i < 37; i++) {
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
          id: i+1,
          name: '',
          sprite: ''
        }
      )
    }
    return list
  }

  
}