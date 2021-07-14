<template>
  <section>
      <top-bar>
      <template #default>
        <div class="flex menu-bar">
          <div class="flex header">
            <div class="back-button" @click="$router.go(-1)">
              <svg-icon color="gray8" size="34" icon="back-icon"></svg-icon>
            </div>
            <div>
              <h1>Edit Details</h1>
            </div>
          </div>
          <div class="flex button-container">
              <the-button label="Save" ></the-button>
          </div>
        </div>
      </template>
    </top-bar>
    <div v-if="isLoading" class="container loading-wrapper">
      <loading-spinner></loading-spinner>
    </div>
    <div v-else class="container">
      <div class="card">
        <div class="header">
          <h1 class="title">Personal Details</h1>
        </div>
        <div class="content">
            <p>Name</p>
            <input type="text" v-model="customer.customerName">
        </div>
      </div>
      <div class="card">
        <div class="header">
          <h1 class="title">Billing Address</h1>
        </div>
        <div class="content"></div>
      </div>
       <div class="card">
        <div class="header">
          <h1 class="title">Shipping Address</h1>
        </div>
        <div class="content"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      customer: null,
      isLoading: false,
    };
  },
  methods: {
      validateInput(){

      },
      updateCustomerDetails(){

      }
  },
  async created() {
    this.isLoading = true;
    this.customer = await this.$store.dispatch(
      "customer/getCustomerById",
      this.$route.params.id
    );
    this.isLoading = false;
  },
};
</script>

<style lang="scss" scoped>

.loading-wrapper {
  height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-bar {
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.back-button {
  cursor: pointer;
  margin-right: 10px;
}

.card{
    background: var(--gray0);
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgb(0,0,0,0.1);
    padding:25px;
    margin-bottom:10px;
}

.title{
    font-family: var(--font-bold);
    font-size: 24px;
}

.content{
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
    padding: 8px 10px;
    border-radius: 5px;
    border: 2px solid var(--gray0);
    box-shadow: inset 0px 0px 25px rgb(0,0,0,0.05);
    font-family: var(--font-regular);
    background: var(--gray1);
    width: 320px;

    &:focus {
      border: 2px solid var(--blue);
      outline: none;
      background: var(--gray0);
    }
  }

}



</style>