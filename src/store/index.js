import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:''
  },
  getters: {
  },
  mutations: {
    dotoken(state,tokens){
        state.token = tokens
    }
  },
  actions: {
  },
  modules: {
  }
})
