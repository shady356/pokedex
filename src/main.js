import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueQueryPlugin } from '@tanstack/vue-query'
import 'material-icons/iconfont/material-icons.css'
import 'material-icons/iconfont/round.css'

// Vue2 Touch Events
import Vue2TouchEvents from 'vue2-touch-events'
Vue.use(Vue2TouchEvents)

// Vue lazy load
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
Vue.use(VueQueryPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
