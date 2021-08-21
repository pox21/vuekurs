import { createStore } from "vuex";
import axios from "axios";
import { API_BASE_URL } from "@/config";

const store = createStore({
  state: {
    cartProducts: [],
    userAccesKey: null,
    cartProductsData: [],
  },
  mutations: {
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find(
        (item) => item.productId === productId
      );

      if (item) {
        item.amount = amount;
      }
    },
    deletCartProduct(state, productId) {
      state.cartProducts = state.cartProductsData.filter(
        (item) => item.product.id !== productId
      );
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccesKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        };
      });
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const product = state.cartProductsData.find(
          (p) => p.product.id === item.productId
        ).product;
        return {
          ...item,
          product: {
            ...product,
            img: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce(
        (acc, item) => item.product.price * item.amount + acc,
        0
      );
    },
  },
  actions: {
    loadCart(context) {
      return axios
        .get(API_BASE_URL + "/api/baskets", {
          params: {
            userAccessKey: context.state.userAccesKey,
          },
        })
        .then((response) => {
          if (!context.state.userAccesKey) {
            localStorage.setItem("userAccessKey", response.data.user.accessKey);
            context.commit("updateUserAccessKey", response.data.user.accessKey);
          }
          context.commit("updateCartProductsData", response.data.items);
          context.commit("syncCartProducts");
        });
    },
    addProductToCart(context, { productId, amount }) {
      return new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
        return axios
          .post(
            API_BASE_URL + "/api/baskets/products",
            {
              productId,
              quantity: amount,
            },
            {
              params: {
                userAccessKey: context.state.userAccesKey,
              },
            }
          )
          .then((response) => {
            context.commit("updateCartProductsData", response.data.items);
            context.commit("syncCartProducts");
          });
      });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit("updateCartProductAmount", { productId, amount });
      if (amount < 1) {
        return;
      }
      return axios
        .put(
          API_BASE_URL + "/api/baskets/products",
          {
            productId,
            quantity: amount,
          },
          {
            params: {
              userAccessKey: context.state.userAccesKey,
            },
          }
        )
        .then((response) => {
          context.commit("updateCartProductsData", response.data.items);
        })
        .catch(() => {
          context.commit("syncCartProducts");
        });
    },
    deleteProduct(context, productId) {
      console.log(context.state.userAccesKey);
      console.log(productId);
      return axios
        .delete(
          API_BASE_URL + "/api/baskets/products",
          {
            productId,
          },
          {
            params: {
              userAccessKey: context.state.userAccesKey,
            },
          }
        )
        .then((response) => {
          console.log("das");
          context.commit("deletCartProduct", productId);
          context.commit("updateCartProductsData", response.data.items);
        });
    },
  },
});

export default store;
