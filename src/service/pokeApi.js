import axios from 'axios'

const createAxiosInstance = () => {
  let config = axios.create({
    baseURL: process.env.VUE_APP_POKE_API_URL
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

  async getPokemonById (id) {
    try {
      let response = await this.axiosInstance.get(`/api/v2/pokemon/${id}`)
      return responseHandler(response)
    } catch (error) {
      return errorHandler(error)
    }
  },
  async getPokemonFormById (id) {
    try {
      let response = await this.axiosInstance.get(`/api/v2/pokemon-form/${id}`)
      return responseHandler(response)
    } catch (error) {
      return errorHandler(error)
    }
  },
  async getPokemonSpeciesById (id) {
    try {
      let response = await this.axiosInstance.get(`/api/v2/pokemon-species/${id}`)
      return responseHandler(response)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
