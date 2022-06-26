import App from './App'
import store from './store'
import myPlugin from './util/plugin.js'


// #ifndef VUE3
import Vue from 'vue'

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$bus = new Vue()
Vue.use(myPlugin)
App.mpType = 'app'
const app = new Vue({
		store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif