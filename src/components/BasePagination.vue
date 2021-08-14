<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        href="#"
        :class="{ 'pagination__link--disabled': page === 1 }"
        aria-label="Предыдущая страница"
        @click.prevent="paginatePrev(page)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNum in pages" :key="pageNum">
      <a
        href="#"
        class="pagination__link"
        :class="{
          'pagination__link--current': pageNum === page,
        }"
        @click.prevent="pagination(pageNum)"
      >
        {{ pageNum }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page === pages }"
        href="#"
        aria-label="Следующая страница"
        @click.prevent="paginateNext(page)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["page", "count", "perPage"],

  methods: {
    pagination(page) {
      this.$emit("update:page", page);
    },
    paginateNext(page) {
      page < this.pages ? page++ : page;
      this.$emit("update:page", page);
    },
    paginatePrev(page) {
      page !== 1 ? page-- : page;
      this.$emit("update:page", page);
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
};
</script>
