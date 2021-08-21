<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.img"
        width="120"
        height="120"
        :alt="item.product.title"
      />
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code"> Артикул: {{ item.product.id }} </span>

    <AmountItem class="product__counter" v-model:amount-prod="amount" />
    <b class="product__price">
      {{ numberFormat(item.amount * item.product.price) }} ₽
    </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deletProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import { mapActions } from "vuex";
import AmountItem from "@/components/AmountItem.vue";

export default {
  components: { AmountItem },
  methods: {
    numberFormat(price) {
      return numberFormat(price);
    },
    ...mapActions(["deleteProduct"]),
    deletProduct(productId) {
      this.deleteProduct(productId);
    },
  },
  props: ["item"],
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch("updateCartProductAmount", {
          productId: this.item.productId,
          amount: value,
        });
      }
    }
  },
  watch: {
    amount() {
      if(!this.amount) {
        this.deletProduct(this.item.productId);
      }
    }
  },
};
</script>
