<template>
  <section class="container" v-if="sale">
    <top-bar>
      <template #default>
        <div class="flex menubar">
          <div class="flex header">
            <router-link to="/sales">
              <div class="back-button">
                <svg-icon color="gray8" size="34" icon="back-icon"></svg-icon>
              </div>
            </router-link>
            <div>
              <h1>Invoice {{ sale.id }}</h1>
            </div>
          </div>
          <div class="flex button-container">
            <router-link :to="'/sales/' + sale.id + '/print'">
              <tool-tip label="Print Invoice">
                <svg-icon class="print-btn" icon="print-icon" color="gray2" hover-color="blue" size="24"  ></svg-icon>
              </tool-tip>
            </router-link>
          </div>
        </div>
      </template>
    </top-bar>
    <popup-new-payment
      :open="showAddPayment"
      @close="toggleAddPaymentPopup"
      :id="sale.id"
      :unpaidBalance="sale.totalPrice - sale.totalAmountPaid"
      :customer-id="customerId"
    ></popup-new-payment>
    <div v-if="customer" class="content-wrapper">
      <div>
        <div class="bill-card">
          <div class="header tile">
            <p style="text-align: right;">S.No</p>
            <p style="text-align: left">Item</p>
            <p style="text-align: right">Price/Unit</p>
            <p style="text-align: right">Unit</p>
            <p style="text-align: right">Price</p>
            <p style="text-align: right">GST</p>
            <p style="text-align: right">GST (in ₹)</p>
            <p style="text-align: right;padding-right:10px;">Total</p>
          </div>
          <div style="min-height: 75vh">
            <div
              class="tile"
              v-for="(product, index) in productList"
              :key="product.id"
            >
              <p style="text-align: right">{{ index + 1 }}</p>
              <p>{{ product.productName }}</p>
              <p style="text-align: right">{{ product.productPrice }}</p>
              <p style="text-align: right">{{ product.productCount }}</p>
              <p style="text-align: right">
                {{ product.productTotalPrice.toFixed(2) }}
              </p>
              <p style="text-align: right">
                {{ product.productTaxPercentage }}%
              </p>
              <p style="text-align: right">
                {{ product.productTotalTax.toFixed(2) }}
              </p>
              <p style="text-align: right;padding-right:10px;">
                {{ product.productTotalAmount.toFixed(2) }}
              </p>
            </div>
          </div>
          <hr />
          <div class="tile">
            <p style="text-align: right"></p>
            <p style="text-align: left">TOTAL</p>
            <p style="text-align: right"></p>
            <p style="text-align: right"></p>
            <p style="text-align: right"></p>
            <p style="text-align: right"></p>
            <p style="text-align: right"></p>
            <p style="text-align: right">₹ {{ sale.totalPrice.toFixed(2) }}</p>
          </div>
        </div>
      </div>
      <div class="flex" style="flex-direction: column">
        <div class="card">
          <div class="title">
            <p>Customer</p>
          </div>
          <router-link :to="'/customers/' + customer.id">
            <div class="cust">
              <div class="avatar">{{ customer.customerName[0] }}</div>
              <div class="details">
                <p class="name">{{ customer.customerName }}</p>
                <p class="phone">{{ customer.customerPhoneNumber }}</p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="card">
          <div class="title">
            <p>Payment Summary</p>
          </div>
          <div class="pay-card">
            <div>
              <p>Purchase Date</p>
              <p>{{ sale.createdAt.toDateString().substring(4) }}</p>
            </div>
            <div v-if="sale.totalAmountPaid < sale.totalPrice" class="flex" style="width:100%;justify-content:space-between;height:34px;align-items:center;">
              <div>
                <p>Balance</p>
                <p style="color: var(--red)">
                  ₹ {{ (sale.totalPrice - sale.totalAmountPaid).toFixed(2) }}
                </p>
              </div>
               <flow-button label="Pay Balance"
                @click="toggleAddPaymentPopup"
              v-if="sale.totalAmountPaid < sale.totalPrice"
              >
              <svg-icon icon="plus-icon" color="gray0" size="24"></svg-icon>
            </flow-button>
            </div>
            <div v-else>
              <p>Status</p>
              <p style="color: var(--green)">Success</p>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="title">
            <p>Payment History</p>
          </div>
          <div class="pay-list">
            <div
              class="flex pay-tile"
              v-for="payment in sale.payments"
              :key="payment.id"
            >
              <div>
                <p class="method">{{ payment.paymentMethod }} Payment</p>
                <p class="date">{{ payment.dateOfTransaction }}</p>
              </div>
              <p class="amount">₹ {{ payment.amountPaid.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PopupNewPayment from "../../UI/Popups/PopupNewPayment.vue";
export default {
  components: {
    PopupNewPayment,
  },
  data() {
    return {
      sale: null,
      showAddPayment: false,
      customer: null,
    };
  },
  computed: {
    productList() {
      let tempList = [];
      this.sale.productList.forEach((product) => {
        let temp = {};
        temp.id = product.id;
        temp.productName = product.productName;
        temp.productPrice =
          product.productSellingPrice.rupee +
          "." +
          product.productSellingPrice.paisa;
        temp.productTaxPercentage = product.productTaxPercentage;
        temp.productCount = product.productCount;
        temp.productTotalPrice =
          parseFloat(temp.productPrice) * parseFloat(temp.productCount);
        temp.productTotalTax =
          (parseFloat(temp.productTotalPrice) *
            parseFloat(temp.productTaxPercentage)) /
          100;
        temp.productTotalAmount =
          parseFloat(temp.productTotalPrice) + parseFloat(temp.productTotalTax);
        tempList.push(temp);
      });
      return tempList;
    },
    customerId(){
      if(this.customer === null){
        return '';
      }
      return this.customer.id;
    }
  },
  methods: {
    toggleAddPaymentPopup() {
      this.showAddPayment = !this.showAddPayment;
    },
  },
  async mounted() {
    this.sale = await this.$store.dispatch(
      "sale/getSalesById",
      this.$route.params.id
    );
    this.customer = await this.$store.dispatch(
      "customer/getCustomerById",
      this.sale.customerId
    );
  },
  async updated() {
    this.sale = await this.$store.dispatch(
      "sale/getSalesById",
      this.$route.params.id
    );
  },
};
</script>

<style lang="scss" scoped>

section {
  padding-top: 10px !important;
}

.print-btn{
  margin-top: 6px;
  padding: 6px 8px;
  border-radius: 5px;

  &:hover{
    background: var(--gray1);
  }
}

.menubar {
  justify-content: space-between;
  align-items: center;
}

.button-container {
  align-items: center;
  gap: 0.25rem;
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

.card {
  background: white;
  padding: 20px;
  width: calc(100% - 40px);
  margin-bottom: 25px;
  border-radius: 6px;
}

.title {
  p {
    background: var(--gray1);
    font-family: var(--font-bold);
    padding: 8px 10px;
    font-size: 14px;
    border-radius: 4px;
  }
}

.content-wrapper {
  display: grid;
  grid-template-columns: auto 350px;
  gap: 20px;
}

.bill-card {
  background: var(--gray0);
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0px 5px 15px #7070700c;
  width: calc(100%-40px);
  overflow: hidden;

  hr {
    margin: 5px 0px;
  }

  .tile {
    display: grid;
    grid-template-columns: 45px auto 100px 70px 100px 60px 100px 100px;
    width: 100%;
    gap: 1rem;
    padding: 5px 0px;
  }

  .header {
    background: var(--gray1);
    border-radius: 5px;

    p {
      font-family: var(--font-semibold);
      text-align: center;
      margin: 0px;
    }
  }
}

.pay-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  background: var(--gray0);
  margin-top: 20px;
  margin-left: 5px;
  flex-direction: column;

  div {
    p {
      &:first-child {
        font-size: 14px;
        font-family: var(--font-regular);
        color: var(--gray3);
      }
      &:last-child {
        font-size: 16px;
        font-family: var(--font-semibold);
        color: var(--gray6);
      }
    }
  }
}

.cust {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 20px;
  margin-left: 5px;

  .avatar {
    height: 50px;
    width: 50px;
    background: var(--blue);
    color: var(--gray0);
    border-radius: 360px;
    font-size: 32px;
    font-family: var(--font-semibold);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .details {
    .name {
      font-family: var(--font-semibold);
    }
    .phone {
      color: var(--gray3);
    }
  }
}

.pay-list {
  .pay-tile {
    justify-content: space-between;
    margin-top: 20px;
    margin-left: 5px;
    margin-right: 5px;
    align-items: center;

    .method {
      font-family: var(--font-semibold);
    }
    .date {
      font-family: var(--font-light);
      color: var(--gray3);
      font-size: 14px;
    }
    .amount {
      font-family: var(--font-semibold);
      color: var(--green);
      font-size: 18px;
    }
  }
}
</style>