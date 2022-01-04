<template>
  <div class="printHTMLView">
    <h2>{{ company.companyName }}</h2>
    <p class="address">{{ company.doorNumber }}, {{ company.streetName }}</p>
    <p class="address">
      {{ company.cityName }}, {{ company.stateName }} - {{ company.pincode }}
    </p>
    <p class="address">
      PHONE:<span class="address">{{ company.phoneNumber }}</span>
    </p>
    <p class="address">
      GSTIN:<span class="address">{{ company.gstinNumber }}</span>
    </p>
    <div class="meta">
      <p class="billnumber">
        Invoice No: <span>{{ invoice.id }}</span>
      </p>
      <p class="date">
        Date: <span> {{ invoiceDate }}</span>
      </p>
    </div>
    <table style="width: 100%">
      <thead>
        <tr>
          <th style="width: 45%">Item</th>
          <th style="width: 5%">Qty</th>
          <th style="width: 20%" class="right-align">Price</th>
          <th style="width: 30%" class="right-align">Amt</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr v-for="product in invoice.productList" :key="product.id">
          <td>{{ product.productName }}</td>
          <td class="center-align">{{ product.productCount }}</td>
          <td class="right-align">
            ₹
            {{
              product.productSellingPrice.rupee +
              "." +
              product.productSellingPrice.paisa
            }}
          </td>
          <td class="right-align">
            ₹
            {{
              (
                (product.productSellingPrice.rupee +
                  "." +
                  product.productSellingPrice.paisa) *
                  product.productCount 
              ).toFixed(2)
            }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Subtotal</th>
          <th class="center-align">{{totalCount}}</th>
          <th class="right-align"></th>
          <th class="right-align">{{ totalAmount.toFixed(2) }}</th>
        </tr>
        <tr>
          <td></td>
          <td class="center-align"></td>
          <td class="right-align">CGST</td>
          <td class="right-align">{{ (totalTax / 2).toFixed(2) }}</td>
        </tr>
        <tr>
          <td></td>
          <td class="center-align"></td>
          <td class="right-align">SGST</td>
          <td class="right-align">{{ (totalTax / 2).toFixed(2) }}</td>
        </tr>
        <tr>
          <th>TOTAL</th>
          <th></th>
          <th class="right-align"></th>
          <th class="right-align">
            Rs.<span>{{ (totalAmount + totalTax).toFixed(2) }}</span>
          </th>
        </tr>
      </tfoot>
    </table>
    <p class="address">Thank you</p>
  </div>
</template>

<script>
export default {
  props: ["invoice"],
  data() {
    return {
      company: {},
    };
  },
  async mounted() {
    this.company = JSON.parse(localStorage.getItem("companyDetails"));
  },
  computed: {
    invoiceDate() {
      let d = this.invoice.createdAt;
      console.log(typeof d);
      return (`${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`);
    },
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
  font-family: sans-serif !important;
  width: 282px;
  max-width: 302px;
  padding: 10px;
}

h2 {
  text-align: center;
  font-size: 14px;
  margin: 1px;
}

.address {
  text-align: center;
  font-size: 12px;
  margin: 0px;
}

.billnumber {
  display: inline-block;
  font-size: 12px;
  text-align: left;
}

.date {
  /* display: inline-block; */
  font-size: 12px;
  float: right;
}

th {
  font-size: 13px;
}

td {
  font-size: 12px;
}

.right-align {
  text-align: right;
}

.center-align {
  text-align: center;
}

.meta p {
  margin: 2px;
}
th {
  border-top: 1px dashed black;
  border-bottom: 1px dashed black;
}
.tbody td {
  padding: 5px 0px;
}
</style>