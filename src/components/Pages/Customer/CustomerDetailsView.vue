<template>
  <section >
    <div v-if="customer" class="container">
      
    </div>
    <div v-else class="container loading-wrapper">
       <loading-spinner></loading-spinner>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      customer: null,
      editMode: false,
    };
  },

  async beforeMount() {
    this.customer = await this.$store.dispatch(
      "customer/getCustomerById",
      this.$route.params.id
    );
    this.customer.sales = await this.$store.dispatch(
      "sale/getSalesByCustomerId",
      {
        cust_id: this.$route.params.id,
        limit: 5,
      }
    );
  },

  methods: {
    triggerDeleteCustomer() {
      this.$store.commit("customer/setCustomerIdToDelete", this.customer.id);
      this.$store.commit("setActivePopup", "popup-delete-customer");
    },
    async triggerUpdateCustomer() {
      var res = await this.$store.dispatch(
        "customer/updateCustomer",
        this.customer
      );
      if (res) {
        this.$store.commit("showSnackBar", "Successfully updated.");
      } else {
        this.$store.commit(
          "showSnackBar",
          "Unable to update the customer record"
        );
      }
    },
    toggleEditMode() {
      if (this.editMode) {
        this.triggerUpdateCustomer();
      }
      this.editMode = !this.editMode;
    },
  },
};
</script>

<style lang="scss" scoped>

.loading-wrapper{
  height: calc(100vh - 120px);
  display:flex;
  align-items: center;
  justify-content: center;
}

</style>