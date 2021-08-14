import { createRouter, createWebHashHistory } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import ProductPage from "@/pages/ProductPage.vue";
import CartPage from "@/pages/CartPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const routes = [
  {
    name: "main",
    component: MainPage,
    path: "/",
  },
  {
    name: "product",
    component: ProductPage,
    path: "/product/:id",
  },
  {
    name: "cart",
    component: CartPage,
    path: "/cart/",
  },
  {
    name: "NotFoundPage",
    component: NotFoundPage,
    path: "/:catchAll(.*)",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
