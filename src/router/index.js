import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/layout/index'),
    redirect:'/home',
    children: [{
      path:'home',
      component: () => import('@/views/home')
    },
    {
      path:'user-info',
      component: () => import('@/views/user/userinfo')
    },
   {
    path:'user-avatar',
    component: () => import('@/views/user/userAvatar')
   },
   {
    path:'user-pwd',
    component: () => import('@/views/user/userPwd')
   },
   {
    path:'art-cate',
    component: () => import('@/views/acticle/artCate')
   },
  { 
    path:'art-List',
    component:()=>import('@/views/acticle/artList')
  }
]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
]

const router = new VueRouter({
  routes
})

const whiteList = ['/login', '/reg']

router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    if (!store.state.userInfo.username) {
      store.dispatch('getUser')
    }
    next()
  }
  else {
    if (whiteList.includes(to.path)) { next() }
    else {
      next('/login')
    }
  }
})

export default router
