<template>
  <section>
    <top-bar>
      <template #default>
        <div class="flex menu-bar">
          <div class="flex header">
            <div class="back-button" @click="$router.replace('/customers/'+ $route.params.id)">
              <svg-icon color="gray8" size="34" icon="back-icon"></svg-icon>
            </div>
            <div>
              <h1>Edit Details</h1>
            </div>
          </div>
          <div class="flex button-container">
            <the-button label="Save" @click="validateInput"></the-button>
          </div>
        </div>
      </template>
    </top-bar>
    <div v-if="isLoading" class="container loading-wrapper">
      <loading-spinner></loading-spinner>
    </div>
    <div v-else class="container wrapper">
      <div class="card">
        <div class="header">
          <h1 class="title">Business Details</h1>
        </div>
        <div class="row">
          <div class="content">
            <div>
              <p class="label">Name</p>
              <input :class="{ error: isError}" type="text" v-model="customer.customerName" />
            </div>
          </div>
          <div class="content">
            <div>
              <p class="label">Credits</p>
              <input type="text" v-model="customer.customerCreditPoint" />
            </div>
          </div>
          <div class="content">
            <div>
              <p class="label">GSTIN Number</p>
              <input type="text" v-model="customer.customerGstinNumber" />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="card">
        <div class="header">
          <h1 class="title">Billing Address</h1>
        </div>
        <div class="row">
          <div class="content">
            <div>
              <p class="label">Door Number</p>
              <input type="text" v-model="customer.customerDoorNumber" />
            </div>
            <div>
              <p class="label">Street Name</p>
              <input type="text" v-model="customer.customerStreetName" />
            </div>
          </div>
          <div class="content">
            <div>
              <p class="label">City Name</p>
              <input type="text" v-model="customer.customerCityName" />
            </div>
            <div>
              <p class="label">State Name</p>
              <input type="text" v-model="customer.customerStateName" />
            </div>
          </div>
          <div class="content">
            <div>
              <p class="label">Pincode</p>
              <input type="text" v-model="customer.customerPincode" />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="card">
        <div class="header">
          <h1 class="title">Shipping Address</h1>
        </div>
        <div class="row">
          <div class="content">
            <div>
              <p class="label">Door Number</p>
              <input type="text" v-model="customer.customerDoorNumber" />
            </div>
            <div>
              <p class="label">Street Name</p>
              <input type="text" v-model="customer.customerStreetName" />
            </div>
          </div>
          <div class="content">
            <div>
              <p class="label">City Name</p>
              <input type="text" v-model="customer.customerCityName" />
            </div>
            <div>
              <p class="label">State Name</p>
              <input type="text" v-model="customer.customerStateName" />
            </div>
          </div>
          <div class="content">
            <div>
              <p class="label">Pincode</p>
              <input type="text" v-model="customer.customerPincode" />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="card">
        <div class="header">
          <h1 class="title">Contact Details</h1>
        </div>
        <div class="row">
          <div class="content">
            <div>
              <p class="label">Phone Number</p>
              <input type="text" v-model="customer.customerPhoneNumber" />
            </div>
          </div>
          <div class="content">
            <div>
              <p class="label">Alternate Phone Number</p>
              <input type="text" v-model="customer.customerPhoneNumber" />
            </div>
          </div>
        </div>
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
      isError: false,
    };
  },
  methods: {
    async validateInput() {
      this.isLoading = true;
      if (
        this.customer.customerName !== null &&
        this.customer.customerCreditPoint !== null &&
        this.customer.customerPhoneNumber !== null
      ) {
        await this.updateCustomerDetails();
      }
      else{
        this.isError = true;
      }
      this.isLoading = false;
    },
    async updateCustomerDetails() {
      await this.$store.dispatch("customer/updateCustomer", this.customer);
      this.$router.replace('/customers/'+ this.$route.params.id);
    },
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
section {
  margin-bottom: 50px;
}

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

.wrapper {
  background: var(--gray0);
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgb(0, 0, 0, 0.1);
  padding: 25px;
  width: calc(90% - 50px);
  min-width: 1150px;
}

.card {
  margin-bottom: 10px;
}

.title {
  font-family: var(--font-semibold);
  font-size: 24px;
  margin-bottom: 10px;
  color: var(--gray6);
}

.row {
  display: flex;
  flex-direction: row;
  gap: 3rem;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .label {
    margin-left: 2px;
    font-family: var(--font-medium);
  }

  input {
    padding: 8px 10px;
    border-radius: 5px;
    border: 2px solid var(--gray0);
    box-shadow: inset 0px 0px 25px rgb(0, 0, 0, 0.05);
    font-family: var(--font-regular);
    background: var(--gray1);
    width: 320px;

    &:focus {
      border: 2px solid var(--blue);
      outline: none;
      background: var(--gray0);
      box-shadow: none;
    }

    &.error{
      border: 2px solid var(--red);
    }
  }
}
</style>