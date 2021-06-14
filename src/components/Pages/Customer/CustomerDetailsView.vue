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
          <h1>{{editMode ? "Edit Details" : customer.customerName}}</h1>
        </div>
      </div>
      <div class="flex button-container">
        <the-button :label="editMode ? 'Save' : 'Edit User'" @click="toggleEditMode"></the-button>
        <icon-button
          v-if="editMode"
          icon="delete-icon"
          background-color="red"
          @click="triggerDeleteCustomer"
        ></icon-button>
      </div>
    </div>
    <hr />
    <div class="cust-body" v-if="!editMode">
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
            <p
              class="value"
              style="color:var(--red)"
            >₹ {{customer.customerUnpaidBalance.toFixed(2)}}</p>
          </div>
        </div>
      </div>
      <div class="user-summary">
        <div class="title">
          <p>Contact</p>
        </div>
        <div class="content">
          <div v-if="customer.customerCityName">
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
    <div v-else class="edit-body">
      <div>
        <div class="title">
          <p>User Summary</p>
        </div>
        <div class="edit-card">
          <div class="row">
            <p>Name</p>
            <input type="text" v-model="customer.customerName" />
          </div>
          <div class="row">
            <p>Phone Number</p>
            <input type="text" v-model="customer.customerPhoneNumber" />
          </div>
          <div class="row">
            <p>GSTIN Number</p>
            <input type="text" v-model="customer.customerGstinNumber" />
          </div>
        </div>
      </div>
      <div>
        <div class="title">
          <p>Address</p>
        </div>
        <div class="edit-card">
          <div style="display:flex;flex-direction:row;gap:1.5rem;">
            <div style="display:flex;flex-direction:column;gap:1rem;">
              <div class="row">
                <p>Door Number</p>
                <input type="text" v-model="customer.customerDoorNumber" />
              </div>
              <div class="row">
                <p>Street Name</p>
                <input type="text" v-model="customer.customerStreetName" />
              </div>
              <div class="row">
                <p>City Name</p>
                <input type="text" v-model="customer.customerCityName" />
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:1rem;">
              <div class="row">
                <p>State Name</p>
                <input type="text" v-model="customer.customerStateName" />
              </div>
              <div class="row">
                <p>Pincode</p>
                <input type="text" v-model="customer.customerPincode" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sales-body">
      <div class="title">
        <p>Last Purchases</p>
        <the-button label="View All"></the-button>
      </div>
      <div class="sale-list">
        <div v-for="sale in customer.sales" :key="sale.id" class="sale-tile">
          <p class="bold">Bill Number #{{sale.id}}</p>
          <p>{{sale.createdAt.toDateString()}}</p>
          <p>{{sale.paymentMethod}}</p>
          <p>{{(sale.cashAmount+sale.cardAmount+sale.upiAmount).toFixed(2)}}</p>
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
      if(this.editMode){
        this.triggerUpdateCustomer();
      }
      this.editMode = !this.editMode;
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

.sales-body {
  margin-top: 25px;
}

.title {
  display: flex;
  justify-content: space-between;
  p {
    font-family: var(--font-semibold);
    color: var(--gray3);
    margin: 0px;
  }
}

.user-summary {
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

.sale-list {
  margin-top: 15px;

  .sale-tile {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    justify-content: space-between;
    background: var(--gray0);
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.01);
    margin-bottom: 3px;
    cursor: pointer;

    P {
      font-size: 16px;
      &:nth-last-child(1),
      &:nth-last-child(2) {
        text-align: right;
      }
    }
  }
}

.edit-body {
  display: flex;
  gap: 3rem;
  margin-top: 25px;

  .edit-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: var(--gray0);
    padding: 25px;
    box-shadow: 0px 3px 5px rgb(0, 0, 0, 0.01);
    border-radius: 5px;
    margin-top: 10px;

    .row {
      align-items: center;

      input {
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
  }
}
</style>