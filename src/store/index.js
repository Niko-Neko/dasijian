import Vue from 'vue'
import Vuex from 'vuex'
//借助插件来实现持久化
import createPersistentState from 'vuex-persistedstate'
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
  },
  //注入持久化插件
  plugins:[
    createPersistentState() ]
})
