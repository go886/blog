import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import router from './router'
// import mock from './mock'
// mock;
Vue.config.productionTip = false
Vue.prototype.$http = axios // 类似于vue-resource的调用方法
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
