import Vue from 'vue'
import Vuex from 'vuex'
// import {setItem,getItem} from '@/utils/store'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: 'toekn'
  },
  mutations: {
    setToken (state, valueToken) {
      state.user = valueToken
      // setItem
    }

  },
  actions: {
  },
  modules: {
  }
})
