import Vue from 'vue'
import Router from 'vue-router'
import MainTable from '@/components/MainTable'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainTable
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
