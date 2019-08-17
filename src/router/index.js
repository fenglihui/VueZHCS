import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['../components/Login.vue'],resolve)
    },
    {
      path:'/index',
      name:'Index',
      component: resolve => require(['../components/Index.vue'],resolve),
      redirect:'/homepage',
      children:[
        {
          path:'/homepage',
          name:'Homepage',
          component:resolve => require(['../components/page/Homepage.vue'],resolve)
        },
        {
          path:'/searchpage1',
          name:'Searchpage1',
          component:resolve => require(['../components/page/Searchpage1.vue'],resolve)
        },
        {
          path:'/mappage',
          name:'Mappage',
          component:resolve => require(['../components/page/Mappage.vue'],resolve)
        },
        {
          path:'/searchpage2',
          name:'Searchpage2',
          component:resolve => require(['../components/page/Searchpage2.vue'],resolve)
        },
        {
          path:'/searchpage3',
          name:'Searchpage3',
          component:resolve => require(['../components/page/Searchpage3.vue'],resolve)
        },
        {
          path:'/operTable',
          name:'OperTable',
          component:resolve => require(['../components/page/operTable.vue'],resolve)
        },
        {
          path:'/todayData',
          name:'TodayTable',
          component:resolve => require(['../components/page/TodayData.vue'],resolve)
        },
        {
          path:'/priceData',
          name:'PriceData',
          component:resolve => require(['../components/page/PriceData.vue'],resolve)
        },
        {
          path:'/inputData',
          name:'InputData',
          component:resolve => require(['../components/page/InputData.vue'],resolve)
        }
      ]
    }
  ],
  mode:"history"
})
export default router

