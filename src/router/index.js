import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
{
  path:'/register',
  name: 'register',
  component:()=>import('@/views/register')
}
]

const router = new VueRouter({
  routes
})

export default router
