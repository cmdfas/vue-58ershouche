// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.prototype.$ajax = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// 记录滚动位置
var indexScrollTop = 0
var dom = document.querySelector('#app')
router.beforeEach((to, from, next) => {
  if (to.path.indexOf('/info') === 0) {
    indexScrollTop = dom.scrollTop
  }
  next()
})
console.log(indexScrollTop)

router.afterEach((to, from) => {
  if (to.path.indexOf('/info') === 0) {
    dom.scrollTop = 0
  } else {
    Vue.nextTick(() => {
      dom.scrollTop = indexScrollTop
    })
  }
})
