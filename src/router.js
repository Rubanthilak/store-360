import { createRouter, createWebHistory } from "vue-router";

import Home from './components/Pages/Home.vue'
import Items from './components/Pages/Items.vue'
import Customers from './components/Pages/Customers.vue'
import Sales from './components/Pages/Sales.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/items', component: Items },
  { path: '/customers', component: Customers },
  { path: '/sales', component: Sales },
];

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'is-active',
  routes,
});

export default router;
