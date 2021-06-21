<template>
  <section>
    <the-tabs @tab-removed="emptyCart" @tab-switched="switchActiveCart"></the-tabs>
    <div v-for="cart in filteredCartList" :key="cart">
      <div class="tab-body" v-if="!cart.printPreview">
        <div class="tab-lhs">
          <div class="flex menu-bar">
            <search-bar-dropdown
              place-holder="Search Items by Name, ID, Barcode"
              @select="addProductToActiveCart"
            ></search-bar-dropdown>
          </div>
          <hr />
          <the-table table-height="calc(100vh - 180px)">
            <template #colgroup>
              <col span="1" style="width: 5%;" />
              <col span="1" style="width: 20%;" />
              <col span="1" style="width: 5%;" />
              <col span="1" style="width: 10%;" />
              <col span="1" style="width: 5%;" />
              <col span="1" style="width: 10%;" />
              <col span="1" style="width: 4%;" />
            </template>
            <template #thead>
              <tr>
                <th v-for="title in columnName" :key="title">{{title}}</th>
              </tr>
            </template>
            <template #tbody>
              <tr v-for="(product,index) in cart.productList" :key="product.id">
                <td>{{product.id}}</td>
                <td>{{product.productName}}</td>
                <td>{{product.productCount}}</td>
                <td>{{product.productSellingPrice.rupee+'.'+product.productSellingPrice.paisa}}</td>
                <td>{{product.productTaxPercentage}} %</td>
                <td
                  style="font-family:var(--font-bold)"
                >{{ (((product.productSellingPrice.rupee+'.'+product.productSellingPrice.paisa)*product.productCount)*((100+product.productTaxPercentage)/100)).toFixed(2) }}</td>
                <td
                  style="display:flex;align-items:center;justify-content:center;padding-right:5px;"
                >
                  <svg-icon
                    color="gray0"
                    size="16"
                    icon="cross-icon"
                    class="remove-icon"
                    @click="removeProductFromActiveCart(index)"
                  ></svg-icon>
                </td>
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
                  <div class="cust" v-if="cart.customer !== null">
                    <div class="avatar">{{cart.customer.customerName[0]}}</div>
                    <div class="details">
                      <p class="name">{{cart.customer.customerName}}</p>
                      <p class="phone">{{cart.customer.customerPhoneNumber}}</p>
                    </div>
                  </div>
                  <p
                    v-if="cart.customer"
                    style="color:var(--red);font-size:12px;cursor:pointer;margin-right:10px"
                    @click="removeCustomerFromActiveCart"
                  >Remove</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bill-card">

            <div class="item2">
              <div class="header">
                <p>Payment Method</p>
              </div>
              <div class="content">
                <div class="paym-wrapper">
                  <list-box
                    @option-selected="setPaymentMethod"
                    value-to-display="Select Payment"
                    :options="paymentOptions"
                    :active="cart.paymentMethod.method"
                  ></list-box>
                  <div class="split-wrapper" v-if="splitPaymentInputVisible">
                    <input
                      type="number"
                      placeholder="Card Amount"
                      v-model="cart.paymentMethod.amount.card"
                    />
                  </div>
                  <div class="split-wrapper" v-if="splitPaymentInputVisible">
                    <input
                      type="number"
                      placeholder="Cash Amount"
                      v-model="cart.paymentMethod.amount.cash"
                    />
                  </div>
                  <div class="split-wrapper" v-if="splitPaymentInputVisible">
                    <input type="number" placeholder="UPI Amount" v-model="cart.paymentMethod.amount.upi" />
                  </div>
                   <div class="flex" style="justify-content:space-between; margin-top: 25px; padding:0px 8px" v-if="splitPaymentInputVisible">
                    <p>Balance Amount</p>
                    <p>₹ {{(totalPrice - splitTotal).toFixed(2)}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bill-card">
            <div class="item3">
              <div class="header">
                <p>Bill Summary</p>
              </div>
              <div class="content">
                <div class="summ-wrapper">
                  <div class="flex">
                    <p>Subtotal</p>
                    <p>₹ {{totalAmount.toFixed(2)}}</p>
                  </div>
                  <div class="flex">
                    <p>GST</p>
                    <p>₹ {{totalTax.toFixed(2)}}</p>
                  </div>
                  <div class="flex">
                    <h1>Total</h1>
                    <p class="total">₹ {{totalPrice.toFixed(2)}}</p>
                  </div>
                 
                </div>
              </div>
            </div>
            <div class="footer">
              <the-button label="Checkout" color="green" @click="validateBill"></the-button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex print-preview">
        <div
          ref="invoice"
          style="height:85vh;overflow:auto;width:100%;background:white;margin:25px 0px;border-radius:5px"
        >
          <invoice-preview :invoice="cart" style="margin-bottom:10px;"></invoice-preview>
        </div>
        <div style="height:90vh; width:400px">
          <div class="side-card">
            <div class="price-card">
              <h1>Additional Details</h1>
              <div class="flex apart">
                <input type="text" placeholder="PO Number" v-model="cart.poNumber" />
                <input type="text" placeholder="DD/MM/YYYY" v-model="cart.poDate" />
              </div>
              <div class="flex apart">
                <input type="text" placeholder="DC Number" v-model="cart.dcNumber" />
                <input type="text" placeholder="DD/MM/YYYY" v-model="cart.dcDate" />
              </div>
              <div class="flex apart">
                <input type="text" placeholder="DR Number" v-model="cart.drNumber" />
                <input type="text" placeholder="DD/MM/YYYY" v-model="cart.drDate" />
              </div>
            </div>
            <div class="price-card">
              <div class="flex apart">
                <h1>Total</h1>
                <h1>₹ {{totalPrice.toFixed(2)}}</h1>
              </div>
              <the-button label="Print" @click="printInvoice"></the-button>
              <the-button label="Save as PDF" color="green" @click="printToPDF"></the-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <webview style="height:0px;width:0px;" ref="printwebview" src="./print.html" nodeintegration></webview>
  </section>
</template>

<script>
const ipcRenderer = require("electron").ipcRenderer;
export default {
  data() {
    return {
      cartList: [
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: {
              card: null,
              cash: null,
              upi: null,
            },
          },
          customer: null,
          printPreview: false,
        },
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: {
              card: null,
              cash: null,
              upi: null,
            },
          },
          customer: null,
          printPreview: false,
        },
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: {
              card: null,
              cash: null,
              upi: null,
            },
          },
          customer: null,
          printPreview: false,
        },
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: {
              card: null,
              cash: null,
              upi: null,
            },
          },
          customer: null,
          printPreview: false,
        },
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: {
              card: null,
              cash: null,
              upi: null,
            },
          },
          customer: null,
          printPreview: false,
        },
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: {
              card: null,
              cash: null,
              upi: null,
            },
          },
          customer: null,
          printPreview: false,
        },
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: {
              card: null,
              cash: null,
              upi: null,
            },
          },
          customer: null,
          printPreview: false,
        },
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: {
              card: null,
              cash: null,
              upi: null,
            },
          },
          customer: null,
          printPreview: false,
        },
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: {
              card: null,
              cash: null,
              upi: null,
            },
          },
          customer: null,
          printPreview: false,
        },
        {
          productList: [],
          paymentMethod: {
            method: null,
            amount: {
              card: null,
              cash: null,
              upi: null,
            },
          },
          customer: null,
          printPreview: false,
        },
      ],
      columnName: [
        "ID",
        "ITEM NAME",
        "COUNT",
        "SELLING PRICE",
        "TAX",
        "TOTAL PRICE",
        " ",
      ],
      activeCartIndex: 0,
      paymentOptions: ["Card Payment", "Cash Payment", "UPI Payment", "Split Payment", "Not Paid"],
    };
  },
  methods: {
    intArrayToArrayBuffer(array) {
      return array.buffer.slice(
        array.byteOffset,
        array.byteLength + array.byteOffset
      );
    },
    saveByteArray(reportName, byte) {
      var blob = new Blob([byte], { type: "application/pdf" });
      var link = document.createElement("a");
      link.style = "display:none";
      link.href = window.URL.createObjectURL(blob);
      var fileName = reportName;
      link.download = fileName;
      link.click();
    },
    printInvoice() {
      this.updateBill();
      const webview = this.$refs.printwebview;
      webview.send("webview-print-render", this.$refs.invoice.innerHTML);
    },
    printToPDF() {
      this.updateBill();
      const webview = this.$refs.printwebview;
      webview.send("webview-pdf-render", this.$refs.invoice.innerHTML);
    },
    addProductToActiveCart(obj) {
      let index = this.cartList[this.activeCartIndex].productList.indexOf(obj);
      if (index !== -1) {
        this.cartList[this.activeCartIndex].productList[index].productCount++;
      } else {
        obj.productCount = 1;
        this.cartList[this.activeCartIndex].productList.push(obj);
      }
    },
    removeProductFromActiveCart(index) {
      this.cartList[this.activeCartIndex].productList.splice(index, 1);
    },
    switchActiveCart(key) {
      this.activeCartIndex = key;
    },
    emptyCart(key) {
      this.cartList[key] = {
        productList: [],
        paymentMethod: {
          method: null,
          amount: {
            card: null,
            cash: null,
            upi: null,
          },
        },
        customer: null,
        printPreview: false,
      };
    },
    setPaymentMethod(option) {
      this.cartList[this.activeCartIndex].paymentMethod.method = option;
    },
    setCustomerToActiveCart(obj) {
      this.cartList[this.activeCartIndex].customer = obj;
    },
    removeCustomerFromActiveCart() {
      this.cartList[this.activeCartIndex].customer = null;
    },
    async updateBill() {
      try {
        await this.$store.dispatch(
          "sale/updateSale",
          this.cartList[this.activeCartIndex]
        );
      } catch (error) {
        this.$moshaToast(error, {
          type: "danger",
          hideProgressBar: "true",
          position: "bottom-right",
          transition: "bounce",
        });
      }
    },
    async validateBill() {
      if (
        this.validatePayment() &&
        this.validateCustomer() &&
        this.cartList[this.activeCartIndex].productList.length > 0
      ) {
        try {
          this.cartList[this.activeCartIndex].totalPrice = this.totalPrice
          this.cartList[this.activeCartIndex] = await this.$store.dispatch(
            "sale/postSale",
            this.cartList[this.activeCartIndex]
          );
          this.cartList[this.activeCartIndex].printPreview = true;
        } catch (error) {
          console.log(error);
        }
      }
    },
    validatePayment() {
      switch (this.cartList[this.activeCartIndex].paymentMethod.method) {
        case 0:
          this.cartList[this.activeCartIndex].paymentMethod.amount.card = this.totalPrice;
          this.cartList[this.activeCartIndex].paymentMethod.amount.cash = null;
          this.cartList[this.activeCartIndex].paymentMethod.amount.upi = null;
          break;
        case 1:
          this.cartList[this.activeCartIndex].paymentMethod.amount.card = null;
          this.cartList[this.activeCartIndex].paymentMethod.amount.cash = this.totalPrice;
          this.cartList[this.activeCartIndex].paymentMethod.amount.upi = null;
          break;
        case 2:
          this.cartList[this.activeCartIndex].paymentMethod.amount.card = null;
          this.cartList[this.activeCartIndex].paymentMethod.amount.cash = null;
          this.cartList[this.activeCartIndex].paymentMethod.amount.upi = this.totalPrice;
          break;
        case 4:
          this.cartList[this.activeCartIndex].paymentMethod.amount.card = null;
          this.cartList[this.activeCartIndex].paymentMethod.amount.cash = null;
          this.cartList[this.activeCartIndex].paymentMethod.amount.upi = null;
          break;
      }
      return true;
    },
    validateCustomer() {
      if (
        this.cartList[this.activeCartIndex].customer === null) {
        this.$moshaToast("Please, Select customer for cashless payment", {
          type: "danger",
          hideProgressBar: "true",
          position: "bottom-right",
          transition: "bounce",
        });
        return false;
      }
      return true;
    },
  },
  computed: {
    defaultPrinter() {
      var printer = "";
      ipcRenderer.send("getDefaultPrinter");
      ipcRenderer.once("getDefaultPrinter", (event, data) => {
        printer = data;
      });
      return printer;
    },
    totalTax() {
      var totalTax = 0;
      this.cartList[this.activeCartIndex].productList.forEach((product) => {
        totalTax +=
          (product.productSellingPrice.rupee +
            "." +
            product.productSellingPrice.paisa) *
          product.productCount *
          (product.productTaxPercentage / 100);
      });
      return totalTax;
    },
    totalAmount() {
      var totalAmount = 0;
      this.cartList[this.activeCartIndex].productList.forEach((product) => {
        totalAmount +=
          (product.productSellingPrice.rupee +
            "." +
            product.productSellingPrice.paisa) *
          product.productCount;
      });
      return totalAmount;
    },
    totalPrice() {
      let temp = 0;
      this.cartList[this.activeCartIndex].productList.forEach((item) => {
        var priceWithoutTax =
          (item.productSellingPrice.rupee +
            "." +
            item.productSellingPrice.paisa) *
          item.productCount;
        var Tax = (priceWithoutTax * item.productTaxPercentage) / 100;
        temp += +(priceWithoutTax + Tax).toFixed(2);
      });
      return parseFloat(temp);
    },
    splitPaymentInputVisible() {
      return this.cartList[this.activeCartIndex].paymentMethod.method === 3;
    },
    filteredCartList() {
      return this.cartList.filter((cart, index) => {
        return index === this.activeCartIndex;
      });
    },
    splitTotal() {
      var total = 0;
      if (
        this.cartList[this.activeCartIndex].paymentMethod.amount.card !== null && this.cartList[this.activeCartIndex].paymentMethod.amount.card !== ''
      ) {
        total += parseFloat(
          this.cartList[this.activeCartIndex].paymentMethod.amount.card
        );
      }
      if (
        this.cartList[this.activeCartIndex].paymentMethod.amount.cash !== null && this.cartList[this.activeCartIndex].paymentMethod.amount.cash !== ''
      ) {
        total += parseFloat(
          this.cartList[this.activeCartIndex].paymentMethod.amount.cash
        );
      }
      if (
        this.cartList[this.activeCartIndex].paymentMethod.amount.upi !== null && this.cartList[this.activeCartIndex].paymentMethod.amount.upi !== ''
      ) {
        total += parseFloat(
          this.cartList[this.activeCartIndex].paymentMethod.amount.upi
        );
      }
      return total;
    },
  },
  async mounted() {
    await this.$store.dispatch("customer/getCustomerList", { offset: 0 });

    this.$refs.printwebview.addEventListener("ipc-message", (event) => {
      if (event.channel === "webview-print-do") {
        this.$refs.printwebview.print({
          silent: true,
          printbackground: true,
          devicename: this.defaultPrinter,
          pageSize: "A4",
        });
      } else if (event.channel === "webview-pdf-do") {
        this.$refs.printwebview
          .printToPDF({
            printbackground: true,
            pageSize: "A4",
          })
          .then((pdfDataArray) => {
            var arrBuffer = this.intArrayToArrayBuffer(pdfDataArray);
            this.saveByteArray(
              "Invoice No " +
                this.cartList[this.activeCartIndex].id +
                " " +
                this.cartList[this.activeCartIndex].createdAt.toDateString(),
              arrBuffer
            );
          });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
section {
  padding-top: 0px !important;
  min-width: 1200px;
  width: 100%;
}

th {
  &:nth-of-type(1),
  &:nth-of-type(2) {
    text-align: left !important;
  }
}

td {
  &:nth-of-type(1),
  &:nth-of-type(2) {
    text-align: left !important;
  }
}

.tab-body {
  background: var(--gray1);
  margin: 20px auto;
  display: grid;
  grid-template-columns: auto 350px;
  gap: 20px;
  min-width: 1180px;
  width: 95%;
  height: calc(100vh - 100px);
  overflow: auto;
}

.remove-icon {
  &:hover {
    background: var(--red);
  }
  background: var(--gray2);
  cursor: pointer;
  border-radius: 360px;
  padding: 2px;
}

.tab-lhs,
.tab-rhs {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: var(--gray1);
}

.menu-bar {
  max-width: 100%;
}

.bill-card {
  background: var(--gray0);
  width: calc(100% - 40px);
  // height: calc(100% - 40px);
  border-radius: 6px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.01);
  display: flex;
  flex-direction: column;
  padding: 20px;
  // margin-top: 68px;
  margin-bottom:25px;
  .header {
    P {
      background: var(--gray1);
      font-family: var(--font-bold);
      padding: 8px 10px;
      font-size: 14px;
      border-radius: 4px;
    }
  }

  .content {
    p {
      font-size: 14px;
      font-family: var(--font-medium);
    }
    .summ-wrapper {
      margin: 10px 10px;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .flex {
        justify-content: space-between;
        align-items: center;

        &:last-child {
          // border-top: 2px dashed #dbdbdb;
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
      justify-content: space-between;
      gap: 1rem;
      margin-top: 20px;
      .cust {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
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
      margin-top: 20px;
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

.print-preview {
  margin: 0px auto;
  width: 95%;
  justify-content: space-between;
  gap: 2rem;

  .side-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    margin: 25px 0px;

    .price-card {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 25px;
      background: var(--gray0);
      border-radius: 4px;
      box-shadow: 0px 3px 15px #0000000e;

      input {
        padding: 8px 10px;
        border-radius: 4px;
        border: 2px solid var(--gray2);
        font-family: var(--font-regular);
        width: 100%;

        &:focus {
          border: 2px solid var(--blue);
          outline: none;
        }
      }
      .apart {
        justify-content: space-between;
        gap: 1rem;
      }
    }
  }
}
</style>