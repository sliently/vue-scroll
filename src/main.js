import Vue from 'vue'
import App from './App.vue'
import VueScroll from './scroll'
Vue.use(VueScroll)
new Vue({
  el: '#app',
  render: h => h(App)
})
