import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name:'index',
    component: ()=>import('@/layout/index')
  },
{
  path:'/register',
  name: 'register',
  component:()=>import('@/views/register')
},
{
  path:'/login',
  name: 'login',
  component:()=>import('@/views/login')
}
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  const token = store.state.token
  if(token && !store.state.userInfo.username){
  store.dispatch('getUser')}
  next()
})

export default router
