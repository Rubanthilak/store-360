<template>
  <section class="container">
    <top-bar>
      <template #default>
        <div class="flex menu-bar">
          <search-bar
            @typing="searchCustomer"
            :placeHolder="'Search Customer by Name, Phone Number, ...'"
          ></search-bar>
          <div class="flex button-container">
            <list-box-customer-sort
              @selected="sortCustomerList"
            ></list-box-customer-sort>
            <tool-tip label="New Customer">
              <svg-icon
                icon="plus-icon"
                color="gray2"
                hover-color="blue"
                size="24"
                @click="triggerCreateCustomer"
              ></svg-icon>
            </tool-tip>
          </div>
        </div>
      </template>
    </top-bar>
    <div class="content-section">
      <div class="content-wrapper" ref="content">
        <div
          v-for="customer in filteredCustomerList"
          :key="customer.customerId"
        >
          <router-link :to="'/customers/' + customer.id">
            <customer-card :customer="customer"></customer-card>
          </router-link>
        </div>
      </div>
      <div class="paginator">
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
  computed: {
    customerList() {
      return this.$store.getters["customer/getCustomers"];
    },
    filteredCustomerList() {
      return this.customerList.filter((customer) => {
        return (
          customer.customerName
            .toLowerCase()
            .includes(this.searchKeyword.toLowerCase()) ||
          customer.customerPhoneNumber
            .toString()
            .toLowerCase()
            .includes(this.searchKeyword.toLowerCase())
        );
      });
    },
    showPrevButton() {
      if (this.pageNumber == 0) {
        return false;
      }
      return true;
    },
    showNextButton() {
      let totalSale = this.$store.getters["customer/getTotalCustomerCount"];
      let res = Math.ceil(totalSale / 50);
      if (this.pageNumber == res - 1 || this.searchKeyword !== "") {
        return false;
      }
      return true;
    },
  },
  methods: {
    async nextPage() {
      this.pageNumber++;
      await this.$store.dispatch("customer/getCustomerList", {
        columnToSort: this.sortOrder,
        offset: this.pageNumber,
        limit: 50,
      });
      this.$refs.content.scrollTo(0, 0);
    },
    async prevPage() {
      this.pageNumber--;
      await this.$store.dispatch("customer/getCustomerList", {
        columnToSort: this.sortOrder,
        offset: this.pageNumber,
        limit: 50,
      });
      this.$refs.content.scrollTo(0, 0);
    },
    async searchCustomer(str) {
      if (str !== "") {
        await this.$store.dispatch("customer/getCustomerList", {
          limit: null,
        });
      } else {
        await this.$store.dispatch("customer/getCustomerList", {
          columnToSort: this.sortOrder,
          offset: this.pageNumber,
          limit: 50,
        });
      }
      this.searchKeyword = str;
    },
    triggerCreateCustomer() {
      this.$store.commit("setActivePopup", "popup-new-customer");
    },
    async sortCustomerList(obj) {
      this.sortOrder = obj.value;
      await this.$store.dispatch("customer/getCustomerList", {
        columnToSort: this.sortOrder,
        offset: this.pageNumber,
        limit: 50,
      });
    },
  },
  data() {
    return {
      searchKeyword: "",
      pageNumber: 0,
      sortOrder: "customerName",
    };
  },
  async mounted() {
    await this.$store.dispatch("customer/getCustomerList", {
      columnToSort: this.sortOrder,
      offset: this.pageNumber,
      limit: 50,
    });
  },
};
</script>

<style lang="scss" scoped>
.menu-bar {
  gap: 1rem;
  align-items:center;
}

.button-container {
  gap: 0.5rem;
  align-items:center;

  svg {
    padding: 6px;
    border-radius: 5px;
    transition: all 0.3s;
    &:hover {
      background: var(--gray1);
      box-shadow: inset 0px 0px 15px rgb(0, 0, 0, 0.05);
    }
  }
}

hr {
  margin-bottom: 0px;
}

.content-section {
  max-height: calc(100vh - 100px);
  overflow: auto;
}

.content-wrapper {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, 280px);
  justify-content: space-evenly;
  padding-top: 15px;
}

.paginator {
  padding: 50px 15px;
  gap: 1rem;
  width: calc(100% - 30px);

  .page-link {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
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