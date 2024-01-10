import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import VueRouter from 'vue-router';
import Button from 'primevue/button';

import Home from './views/Home.vue';
import Shop from './views/Shop.vue';
import Coupon from './views/Coupon.vue';
import Profile from './components/Profile.vue';

import 'primevue/resources/themes/lara-light-green/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { createRouter, createWebHistory } from 'vue-router';




const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/Shop', component: Shop },
        { path: '/Coupon', component: Coupon },
        { path: '/Profile', component: Profile },
    ],
});


const app = createApp(App);
app.component('Button', Button);

app.use(PrimeVue);
app.use(VueRouter);
app.use(router);

app.mount('#app');
