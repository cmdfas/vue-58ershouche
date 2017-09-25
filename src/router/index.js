import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Info from '@/components/Info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/pr-:start-:end',
      name: 'List',
      component: List,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/info/:id',
      name: 'info',
      component: Info,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
