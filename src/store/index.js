import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/localStoreage'
Vue.use(Vuex)

const TOKEN_VALUE = 'TOKEN_VALUE'
export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_VALUE)
  },
  mutations: {
    setToken (state, valueToken) {
      console.log(valueToken)
      state.user = valueToken
      setItem(TOKEN_VALUE, valueToken)
    }

  },
  actions: {
  },
  modules: {
  }
})
