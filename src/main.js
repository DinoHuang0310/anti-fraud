if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'

import './assets/css/main.css'

// import { createVfm } from 'vue-final-modal'
// import 'vue-final-modal/style.css'

// swiper
import { register } from 'swiper/element/bundle';

// const vfm = createVfm();
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import('./page/Home.vue')
  },
  {
    path: "/charts",
    name: "Charts",
    component: () => import('./page/Charts.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory('/2025/test/'),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.path === '/charts') {
      return { top: 0 }
    }
  },
})
const app = createApp(App);

app.use(register);
app.use(router);
app.mount('#app')