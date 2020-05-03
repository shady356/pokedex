import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pokedexIds: 0
  },
  mutations: {
    setPokedexIds (state, payload) {
      console.log(payload)
      state.pokedexIds = payload
    }
  },
  actions: {
    commitPokedexIds(state, payload) {
      state.commit('setPokedexIds', payload)
    }
  },
  modules: {
  }
})
