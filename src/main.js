import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import babelPolyfill from 'babel-polyfill'
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import lt from 'vee-validate/dist/locale/lt.json';
import * as rules from 'vee-validate/dist/rules';
import VueRouter from 'vue-router';
import moment from 'moment';
import Routes from './routes'

Vue.use(VueRouter);

//global API variable
Vue.prototype.$axios = axios;
Vue.prototype.$api_url = "http://localhost:3000";

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

// install rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize('lt', lt);

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

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