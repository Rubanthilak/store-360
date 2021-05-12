import { createRouter, createWebHistory } from "vue-router";

import Home from "./components/Pages/Home.vue";
import Sales from "./components/Pages/Sales.vue";
import Profile from "./components/Pages/Profile.vue";

import ItemsView from "./components/Pages/Item/ItemsView.vue";
import ItemsAddView from "./components/Pages/Item/ItemsAddView.vue";
import ItemsListView from "./components/Pages/Item/ItemsListView.vue";

import CustomerView from "./components/Pages/Customer/CustomerView.vue";
import CustomerListView from "./components/Pages/Customer/CustomerListView.vue";
import CustomerDetailsView from "./components/Pages/Customer/CustomerDetailsView.vue";


const routes = [
  { path: "/", component: Home },
  {
    path: "/items",
    component: ItemsView,
    children: [
      { path: "", component: ItemsListView },
      { path: "add", component: ItemsAddView },
    ],
  },
  { path: "/customers", 
    component: CustomerView,
    children : [
      {path: "", component: CustomerListView},
      {path: ":id", component: CustomerDetailsView}
    ]
  },
  { path: "/sales", component: Sales },
  { path: "/profile", component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "is-active",
  routes,
});

export default router;
