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

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ this.$store.state.orderInfo.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет
            письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами
            в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key"> Получатель </span>
              <span class="dictionary__value">
                {{ this.$store.state.orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Адрес доставки </span>
              <span class="dictionary__value">
                {{ this.$store.state.orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Телефон </span>
              <span class="dictionary__value">
                {{ this.$store.state.orderInfo.id }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Email </span>
              <span class="dictionary__value">
                {{ this.$store.state.orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Способ оплаты </span>
              <span class="dictionary__value"> картой при получении </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <CartOrder
              v-for="item in $store.state.orderInfo.basket.items"
              :key="item.id"
              :order-item="item"
            />
          </ul>

          <div class="cart__total">
            <p>
              Итого:
              <b> {{ $store.state.orderInfo.basket.items.length }} </b>
              товара на&nbsp;сумму&nbsp;<b>
                {{
                  numberFormat($store.state.orderInfo.totalPrice)
                }}&nbsp;₽</b
              >
            </p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CartOrder from "@/components/CartOrder.vue";
import numberFormat from "@/helpers/numberFormat";
export default {
  components: { CartOrder },
  methods: {
    numberFormat(price) {
      return numberFormat(price);
    },
  },
  created() {
    if (
      this.$store.state.orderInfo &&
      this.$store.state.orderInfo.id === this.$route.params.id
    ) {
      return;
    }
    return this.$route.params.id
      ? this.$store.dispatch("loadOrderInfo", this.$route.params.id)
      : "";
  },
};
</script>
