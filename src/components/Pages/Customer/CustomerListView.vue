<template>
  <section>
    <div class="flex">
      <search-bar @typing="searchCustomer" :placeHolder="'Search Customer by Name, Phone Number, ...'"></search-bar>
      <div class="flex button-container">
        <the-button :label="'New Customer'"  @click="triggerCreateCustomer"></the-button>
      </div>
    </div>
    <hr />
    <div class="content-wrapper">
      <div v-for="customer in filteredCustomerList" :key="customer.customerId">
        <router-link :to="'/customers/'+customer.id">
          <customer-card :customer="customer"></customer-card>
        </router-link>
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
  },
  methods: {
    searchCustomer(str) {
      this.searchKeyword = str;
    },
    triggerCreateCustomer(){
      this.$store.commit("setActivePopup", "popup-new-customer");
    }
  },
  data() {
    return {
      searchKeyword: "",
    };
  },
  async mounted() {
    await this.$store.dispatch("customer/getCustomerList");
  },
  
};
</script>

<style lang="scss" scoped>

.button-container {
  div {
    margin-left: 10px;
  }
}

.content-wrapper {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 280px));
  justify-content: space-evenly;
}

</style>