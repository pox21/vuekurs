<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: { id: product.id } }"
    >
      <img :src="product.img" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{ numberFormat }} ₽ </span>

    <ul class="colors colors--black">
      <li
        v-for="productColor of product.colors"
        :key="productColor.id"
        class="colors__item"
      >
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="productColor.id"
            v-model="color"
          />
          <span
            class="colors__value"
            :style="{ backgroundColor: productColor.code }"
          >
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import goToPage from "@/helpers/goToPage";
import numberFormat from "@/helpers/numberFormat";
export default {
  data() {
    return {
      color: null,
    }
  },
  methods: {
    goToPage,
  },
  props: ["product"],
  computed: {
    numberFormat() {
      return numberFormat(this.product.price);
    }
  }
};
</script>
