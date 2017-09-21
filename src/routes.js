import create from './components/create.vue';
import event from './components/event.vue';
import login from './components/login.vue';
import profile from './components/profile.vue';
import signup from './components/signup.vue';
import home from './components/home.vue';
import browse from './components/browse.vue';
import chat from './components/chatBox.vue';

export default [
  { path: '/home', component: home },
  { path: '/profile', component: profile },
  { path: '/login', component: login },
  { path: '/event', component: event },
  { path: '/create', component: create },
  { path: '/signup', component: signup },
  { path: '/browse', component: browse },
  { path: '/chatBox', component: chat },

];

