<template>
  <section>
    <the-tabs @tab-removed="EmptyCart" @tab-switched="switchActiveCart"></the-tabs>
    <div class="tab-body" v-for="cart in filteredCartList" :key="cart">
      <div class="tab-lhs">
        <div class="flex menu-bar">
          <search-bar-dropdown
            place-holder="Search Items by Name, ID, Barcode"
            @select="addProductToActiveCart"
          ></search-bar-dropdown>
        </div>
        <hr />
        <the-table>
          <template #colgroup>
            <col span="1" style="width: 5%;" />
            <col span="1" style="width: 30%;" />
            <col span="1" style="width: 5%;" />
            <col span="1" style="width: 12%;" />
            <col span="1" style="width: 12%;" />
          </template>
          <template #thead>
            <tr>
              <th v-for="title in columnName" :key="title">{{title}}</th>
            </tr>
          </template>
          <template #tbody>
            <tr v-for="product in cart.productList" :key="product.id">
              <td>{{product.id}}</td>
              <td>{{product.name}}</td>
              <td>{{product.count}}</td>
              <td>{{product.selling_price.rupee+'.'+product.selling_price.paisa}}</td>
              <td
                style="font-family:var(--font-bold)"
              >{{ ((product.selling_price.rupee+'.'+product.selling_price.paisa)*product.count).toFixed(2) }}</td>
            </tr>
          </template>
        </the-table>
      </div>
      <div class="tab-rhs">
        <div class="bill-card">
          <div class="item1">
            <div class="header">
              <p>Customer</p>
            </div>
            <div class="content">
              <div class="cust-wrapper">
                <search-bar-customer
                  place-holder="Search Customer"
                  @select="setCustomerToActiveCart"
                  v-if="cart.customer === null"
                ></search-bar-customer>
                <div class="avatar" v-if="cart.customer">{{cart.customer.customerName[0]}}</div>
                <div class="details" v-if="cart.customer">
                  <p class="name">{{cart.customer.customerName}}</p>
                  <p class="phone">{{cart.customer.customerPhoneNumber}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="item2">
            <div class="header">
              <p>Payment Method</p>
            </div>
            <div class="content">
              <div class="paym-wrapper">
                <list-box
                  @option-selected="setPaymentMethod"
                  valueToDisplay="Select Payment"
                  :options="paymentOptions"
                  :active="cart.paymentMethod.method"
                ></list-box>
                <div class="split-wrapper" v-if="splitPaymentInputVisible">
                  <input type="number" placeholder="Card" />
                  <input type="number" placeholder="Cash" />
                  <input type="number" placeholder="UPI" />
                </div>
              </div>
            </div>
          </div>
          <div class="item3">
            <div class="header">
              <p>Bill Summary</p>
            </div>
            <div class="content">
              <div class="summ-wrapper">
                <div class="flex">
                  <p>Subtotal</p>
                  <p>{{totalPrice.toFixed(2)}}</p>
                </div>
                <div class="flex">
                  <p>State GST</p>
                  <p>{{sgstAmount.toFixed(2)}}</p>
                </div>
                <div class="flex">
                  <p>Central GST</p>
                  <p>{{cgstAmount.toFixed(2)}}</p>
                </div>
                <div class="flex">
                  <p>Total</p>
                  <p class="total">₹ {{billAmount.toFixed(2)}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <the-button label="Checkout" color="green"></the-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch("product/getProductList");
    await this.$store.dispatch("customer/getCustomerList");
  },
  data() {
    return {
      cartList: [
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: null,
          },
          customer: null,
        },
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: null,
          },
          customer: null,
        },
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: null,
          },
          customer: null,
        },
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: null,
          },
          customer: null,
        },
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: null,
          },
          customer: null,
        },
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: null,
          },
          customer: null,
        },
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: null,
          },
          customer: null,
        },
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: null,
          },
          customer: null,
        },
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: null,
          },
          customer: null,
        },
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: null,
          },
          customer: null,
        },
      ],
      columnName: ["ID", "ITEM NAME", "UNIT", "SELLING PRICE", "TOTAL PRICE"],
      activeCartIndex: 0,
      paymentOptions: ["Card", "Cash", "UPI", "Split"],
    };
  },
  methods: {
    addProductToActiveCart(obj) {
      let index = this.cartList[this.activeCartIndex].productList.indexOf(obj);
      if (index !== -1) {
        this.cartList[this.activeCartIndex].productList[index].count++;
      } else {
        obj.count = 1;
        this.cartList[this.activeCartIndex].productList.push(obj);
      }
    },
    switchActiveCart(key) {
      this.activeCartIndex = key;
    },
    EmptyCart(key) {
      this.cartList[key] = {
        productList: [],
        paymentMethod: {
          method: null,
          amount: null,
        },
        customer: null,
      };
    },
    setPaymentMethod(option) {
      this.cartList[this.activeCartIndex].paymentMethod.method = option;
    },
    setCustomerToActiveCart(obj) {
      this.cartList[this.activeCartIndex].customer = obj;
    },
  },
  computed: {
    totalPrice() {
      let temp = 0;
      this.cartList[this.activeCartIndex].productList.forEach((item) => {
        temp += +(
          (item.selling_price.rupee + "." + item.selling_price.paisa) *
          item.count
        ).toFixed(2);
      });
      return parseFloat(temp);
    },
    cgstAmount() {
      return parseFloat(this.totalPrice * 0.08);
    },
    sgstAmount() {
      return parseFloat(this.totalPrice * 0.08);
    },
    billAmount() {
      return this.cgstAmount + this.sgstAmount + this.totalPrice;
    },
    splitPaymentInputVisible() {
      return this.cartList[this.activeCartIndex].paymentMethod.method === 3;
    },
    filteredCartList() {
      return this.cartList.filter((cart, index) => {
        return index === this.activeCartIndex;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  padding-top: 0px !important;
  min-width: 1200px;
  width: 100%;
}

.tab-body {
  background: var(--gray1);
  margin: 20px auto;
  display: grid;
  grid-template-columns: auto 350px;
  gap: 20px;
  min-width: 1180px;
  width: 95%;
}

.tab-lhs,
.tab-rhs {
  width: 100%;
  height: 100%;
}

.menu-bar {
  max-width: 100%;
}

.bill-card {
  background: var(--gray0);
  width: calc(100% - 40px);
  // height: calc(100% - 40px);
  border-radius: 4px;
  box-shadow: 0px 5px 50px #0000001c;
  display: flex;
  flex-direction: column;
  padding: 20px;
  // margin-top: 68px;
  .header {
    P {
      background: var(--gray1);
      font-family: var(--font-bold);
      padding: 10px;
      font-size: 14px;
      border-radius: 4px;
    }
  }

  .content {
    margin: 10px 0px;
    p {
      font-size: 14px;
      font-family: var(--font-medium);
    }
    .summ-wrapper {
      margin: 0px 10px;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .flex {
        justify-content: space-between;
        align-items: center;

        &:last-child {
          border-top: 2px dashed #dbdbdb;
          padding-top: 10px;
        }
      }

      .total {
        font-size: 42px;
        line-height: 42px;
        font-family: var(--font-semibold);
      }
    }
  }

  .content {
    .cust-wrapper {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 20px 0px;
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
  }

  .content {
    .paym-wrapper {
      margin: 20px 0px;
      .split-wrapper {
        margin-top: 20px;
        display: flex;
        gap: 1rem;
        input {
          border: 2px solid var(--gray2);
          width: 100%;
          padding: 8px 5px;
          border-radius: 4px;
          font-family: var(--font-regular);
          font-size: 12px;
        }
      }
    }
  }
}
</style>