import Vue from 'vue'
import Vuex from 'vuex'
import createState from 'vuex-persistedstate'

Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    nickname:'',
    area:'',
    authority:'',
    windowSize:''
  },
  plugins:[createState({
    storage:window.sessionStorage
  })],
  getters:{

  },
  mutations:{
    replace:function (state,value) {
      state.nickname=value.nickname
      state.area=value.area
      state.authority=value.authority
      state.windowSize=value.windowSize
    }
  }
})

export default store
