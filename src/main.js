import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// 全局css
import './styles/index.css'
// vant css
import Vant from 'vant'
import 'vant/lib/index.css'
// rem
import 'amfe-flexible'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
