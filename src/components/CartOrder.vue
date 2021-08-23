<template>
  <li class="cart__order">
    <h3>{{ orderItem.product.title }}</h3>
    <div>
      <b>{{ numberFormat(orderItem.product.price) }} ₽</b>
      <br>
      <small>{{ orderItem.quantity }} шт.</small>
    </div>
    <span>Артикул: {{ orderItem.id }}</span>
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
export default {
  props: ["orderItem"],
  methods: {
    numberFormat(price) {
      return numberFormat(price);
    },
  }
};
</script>
