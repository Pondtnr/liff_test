// router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';

// Import your views
import Home from '../views/Home.vue';
import Shop from '../views/Shop.vue';
import Coupon from '../views/Coupon.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/shop', component: Shop },
  { path: '/coupon', component: Coupon },
];

const router = new VueRouter({
  routes,
  mode: 'history', // Use 'history' mode for clean URLs
});

export default router;
