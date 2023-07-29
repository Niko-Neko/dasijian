import Vue from 'vue'
import Vuex from 'vuex'
import {getUserInfoAPI} from '@/api/index'
//借助插件来实现持久化
import createPersistentState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    userInfo:{}
  },
  getters: {
    username:state=>state.userInfo.username,
    nickname:state=>state.userInfo.nickname,
    user_pic:state=>state.userInfo.user_pic
  },
  mutations: {
    dotoken(state,tokens){
        state.token = tokens
    },
    saveuser(state,val){
      state.userInfo = val
    }
  },
  actions: {
    async getUser(store){
      const {data:{data:res}} = await getUserInfoAPI()
        console.log(res);
        store.commit('saveuser',res)
      }  
      
  },
  modules: {
  },
  //注入持久化插件
  plugins:[createPersistentState() ]
})
