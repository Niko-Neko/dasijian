import axios from 'axios'
import store from '@/store'
import router from '@/router/index'

export const baseURL='http://big-event-vue-api-t.itheima.net'

const myaxios = axios.create({
    baseURL
})

//定义请求拦截器
myaxios.interceptors.request.use((config) => {
  if(store.state.token){
      config.headers.Authorization=store.state.token
  }
  return config
},(error)=>{
     return Promise.reject(error) 
})

//定义响应拦截器
myaxios.interceptors.response.use((response) => {
   return response
},error => {
  if (error.response.status===401){
    store.commit('dotoken','')
    store.commit('saveuser',{})
    router.push('/login')
    this.$message.error('用户身份已过期!')
  }
})
export default myaxios