<template>
  <section>
    <top-bar>
      <template #default>
        <div class="flex menu-bar">
          <search-bar
            :placeHolder="'Search Sale by Invoice Number, ...'"
            @typing="searchProduct"
          ></search-bar>
          <div class="flex button-container">
            <list-box-sale-sort
              :sortOrder="sortOrder"
              @selected="changeSortOrder"
            ></list-box-sale-sort>
            <date-picker @pick="dateFilter"></date-picker>
          </div>
        </div>
      </template>
    </top-bar>
    <div ref="content" class="content" v-if="salesList.length > 0">
      <div class="sales-list container">
        <sale-card
          v-for="sale in salesList"
          :key="sale.id"
          :sale="sale"
        ></sale-card>
      </div>
      <div class="paginator container">
        <div class="page-link prev" @click="prevPage" v-show="showPrevButton">
          &lt; Prev
        </div>
        <div class="page-link next" @click="nextPage" v-show="showNextButton">
          Next &gt;
        </div>
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
      invoiceDate: null,
      sortOrder: { index: 1, value: "DESC" },
    };
  },
  computed: {
    salesList() {
      console.log(this.$store.getters["sale/getSales"]);
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
    async changeSortOrder(index) {
      this.sortOrder = index;
      await this.$store.dispatch("sale/getSalesList", {
        date: this.invoiceDate,
        order: this.sortOrder.value,
      });
    },
    async searchProduct(id) {
      if (id !== "") {
        var sale = await this.$store.dispatch("sale/getSalesById", id);
        if (sale !== null) {
          this.$store.commit("sale/setSaleList", [sale]);
          this.$store.commit("sale/setTotalSaleCount", 1);
        } else {
          this.$store.commit("sale/setSaleList", []);
          this.$store.commit("sale/setTotalSaleCount", 1);
        }
      } else {
        await this.$store.dispatch("sale/getSalesList", {
          date: this.invoiceDate,
          order: this.sortOrder.value,
        });
        this.pageNumber = 0;
      }
    },
    async nextPage() {
      this.pageNumber++;
      await this.$store.dispatch("sale/getSalesList", {
        offset: this.pageNumber,
        date: this.invoiceDate,
        order: this.sortOrder.value,
      });
      this.$refs.content.scrollTo(0, 0);
    },
    async prevPage() {
      this.pageNumber--;
      await this.$store.dispatch("sale/getSalesList", {
        offset: this.pageNumber,
        date: this.invoiceDate,
        order: this.sortOrder.value,
      });
      this.$refs.content.scrollTo(0, 0);
    },
    async dateFilter(date) {
      this.invoiceDate = date;
      await this.$store.dispatch("sale/getSalesList", {
        date: this.invoiceDate,
        order: this.sortOrder.value,
      });
      this.pageNumber = 0;
      this.$refs.content.scrollTo(0, 0);
    },
  },
  async mounted() {
    await this.$store.dispatch("sale/getSalesList", {
      offset: this.pageNumber,
      date: this.invoiceDate,
      order: this.sortOrder.value,
    });
  },
};
</script>

<style scoped lang="scss">
section{
  padding: 0px !important;
}
.menu-bar{
  gap:1rem;
  align-items:center;
  justify-content: center;
}

.button-container {
  gap: 1rem;
  align-items:center;
  justify-content: center;
}

hr {
  margin-bottom: 0px;
}

.content {
  height: calc(100vh - 100px);
  overflow:auto;
  padding-top:25px;
}

.sales-list {
  // height: calc(100vh - 180px);
  // overflow: auto;
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fill, 300px);
  justify-content: space-evenly;
}

.paginator {
  padding: 25px 15px;
  gap: 1rem;
  width: calc(100% - 30px);

  .page-link {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
    height: 40px;
    width: 80px;
    border-radius: 4px;
    background: var(--gray0);
    font-family: var(--font-semibold);
    cursor: pointer;
    font-size: 12px;
    transition: all 0.3s smooth;

    &.prev {
      float: left;
    }

    &.next {
      float: right;
    }

    &:hover {
      background: var(--blue);
      color: var(--gray0);
    }
  }
}
</style>