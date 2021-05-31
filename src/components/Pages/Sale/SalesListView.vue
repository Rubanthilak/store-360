<template>
  <section class="container">
    <div class="flex menubar">
      <search-bar
        :placeHolder="'Search Sale by Customer Phone, Invoice Number, ...'"
        @typing="searchProduct"
      ></search-bar>
    </div>
    <hr />
    <div class="content">
      <div class="sales-list">
        <sale-card v-for="sale in salesList" :key="sale.id" :sale="sale"></sale-card>
      </div>
      <div class="paginator">
        <div class="page-link" @click="prevPage" v-if="showPrevButton">&lt; Prev</div>
        <div class="page-link" @click="nextPage" v-if="showNextButton">Next &gt;</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      searchKeyword: null,
      pageNumber: 0,
    };
  },
  computed: {
    salesList() {
      return this.$store.getters["sale/getSales"];
    },
    showPrevButton() {
      if (this.pageNumber == 0) {
        return false;
      }
      return true;
    },
    showNextButton() {
      let totalSale = this.$store.getters["sale/getTotalSaleCount"];
      let res = Math.ceil(totalSale / 25);
      if (this.pageNumber == res - 1) {
        return false;
      }
      return true;
    },
  },
  methods: {
    searchProduct(str) {
      this.searchKeyword = str;
    },
    async nextPage() {
      this.pageNumber++;
      await this.$store.dispatch("sale/getSalesList", this.pageNumber);
    },
    async prevPage() {
      this.pageNumber--;
      await this.$store.dispatch("sale/getSalesList", this.pageNumber);
    },
  },
  async mounted() {
    await this.$store.dispatch("sale/getSalesList");
  },
};
</script>

<style scoped lang="scss">

hr{
  margin-bottom: 0px;
}

.content{
  height: calc(100vh - 100px);
  overflow: auto;
}

.sales-list {
  margin-top: 15px;
  // height: calc(100vh - 180px);
  // overflow: auto;
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, 300px);
  justify-content: space-evenly;
}

.paginator {
  display: flex;
  margin: 25px 15px 25px 15px;
  gap: 1rem;
  justify-content: flex-end;
  align-items: center;

  .page-link {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 80px;
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