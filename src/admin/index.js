import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import router from './router'
// import mock from './mock'
// mock;
Vue.config.productionTip = false
Vue.use(ElementUI)


let http = axios.create()
http.defaults.timeout = 2500;
http.interceptors.response.use((response) => {
  if (response.data && response.data.error) {
    console.log('a')
    Vue.prototype.$message({
      message: response.data.error,
      type: "warning"
    });
  }
  return response.data
}, (error) => {
  console.log('b')

  Vue.prototype.$message({
    message: error.response.data,
    type: "warning"
  });
  return Promise.reject(error.response.data)
});

Vue.prototype.$http = http // 类似于vue-resource的调用方法

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
