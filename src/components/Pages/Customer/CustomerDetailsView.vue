<template>
  <section v-if="customer" class="container">
    <div class="flex">
      <div class="flex header">
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
    <hr />
    <div class="cust-body">
      <div class="user-summary">
        <div class="title">
          <p>User Summary</p>
        </div>
        <div class="content">
          <div>
            <svg-icon icon="badge-icon" size="24" color="gray3" hover-color="green"></svg-icon>
            <p class="subs">Credit Score</p>
            <p class="value" style="color:var(--green)">{{customer.customerCreditPoint}}</p>
          </div>
          <div>
            <svg-icon icon="wallet-icon" size="24" color="gray3" hover-color="red"></svg-icon>
            <p class="subs">Unpaid Balance</p>
            <p class="value" style="color:var(--red)">₹ {{customer.customerUnpaidBalance}}</p>
          </div>
        </div>
      </div>
      <div class="user-summary">
        <div class="title">
          <p>Contact</p>
        </div>
        <div class="content">
          <div>
            <svg-icon icon="home-icon" size="24" color="gray3" hover-color="blue"></svg-icon>
            <p class="subs">Address</p>
            <p class="value">{{customer.customerCityName}}</p>
          </div>
          <div>
            <svg-icon icon="browser-icon" size="24" color="gray3" hover-color="red"></svg-icon>
            <p class="subs">Phone Number</p>
            <p class="value">{{customer.customerPhoneNumber}}</p>
          </div>
          <div>
            <svg-icon icon="box-icon" size="24" color="gray3" hover-color="blue"></svg-icon>
            <p class="subs">Joined on</p>
            <p class="value">{{customer.createdAt.toDateString()}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="sales-body">
      <div>
        <p>Last Purchases</p>
      </div>
      <div>
        <div v-for="sale in customer.sales" :key="sale.id">
          <p>{{sale.id}}</p>
          <p>{{sale.createdAt}}</p>
          <p>{{sale.paymentMethod}}</p>
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
    };
  },

  async beforeMount() {
    this.customer = await this.$store.dispatch(
      "customer/getCustomerById",
      this.$route.params.id
    );
    this.customer.sales = await this.$store.dispatch("sale/getSalesByCustomerId",{
        cust_id : this.$route.params.id,
        limit : 5
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

.header {
  h1 {
    font-family: var(--font-semibold);
    margin: 0px 10px;
    font-size: 22px;
  }

  p {
    margin: 0px 10px;
    color: var(--gray4);
    font-family: var(--font-light);
  }
}

.back-button {
  justify-content: center;
  align-items: center;
  display: flex;
}

.cust-body {
  margin-top: 25px;
  display: flex;
  gap: 3rem;
}

.user-summary {
  .title {
    p {
      font-family: var(--font-semibold);
      color: var(--gray3);
      margin: 0px;
    }
  }
  .content {
    display: flex;
    gap: 4rem;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.01);
    border-radius: 5px;
    padding: 40px;
    background: var(--gray0);
    margin-top: 15px;
    div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .subs {
      color: var(--gray3);
      font-size: 14px;
    }
    .value {
      font-family: var(--font-semibold);
      font-size: 18px;
    }
  }
}
</style>