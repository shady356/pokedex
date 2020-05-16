import axios from 'axios'

export default axios.create({
  BASE_URL: process.env.VUE_APP_POKE_API_URL,
})
