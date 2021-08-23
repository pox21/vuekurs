<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info">
        {{
          $store.state.cartProductsData.reduce(
            (res, item) => item.quantity + res,
            0
          )
        }}
        товара
      </span>
    </div>

    <section class="cart">
      <form
        class="cart__form form"
        action="#"
        method="POST"
        @submit.prevent="order"
      >
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
              v-model:value="formData.name"
              title="ФИО"
              type="text"
              :error="formError.name"
              placeholder="Введите ваше полное имя"
            />
            <BaseFormText
              v-model:value="formData.address"
              title="Адрес доставки"
              type="text"
              :error="formError.address"
              placeholder="Введите ваш адрес"
            />

            <BaseFormText
              v-model:value="formData.phone"
              title="Телефон"
              type="tel"
              :error="formError.phone"
              placeholder="Введите ваш телефон"
            />

            <BaseFormText
              v-model:value="formData.email"
              title="Email"
              type="email"
              :error="formError.email"
              placeholder="Введи ваш Email"
            />

            <BaseFormTextarea
              title="Комментарий к заказу"
              v-model:value="formData.comment"
              placeholder="Ваши пожелания"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked=""
                  />
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="500"
                  />
                  <span class="options__value"> Курьером <b>500 ₽</b> </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="card"
                  />
                  <span class="options__value"> Картой при получении </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="cash"
                  />
                  <span class="options__value"> Наличными при получении </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <CartOrder
              v-for="orderItem in $store.state.cartProductsData"
              :key="orderItem.id"
              :order-item="orderItem"
            />
          </ul>

          <div class="cart__total">
            <p>
              Итого:
              <b>
                {{
                  $store.state.cartProductsData.reduce(
                    (res, item) => item.quantity + res,
                    0
                  )
                }}
              </b>
              товаров на&nbsp;сумму&nbsp;<b>
                {{ numberFormat(totalPrice) }}&nbsp;₽
              </b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit" :disabled="successSended">
            Оформить заказ
          </button>
        </div>
        <div v-if="successSended" class="preloader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMsg">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMsg }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from "@/components/BaseFormText.vue";
import BaseFormTextarea from "@/components/BaseFormTextarea.vue";
import numberFormat from "@/helpers/numberFormat";
import { mapGetters } from "vuex";
import CartOrder from "@/components/CartOrder.vue";
import axios from "axios";
import { API_BASE_URL } from "@/config";

export default {
  components: { BaseFormText, CartOrder, BaseFormTextarea },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMsg: "",
      successSended: false,
    };
  },
  methods: {
    numberFormat(price) {
      return numberFormat(price);
    },
    order() {
      this.formError = {};
      this.formErrorMsg = "";
      this.successSended = true;
      this.loadOrder = setTimeout(() => {
        axios
          .post(
            API_BASE_URL + "/api/orders",
            {
              ...this.formData,
            },
            {
              params: {
                userAccessKey: this.$store.state.userAccesKey,
              },
            }
          )
          .then((response) => {
            this.$store.commit("resetCart");
            this.$store.commit("updateOrderInfo", response.data);
            this.$router.push({
              name: "orderInfo",
              params: { id: response.data.id },
            });
            this.successSended = false;
          })
          .catch((error) => {
            this.formError = error.response.data.error.request || {};
            this.formErrorMsg = error.response.data.error.message || "";
            this.successSended = false;
          });
      }, 800);
    },
  },
  computed: {
    ...mapGetters({
      products: "cartDetailProducts",
      totalPrice: "cartTotalPrice",
    }),
  },
};
</script>
