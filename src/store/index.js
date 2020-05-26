import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pokedexIds: 0,
    toast: {
      title: '',
      message: '',
      style: '',
      duration: '3000'
    }
  },
  mutations: {
    setPokedexIds(state, payload) {
      state.pokedexIds = payload
    },
    setToast(state, payload) {
      state.toast = payload
    },
  },
  actions: {
    commitPokedexIds(state, payload) {
      state.commit('setPokedexIds', payload)
    },
    commitToast(state, payload) {
      state.commit('setToast', payload)
    },
  },
  modules: {},
})
