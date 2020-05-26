import axios from 'axios'

const initConnection = () => {
  return axios.create({
    BASE_URL: process.env.VUE_APP_POKE_API_URL
  })
}
const responseHandler = (response) => {
  return {
    error: false,
    status: response.status,
    statusText: response.statusText,
    data: response.data
  }
}
const errorHandler = (error) => {
  return {
    error: true,
    status: error.response.status,
    statusText: error.response.statusText,
    data: error.response.data
  }
}

export default {
  connection: initConnection(),

  async getPokemon (id) {
    try {
      let response = await this.connection.get(`/api/v2/pokemon-form/${id}`)
      return responseHandler(response)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
