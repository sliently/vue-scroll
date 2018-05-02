import Vue from 'vue'
import App from './App.vue'
import VueScroll from './vue-scroll'
console.log(VueScroll)
Vue.use(VueScroll)
new Vue({
  el: '#app',
  render: h => h(App)
})
