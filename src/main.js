import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from './App.vue';
import Routes from './routes';
import * as VueGoogleMaps from 'vue2-google-maps';

// Use packages

Vue.use(VueResource);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC_L-4LysDxyPUtRJftl4aPOMc9Xkkjsb0',

  },
});
Vue.use(VueRouter);


// Register routes
const router = new VueRouter({
  routes: Routes,
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,


});

