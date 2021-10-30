<template>
  <div class="printHTMLView">
    <div class="header">
      <h1>{{ company.companyName }}</h1>
      <p>
        {{ company.doorNumber }}, {{ company.streetName }}
        {{ company.cityName }}, {{ company.stateName }} - {{ company.pincode }}
      </p>
      <p>Phone : {{ company.phoneNumber }} Email: {{ company.emailId }}</p>
      <p>GSTIN: {{ company.gstinNumber }}</p>
    </div>
    <div class="title-wrapper">
      <h1>GST Invoice</h1>
    </div>
    <div class="flex address-wrapper">
      <div>
        <h1>Bill To</h1>
        <p>{{ customer.customerName }}</p>
        <p v-if="customer.customerDoorNumber">
          {{ customer.customerDoorNumber }}, {{ customer.customerStreetName }},
          <br />
          {{ customer.customerCityName }} - {{ customer.customerPincode }}
        </p>
        <p v-if="customer.customerStateName">
          State: {{ customer.customerStateName }}
        </p>
        <p>Contact No.: {{ customer.customerPhoneNumber }}</p>
        <p v-if="customer.customerGstinNumber">
          GSTIN Number: {{ customer.customerGstinNumber }}
        </p>
      </div>
      <div v-if="customer.customerShippingDoorNumber">
        <h1>Ship To</h1>
        <p>{{ customer.customerName }}</p>
        <p v-if="customer.customerShippingDoorNumber">
          {{ customer.customerShippingDoorNumber }},
          {{ customer.customerShippingStreetName }},
          <br />
          {{ customer.customerShippingCityName }} -
          {{ customer.customerShippingPincode }}
        </p>
        <p v-if="customer.customerShippingStateName">
          State: {{ customer.customerShippingStateName }}
        </p>
        <p>Contact No.: {{ customer.customerPhoneNumber }}</p>
        <p v-if="customer.customerGstinNumber">
          GSTIN Number: {{ customer.customerGstinNumber }}
        </p>
      </div>
      <div>
        <p>
          <b>Invoice No.</b>
          <br />
          {{ invoice.id }}
        </p>
        <p>
          <b>Date</b>
          <br />
          {{ invoice.createdAt.toDateString() }}
        </p>
      </div>
    </div>
    <div class="items-wrapper">
      <div class="title">
        <p>#</p>
        <p>Item Name</p>
        <p class="align-right">Quantity</p>
        <p class="align-right">Price/Unit</p>
        <p class="align-right">GST</p>
        <p class="align-right">Amount</p>
      </div>

      <div v-for="(product,index) in invoice.productList" :key="product.id">
        <p>{{index+1}}</p>
        <p>{{ product.productName }}</p>
        <p class="align-right">{{ product.productCount }}</p>
        <p class="align-right">
          ₹
          {{
            product.productSellingPrice.rupee +
            "." +
            product.productSellingPrice.paisa
          }}
        </p>
        <p class="align-right">{{ product.productTaxPercentage }} %</p>
        <p class="align-right">
          ₹
          {{
            (
              (product.productSellingPrice.rupee +
                "." +
                product.productSellingPrice.paisa) *
                product.productCount +
              (product.productSellingPrice.rupee +
                "." +
                product.productSellingPrice.paisa) *
                product.productCount *
                (product.productTaxPercentage / 100)
            ).toFixed(2)
          }}
        </p>
      </div>
    </div>
    <div class="flex total-wrapper">
      <div>
        <p>Invoice Amount In Words</p>
        <p>
          <b>
          {{ totalAmountInWords }}
          </b>
        </p>
      </div>
      <div>
        <p class="align-right">Total</p>
        <p style="font-size:24px"><b>₹{{ (totalAmount + totalTax).toFixed(2) }}</b></p>
      </div>
    </div>
    <div class="footer-wrapper" style="justify-content:space-between">
      <div>
        <p>Terms & Conditions</p>
        <ul>
          <li><p>Once purchased products cannot be returned</p></li>
          <li><p>We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct</p></li>
        </ul>
      </div>
      <div class="align-center">
        <p>Authorized Signatory</p>
        <br>
        <p>_____________</p>
      </div>
    </div>
  </div>
</template>

<script>
const numWords = require("num-words");
//.insertCSS(fs.readFileSync(path.join(__dirname, 'yourCSSFile.css'), 'utf8'));
export default {
  props: ["invoice"],
  data() {
    return {
      customer: {},
      company: {},
    };
  },
  async mounted() {
    this.customer = await this.$store.dispatch(
      "customer/getCustomerById",
      this.invoice.customerId
    );
    this.company = JSON.parse(localStorage.getItem("companyDetails"));
  },
  computed: {
    totalCount() {
      var totalCount = 0;
      this.invoice.productList.forEach((product) => {
        totalCount += product.productCount;
      });
      return totalCount;
    },
    totalTax() {
      var totalTax = 0;
      this.invoice.productList.forEach((product) => {
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
      this.invoice.productList.forEach((product) => {
        totalAmount +=
          (product.productSellingPrice.rupee +
            "." +
            product.productSellingPrice.paisa) *
          product.productCount;
      });
      return totalAmount;
    },
    totalAmountInWords() {
      var arr = (this.totalAmount + this.totalTax).toFixed(2).split(".");
      var inwords = numWords(arr[0]);
      if (arr[1] > 0) {
        inwords += " rupees and " + numWords(arr[1]) + " paisa";
      } else {
        inwords += " rupees";
      }
      return (inwords + " only.").toUpperCase();
    },
    productHscArray() {
      const arr = this.invoice.productList;
      var helper = {};

      const result = arr.reduce(function (r, o) {
        var key = o.productHscNumber;

        if (!helper[key]) {
          helper[key] = Object.assign(
            {},
            {
              productHscNumber: o.productHscNumber,
              productTaxPercentage: o.productTaxPercentage,
              productAmount:
                (o.productSellingPrice.rupee +
                  "." +
                  o.productSellingPrice.paisa) *
                o.productCount,
            }
          );
          r.push(helper[key]);
        } else {
          helper[key].productAmount +=
            (o.productSellingPrice.rupee + "." + o.productSellingPrice.paisa) *
            o.productCount;
        }

        return r;
      }, []);

      return result;
    },
  },
};
</script>

<style lang="scss" scoped>

.printHTMLView {
  h1,
  p {
    font-family: Segoe, "Segoe UI", Calibri, Candara, Optima, Arial, sans-serif !important;
  }
}

.align-left {
  text-align: left;
}
.align-center {
  text-align: center;
}
.align-right {
  text-align: right;
}

.address-wrapper,
.total-wrapper {
  justify-content: space-between;
  padding: 15px 25px;
  border-bottom: 1px solid #000000;
}

.title-wrapper {
  text-align: center;
  padding: 15px 25px 0px 25px;
  h1 {
    text-decoration: underline;
  }
}

.items-wrapper {
  padding: 25px 0px;
  border-bottom: 1px solid #000000;
  .title {
    p {
      font-weight: bold;
    }
  }
  div {
    margin-bottom: 15px;
    display: grid;
    grid-template-columns: 25px auto 100px 100px 70px 100px;
    padding: 0px 25px;
  }
}

.header {
  padding: 10px;
  text-align: center;
  background: var(--red);
  align-items: flex-end;
  h1,
  p {
    color: var(--gray0);
  }
  h1 {
    font-size: 32px;
  }
  p {
    font-size: 14px;
  }
}

.address-wrapper {
  border-bottom: 1px solid black;
}

.footer-wrapper{
  padding:25px;
  display: grid;
  grid-template-columns: 60% 30%;
  align-items: center;

  li{
    p{
      font-size:12px;
    }
  }
}
</style>
