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
        </div>
      </div>
      <div class="flex button-container">
        <the-button label="Edit User" @click="triggerUpdateCustomer"></the-button>
        <icon-button icon="delete-icon" background-color="red" @click="triggerDeleteCustomer"></icon-button>
      </div>
    </div>
    <hr/>
    <div>
      <div class="user-summary">
        <div class="title">
          <p>User Summary</p>
        </div>
        <div class="content">
          <div>
            <svg-icon icon="badge-icon" size="24" color="gray3" hover-color="green"></svg-icon>
            <p class="subs">Credit Score</p>
            <p class="value">{{customer.customerCreditPoint}}</p>
          </div>
          <div>
            <svg-icon icon="wallet-icon" size="24" color="gray3" hover-color="red"></svg-icon>
            <p class="subs">Unpaid Balance</p>
            <p class="value">{{customer.customerUnpaidBalance}}</p>
          </div>
          <div>
            <svg-icon icon="box-icon" size="24" color="gray3" hover-color="blue"></svg-icon>
            <p class="subs">Joined on</p>
            <p class="value">{{customer.createdAt}}</p>
          </div>
        </div>
      </div>
      <div class="user-contact">

      </div>
    </div>
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

.user-summary{
  .title{
    p{

    }
  }
  .content{
    display: flex;
  }
}

</style>