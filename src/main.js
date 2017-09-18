import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App.vue'
import Routes from './routes'
import login from './components/login.vue'


// Use packages
Vue.use(VueResource);
Vue.use(VueRouter);

// Register routes
const router = new VueRouter({
  routes: Routes
});

let appVue = new Vue({
  el: '#app',
  render: h => h(App),
  router: router,



})

