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
        <the-button label="Update" @click="triggerUpdateCustomer"></the-button>
        <the-button label="Delete" color="red" @click="triggerDeleteCustomer"></the-button>
      </div>
    </div>
    <hr />
    <div class="person-details">
      <table>
        <col span="1" style="width: 50%;" />
        <col span="1" style="width: 50%;" />
        <tr>
          <td>Name</td>
          <td>
            <input type="text" v-model="customer.customerName" />
          </td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>
            <input type="text" v-model="customer.customerPhoneNumber" />
          </td>
        </tr>
        <tr>
          <td>Address</td>
          <td>
            <input type="text" v-model="customer.fullAddress" v-if="customer.customerDoorNumber" />
            <p v-else>Not Available</p>
          </td>
        </tr>
        <tr>
          <td>Credits</td>
          <td>
            <p>{{customer.customerCreditPoint}}</p>
          </td>
        </tr>
        <tr>
          <td>Unpaid Balance</td>
          <td>
            <p>₹ {{customer.customerUnpaidBalance}}</p>
          </td>
        </tr>
        <tr>
          <td>Joined on</td>
          <td>
            <p>{{customer.createdAt}}</p>
          </td>
        </tr>
      </table>
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
      console.log(this.customer);
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
}

.back-button {
  justify-content: center;
  align-items: center;
  display: flex;
}

.person-details {

  padding: 10px 20px;
  background: var(--gray0);
  width: 300px;
  border-radius: 5px;
  font-family: var(--font-regular);
  font-size: 14px;

  input {
    font-family: var(--font-regular);
    border: none;
  }

  tr {
    td:first-child {
      font-family: var(--font-semibold);
      font-size: 14px;
    }
  }

  td {
    padding-top: 10px;
    padding-bottom: 10px;
  }

}
</style>