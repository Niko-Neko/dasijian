import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/elementUI/index'
import '@/styles/public.css'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//日期dayjs的引进
import dayjs from 'dayjs'

Vue.prototype.$dateformat = (dateObj)=>{
    return dayjs(dateObj).format('YYYY-MM-DD HH:mm:ss')
}

Vue.use(VueQuillEditor)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
