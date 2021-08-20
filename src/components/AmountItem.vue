<template>
  <div class="form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click.prevent="amountDown"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="amountProductItem" />

    <button
      type="button"
      aria-label="Добавить один товар"
      @click.prevent="amountUp"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ["amountProd"],
  data() {
    return {
      amountProductItem: this.amountProd ? this.amountProd : 1,
    };
  },
  methods: {
    amountChange(amountProductItem) {
      this.$emit("update:amountProd", amountProductItem);
    },
    amountUp() {
      this.amountProductItem++;
    },
    amountDown() {
      if(this.amountProductItem) {
        this.amountProductItem--;
      }
    },
  },
  watch: {
    amountProductItem() {
      this.amountChange(this.amountProductItem);
    },
  },
};
</script>
