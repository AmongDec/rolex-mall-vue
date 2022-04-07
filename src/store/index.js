import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =new Vuex.Store({
  state:{
    login: window.sessionStorage.getItem('token') == null ? '登录' : '个人中心'
  }
})

export default store

