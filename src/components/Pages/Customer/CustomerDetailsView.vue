<template>
  <section v-if="customer">
    <div class="flex">
      <div class="flex">
        <router-link to="/customers">
          <div class="back-button">
            <back-icon color="gray8" size="34"></back-icon>
          </div>
        </router-link>
        <h1>{{customer.customerName}}</h1>
      </div>
      <div class="flex button-container">
        <the-button label="Update"></the-button>
        <the-button label="Delete" color="red" @click="triggerDeleteCustomer"></the-button>
      </div>
    </div>
    <hr />
    <customer-card :customer="customer"></customer-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      customer: null,
    };
  },

  async beforeMount() {
    this.customer = await this.$store.dispatch(
      "customer/getCustomerById",
      this.$route.params.id
    );
  },

  methods: {
    triggerDeleteCustomer() {
      this.$store.commit("customer/setCustomerIdToDelete", this.customer.id);
      this.$store.commit("setActivePopup", "popup-delete-customer");
    },
  },
};
</script>

<style lang="scss" scoped>
.flex {
  justify-content: space-between;
  align-items: center;
}

.button-container {
  div {
    margin-left: 10px;
  }
}

h1 {
  font-family: var(--font-semibold);
  margin: 0px 10px;
}

.back-button {
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>