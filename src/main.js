import Vue from 'vue'
import App from './App.vue'
import babelPolyfill from 'babel-polyfill'
import VueRouter from 'vue-router';
import moment from 'moment';
import Routes from './routes'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})

Vue.filter('formatDate', function(value) {
  if (value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
  }
});