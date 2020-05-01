import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faEgg, 
  faStar, 
  faRulerVertical, 
  faWeightHanging,
  faFilter,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faEgg, faStar, faRulerVertical, faWeightHanging, faFilter, faSearch)
Vue.component('fa-icon', FontAwesomeIcon)

// Vue2 Touch
import Vue2Touch from 'vue2-touch'

Vue.use(Vue2Touch)

// Vue lazy load
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
