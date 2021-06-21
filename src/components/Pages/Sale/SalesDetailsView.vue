<template>
  <section class="container" v-if="sale">
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
        <the-button label="Add Payment" color="green"></the-button>
        <router-link :to="'/sales/' + sale.id + '/print'">
          <the-button label="Print Invoice"></the-button>
        </router-link>
      </div>
    </div>
    <hr />
    <div v-if="customer" class="content-wrapper">
      <div>
        <div class="title">
          <p>BILL SUMMARY</p>
        </div>
        <div class="bill-card">
          <div class="header tile">
            <p style="text-align: right">S.NO</p>
            <p style="text-align: left">ITEM</p>
            <p style="text-align: right">PRICE/UNIT</p>
            <p style="text-align: right">UNIT</p>
            <p style="text-align: right">PRICE</p>
            <p style="text-align: right">GST</p>
            <p style="text-align: right">GST (in ₹)</p>
            <p style="text-align: right">TOTAL</p>
          </div>
          <hr />
          <div style="min-height: 65vh">
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
              <p style="text-align: right">
                {{ product.productTotalAmount.toFixed(2) }}
              </p>
            </div>
          </div>
          <hr />
          <div class="header tile">
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
        <div>
          <div class="title">
            <p>CUSTOMER</p>
          </div>
          <router-link :to="'/customers/' + customer.id">
            <customer-card :customer="customer"></customer-card>
          </router-link>
        </div>
        <div>
          <div class="title">
            <p>PAYMENT SUMMARY</p>
          </div>
          <div class="pay-card">
            <div>
              <p>Purchase Date</p>
              <p>{{ sale.createdAt.toDateString().substring(4,) }}</p>
            </div>
            <div v-if="sale.totalAmountPaid < sale.totalPrice">
              <p>Balance</p>
              <p style="color: var(--red)">
                ₹ {{ (sale.totalPrice - sale.totalAmountPaid).toFixed(2) }}
              </p>
            </div>
            <div v-else>
              <p>Status</p>
              <p style="color: var(--green)">Success</p>
            </div>
          </div>
        </div>
        <div>
           <div class="title">
              <p>PAYMENT HISTORY</p>
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
      sale: null,
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
};
</script>

<style lang="scss" scoped>
.menubar {
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

.title {
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
  p {
    font-family: var(--font-semibold);
    color: var(--gray3);
    margin: 0px;
  }
}

.content-wrapper{
  display:grid;
  grid-template-columns: auto 280px;
  gap:2.5rem
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
  }

  .header {
    p {
      font-family: var(--font-semibold);
      text-align: center;
      margin: 0px;
    }
  }
}

.pay-card {
  display: flex;
  align-items: center;
  gap: 3rem;
  background: var(--gray0);
  height: 100px;
  box-shadow: 0px 5px 15px #7070700c;
  width: 220px;
  border-radius: 6px;
  padding: 0px 30px;

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
</style>