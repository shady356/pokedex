import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowLeft,
  faEgg,
  faStar,
  faRulerVertical,
  faWeightHanging,
  faFilter,
  faSearch,
  faChevronLeft,
  faChevronRight,
  faHeart,
  faSearchPlus,
  faSearchMinus
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(
  faArrowLeft,
  faEgg,
  faStar,
  faRulerVertical,
  faWeightHanging,
  faFilter,
  faSearch,
  faChevronRight,
  faChevronLeft,
  faHeart,
  faSearchPlus,
  faSearchMinus
)
Vue.component('fa-icon', FontAwesomeIcon)

// Vue2 Touch Events
import Vue2TouchEvents from 'vue2-touch-events'
Vue.use(Vue2TouchEvents)

// Vue lazy load
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

import './registerServiceWorker'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
