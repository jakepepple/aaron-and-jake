import Vue from 'vue';
import Router from 'vue-router';
import trialRun from '@/components/trialRun';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'trialRun',
      component: trialRun,
    },
  ],
});
