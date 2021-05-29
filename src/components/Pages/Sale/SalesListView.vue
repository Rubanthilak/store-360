<template>
  <section class="container">
    <div class="flex">
      <search-bar :placeHolder="'Search Sale by Customer Phone, Invoice Number, ...'" @typing="searchProduct"></search-bar>
    </div>
    <hr />
    <div class="sales-list">
      <sale-card v-for="sale in salesList" :key="sale.id" :sale="sale"></sale-card>
    </div>
    <!-- <div class="paginator">
      <div class="page-link">&lt;</div>
      <div class="page-link">1</div>
      <div class="page-link">2</div>
      <div class="page-link">3</div>...
      <div class="page-link">6</div>
      <div class="page-link">&gt;</div>
    </div> -->
  </section>
</template>

<script>
export default {
  data(){
    return {
       searchKeyword: null
    }
  },
  computed: {
    salesList() {
      return this.$store.getters["sale/getSales"];
    },
  },
  methods: {
    searchProduct(str) {
      this.searchKeyword = str;
    },
  },
  async mounted(){
    await this.$store.dispatch("sale/getSalesList");
  }
};
</script>

<style scoped lang="scss">

/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--gray2);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--gray3);
}

.sales-list {
  margin-top: 15px;
  height: calc(100vh - 120px);
  overflow: auto;
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, 300px);
  justify-content: space-evenly;
}

.paginator {
  display: flex;
  margin: 15px auto;
  gap: 1rem;
  justify-content:center;
  align-items: center;

  .page-link {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 60px;
    border-radius: 4px;
    background: var(--gray0);
    font-family: var(--font-semibold);
    cursor: pointer;
    font-size: 12px;
    transition: all 0.3s smooth;

    &:hover {
      background: var(--blue);
      color: var(--gray0);
    }
  }
}
</style>