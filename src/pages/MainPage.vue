<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> 152 товара </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        v-model:price-from="filterPriceFrome"
        v-model:price-to="filterPriceTo"
        v-model:category-id="filterCategoryId"
        v-model:color="filterColor"
        v-model:page="page"
      />

      <section class="catalog">
        <ProductList :products="products" />

        <BasePagination
          v-model:page="page"
          :count="countProducts"
          :per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
import products from "@/data/products.js";
import ProductList from "@/components/ProductList.vue";
import BasePagination from "@/components/BasePagination.vue";
import ProductFilter from "@/components/ProductFilter.vue";

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrome: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: 0,
      page: 1,
      productsPerPage: 3,
    };
  },

  computed: {
    filteredProducts() {
      let filterProducts = products;

      if (this.filterPriceFrome > 0) {
        filterProducts = filterProducts.filter(
          (product) => product.price > this.filterPriceFrome
        );
      }

      if (this.filterPriceTo > 0) {
        filterProducts = filterProducts.filter(
          (product) => product.price < this.filterPriceTo
        );
      }

      if (this.filterCategoryId) {
        filterProducts = filterProducts.filter(
          (product) => product.categoryId === this.filterCategoryId
        );
      }

      if (this.filterColor) {
        filterProducts = filterProducts.filter((product) =>
          product.color.some(
            (productColor) => productColor.toLowerCase() === this.filterColor.toLowerCase()
          )
        );
      }

      return filterProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
};
</script>