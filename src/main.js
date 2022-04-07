import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import {Message} from 'element-ui'
import ElementUi from 'element-ui'
import qs from 'qs'
import 'element-ui/lib/theme-chalk/index.css'

axios.defaults.baseURL='http://localhost:9000/'

Vue.prototype.$qs = qs
Vue.prototype.$message = Message
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUi)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
