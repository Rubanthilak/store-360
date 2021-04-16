import { createRouter, createWebHistory } from "vue-router";

import Home from './components/Pages/Home.vue'
import ItemsView from './components/Pages/Items/ItemsView.vue'
import Customers from './components/Pages/Customers.vue'
import Sales from './components/Pages/Sales.vue'

import ItemsAddView from './components/Pages/Items/ItemsAddView.vue'
import ItemsListView from './components/Pages/Items/ItemsListView.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/items', component: ItemsView , children: [
    { path: '', component: ItemsListView },
    { path: 'add', component: ItemsAddView },
  ]},
  { path: '/customers', component: Customers },
  { path: '/sales', component: Sales },
];

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'is-active',
  routes,
});

export default router;
