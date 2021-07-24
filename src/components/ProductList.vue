<template>
  <ul class="catalog__list">
    <ProductItem
      v-for="(product, i) in products"
      :key="i"
      :product="product"
    ></ProductItem>
  </ul>
</template>

<script>
import ProductItem from "./ProductItem.vue";

export default {
  props: ["products"],
  components: { ProductItem },
};
</script>
