import axios from 'axios'

const createAxiosInstance = () => {
  let config = axios.create({
    BASE_URL: process.env.VUE_APP_HENRIKO_URL
  })

  return config
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
  axiosInstance: createAxiosInstance(),

  async getPokemonMovesByPokemonId (id) {
    try {
      let response = await this.axiosInstance.get(`/moves/${id}.json`)
      return responseHandler(response)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
