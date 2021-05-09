<template>
  <the-popup :open="open" @close="close">
    <template #header>
      <div>
        <h2>Add New Customer</h2>
      </div>
    </template>
    <template #content>
      <div class="flex input-container">
        <input type="text" placeholder="Name" v-model="customer.customerName" />
        <input type="number" placeholder="Phone" v-model="customer.customerPhoneNumber" />
        <input type="text" placeholder="Door No" v-model="customer.customerDoorNumber" />
        <input type="text" placeholder="Street" v-model="customer.customerStreetName" />
        <input type="text" placeholder="City" v-model="customer.customerCityName" />
        <input type="number" placeholder="Pincode" v-model="customer.customerPincode" max="6"/>
        <p class="error-text" v-if="errorFlag">{{errorMessage}}</p>
      </div>
    </template>
    <template #actions>
      <div class="flex button-container">
        <the-button label="Cancel" color="red" @click="close"></the-button>
        <the-button label="Create" @click="validateNewCustomer"></the-button>
      </div>
    </template>
  </the-popup>
</template>

<script>
export default {
  props: ["open"],
  emits: ["close"],
  data() {
    return {
      customer: {
        customerName: null,
        customerPhoneNumber: null,
        customerCreditPoint: 0,
        customerUnpaidBalance: 0.0,
        customerDoorNumber: null,
        customerStreetName: null,
        customerCityName: null,
        customerPincode: null,
      },
      errorFlag: false,
      errorMessage: "Please atleast fill customer name and phone number",
    };
  },
  methods: {
    close() {
      this.customer.customerName = "";
      this.customer.customerPhoneNumber = "";
      this.errorFlag = false;
      this.$emit("close");
    },
    validateNewCustomer() {
      if (
        this.customer.customerName.trim() === "" ||
        this.customer.customerPhoneNumber.trim() === ""
      ) {
        this.errorFlag = true;
        this.errorMessage = "Please fill customer name and phone number";
      } else if (this.customer.customerPhoneNumber.trim().length !== 10) {
        this.errorFlag = true;
        this.errorMessage = "Please, Enter valid Phone Number";
      } else {
        this.errorFlag = false;
        this.createNewCustomer();
      }
    },
    async createNewCustomer() {
      var res = await this.$store.dispatch(
        "customer/postCustomer",
        this.customer
      );
      if (!res) {
        this.errorFlag = true;
        this.errorMessage = "Phone Number already exist";
      } else {
        this.customer.customerName = "";
        this.customer.customerPhoneNumber = "";
        this.customer.customerCreditPoint = 0;
        this.customer.customerUnpaidBalance = 0.0;
        this.customer.customerDoorNumber = "";
        this.customer.customerStreetName = "";
        this.customer.customerCityName = "";
        this.customer.customerPincode = null;
        this.close();
      }
    },
  },
  async updated(){
    await this.$store.dispatch("customer/getCustomerList");
  }
};
</script>

<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

h2 {
  font-family: var(--font-semibold);
}

.error-text {
  color: var(--red);
  font-family: var(--font-medium);
  font-size: 12px;
  margin-bottom: 15px;
}

.input-container {
  flex-direction: column;
  margin-top: 15px;

  input {
    margin-bottom: 20px;
    padding: 8px 10px;
    border-radius: 4px;
    border: 2px solid var(--gray2);
    font-family: var(--font-regular);
    width: 320px;

    &:focus {
      border: 2px solid var(--blue);
      outline: none;
    }
  }
}
.button-container {
  width: 100%;
  margin-top: 5px;

  div {
    width: 100%;

    &:last-child {
      margin-left: 15px;
    }
  }
}
</style>