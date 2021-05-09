<template>
  <section v-if="customer" class="container">
    <div class="flex">
      <div class="flex">
        <router-link to="/customers">
          <div class="back-button">
            <svg-icon color="gray8" size="34" icon="back-icon"></svg-icon>
          </div>
        </router-link>
        <div>
          <h1>{{customer.customerName}}</h1>
          <p>{{customer.customerPhoneNumber}}</p>
        </div>
      </div>
      <div class="flex button-container">
        <the-button label="Edit User" @click="triggerUpdateCustomer"></the-button>
        <icon-button icon="delete-icon" background-color="red" @click="triggerDeleteCustomer"></icon-button>
      </div>
    </div>
    <hr/>
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
    async triggerUpdateCustomer() {
      var res = await this.$store.dispatch("customer/updateCustomer",this.customer);
      if(res){
        this.$store.commit("showSnackBar", "Successfully updated.");
      }
      else {
        this.$store.commit("showSnackBar", "Unable to update the customer record");
      }
    }
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
  font-size: 22px;
}

p{
  margin: 0px 10px;
  color: var(--gray4);
  font-family: var(--font-light);
}

.back-button {
  justify-content: center;
  align-items: center;
  display: flex;
}

</style>