<template>
  <section>
    <div class="flex">
      <router-link to="/customers">
        <the-button label="Back"></the-button>
      </router-link>
      <div class="flex button-container" v-if="!isLoading && !isSuccess && !isListEmpty">
        <the-button label="Update"></the-button>
        <the-button label="Delete" color="red"></the-button>
      </div>
    </div>
    <customer-card :customer="customer" v-if="customer"></customer-card>
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
};
</script>

<style lang="scss" scoped>
.flex {
  justify-content: space-between;
  margin-bottom: 10px;
}

.button-container {
  div {
    margin-left: 10px;
  }
}
</style>