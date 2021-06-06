<template>
  <div class="pdfTransactionHTMLView" size="A4">
    <table width="100%" style="margin-bottom:0px;">
      <tr>
        <td width="33%" class="biggerTextSize boldText" style=" vertical-align: center; "></td>
        <td width="34%" align="center" class="biggerTextSize boldText" style>Invoice</td>
        <td width="33%" align="right" style=" padding:0px; ">
          <table width="100%">
            <tr>
              <td
                width="95%"
                align="right"
                style
                class="copyPrintNumberClass"
              >Original for Recipient</td>
              <td style="padding:1px;" align="left">
                <table>
                  <tr>
                    <td
                      class="borderLeftForTxn borderRightForTxn borderBottomForTxn borderTopForTxn copyPrintNumberCheckBoxClass"
                      style="border-color: gray;  color:#fffffe;"
                    >O</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td
                width="95%"
                align="right"
                style
                class="copyPrintNumberClass"
              >Duplicate for Transporter</td>
              <td style="padding:1px;" align="left">
                <table>
                  <tr>
                    <td
                      class="borderLeftForTxn borderRightForTxn borderBottomForTxn borderTopForTxn copyPrintNumberCheckBoxClass"
                      style="border-color: gray;  color:#fffffe;"
                    >O</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td
                width="95%"
                align="right"
                style
                class="copyPrintNumberClass"
              >Triplicate for Supplier</td>
              <td style="padding:1px;" align="left">
                <table>
                  <tr>
                    <td
                      class="borderLeftForTxn borderRightForTxn borderBottomForTxn borderTopForTxn copyPrintNumberCheckBoxClass"
                      style="border-color: gray;  color:#fffffe;"
                    >O</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table width="100%">
      <tr>
        <td
          width="50%"
          class="vAlignTop noPadding borderTopForTxn borderBottomForTxn borderLeftForTxn borderRightForTxn borderColorGrey"
        >
          <table
            width="100%"
            style="vertical-align: center;"
            class="borderBottomForTxn borderColorGrey"
          >
            <tr>
              <td width="100%" style="vertical-align: center;padding-bottom:19px;">
                <p class="biggerTextSize boldText">{{company.companyName}}</p>
                <p class="bigTextSize">
                  {{company.doorNumber}} {{company.streetName}}
                  <br />
                  {{company.cityName}},
                  <br />
                  {{company.stateName}}-{{company.pincode}}
                </p>
                <p class="bigTextSize">Phone no.: {{company.phoneNumber}}</p>
                <p class="bigTextSize">Email: {{company.emailId}}</p>
                <p class="bigTextSize">GSTIN: {{company.gstinNumber}}</p>
              </td>
            </tr>
          </table>
          <table width="100%">
            <tr>
              <td align="left" width="100%">Bill To</td>
            </tr>
            <tr class="boldText bigTextSize">
              <td>{{customer.customerName}}</td>
            </tr>
            <tr v-if="customer.customerStreetName">
              <td>
                {{customer.customerDoorNumber}},
                <br />
                {{customer.customerStreetName}},
                <br />
                {{customer.customerCityName}} - {{customer.customerPincode}}
              </td>
            </tr>
            <tr>
              <td>Contact No.: {{customer.customerPhoneNumber}},</td>
            </tr>
            <tr v-if="customer.customerGstinNumber">
              <td>GSTIN Number: {{customer.customerGstinNumber}},</td>
            </tr>
            <tr v-if="customer.customerStateName">
              <td>State: {{customer.customerStateName}},</td>
            </tr>
          </table>
        </td>
        <td
          width="50%"
          class="vAlignTop noPadding borderTopForTxn borderBottomForTxn borderRightForTxn borderColorGrey"
        >
          <table width="100%">
            <tr>
              <td width="50%" class="borderBottomForTxn borderRightForTxn">
                Invoice No.
                <br />
                <b>{{invoice.id}}</b>
              </td>
              <td width="50%" class="borderBottomForTxn">
                Date
                <br />
                <b>{{invoice.createdAt.toDateString()}}</b>
              </td>
            </tr>
            <tr v-if="invoice.poNumber">
              <td width="50%" class="borderBottomForTxn borderRightForTxn">
                PO date
                <br />
                <b>{{invoice.poDate}}</b>
              </td>
              <td width="50%" class="borderBottomForTxn">
                PO number
                <br />
                <b>{{invoice.poNumber}}</b>
              </td>
            </tr>
            <tr v-if="invoice.dcNumber">
              <td width="50%" class="borderBottomForTxn borderRightForTxn">
                DC date
                <br />
                <b>{{invoice.dcDate}}</b>
              </td>
              <td width="50%" class="borderBottomForTxn">
                DC number
                <br />
                <b>{{invoice.dcNumber}}</b>
              </td>
            </tr>
            <tr v-if="invoice.drNumber">
              <td width="50%" class="borderBottomForTxn borderRightForTxn">
                DR date
                <br />
                <b>{{invoice.drDate}}</b>
              </td>
              <td width="50%" class="borderBottomForTxn">
                DR number
                <br />
                <b>{{invoice.drNumber}}</b>
              </td>
            </tr>
            <tr>
              <td colspan="2" width="100%"></td>
            </tr>
            <tr>
              <td colspan="2" width="100%"></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table class="txnItemTableForPrint" width="100%">
      <thead>
        <tr>
          <th
            class="borderBottomForTxn borderLeftForTxn borderRightForTxn borderColorGrey"
            width="4.697986577181208%"
            align="left"
          >#</th>
          <th
            class="borderBottomForTxn borderLeftForTxn borderRightForTxn borderColorGrey"
            width="29.53020134228188%"
            align="left"
          >Item name</th>
          <th
            class="borderBottomForTxn borderLeftForTxn borderRightForTxn borderColorGrey"
            width="12.080536912751677%"
            align="left"
          >HSN/ SAC</th>
          <th
            class="borderBottomForTxn borderLeftForTxn borderRightForTxn borderColorGrey"
            width="13.422818791946309%"
            align="right"
          >Quantity</th>
          <th
            class="borderBottomForTxn borderLeftForTxn borderRightForTxn borderColorGrey"
            width="13.422818791946309%"
            align="right"
          >Price/ Unit</th>
          <th
            class="borderBottomForTxn borderLeftForTxn borderRightForTxn borderColorGrey"
            width="13.422818791946309%"
            align="right"
          >GST</th>
          <th
            class="borderBottomForTxn borderLeftForTxn borderRightForTxn borderColorGrey"
            width="13.422818791946309%"
            align="right"
          >Amount</th>
        </tr>
      </thead>
      <tr v-for="product in invoice.productList" :key="product.id">
        <td class="borderLeftForTxn borderRightForTxn borderColorGrey">1</td>
        <td class="borderLeftForTxn borderRightForTxn borderColorGrey">
          <p class="noPadding">{{product.productName}}</p>
        </td>
        <td
          class="borderLeftForTxn borderRightForTxn borderColorGrey"
          align="left"
        >{{product.productHscNumber}}</td>
        <td
          class="borderLeftForTxn borderRightForTxn borderColorGrey"
          align="right"
        >{{product.productCount}}</td>
        <td
          class="borderLeftForTxn borderRightForTxn borderColorGrey"
          align="right"
        >₹ {{product.productSellingPrice.rupee+'.'+product.productSellingPrice.paisa}}</td>
        <td
          class="borderLeftForTxn borderRightForTxn borderColorGrey"
          align="right"
        >₹ {{(((product.productSellingPrice.rupee+'.'+product.productSellingPrice.paisa)*product.productCount)*(product.productTaxPercentage/100)).toFixed(2)}} ({{product.productTaxPercentage}} %)</td>
        <td
          class="borderLeftForTxn borderRightForTxn borderColorGrey"
          align="right"
        >₹ {{(((product.productSellingPrice.rupee+'.'+product.productSellingPrice.paisa)*product.productCount)+(((product.productSellingPrice.rupee+'.'+product.productSellingPrice.paisa)*product.productCount)*(product.productTaxPercentage/100))).toFixed(2)}}</td>
      </tr>
      <tr>
        <td
          class="boldText borderBottomForTxn borderTopForTxn borderLeftForTxn borderRightForTxn borderColorGrey"
        ></td>
        <td
          class="boldText borderBottomForTxn borderTopForTxn borderLeftForTxn borderRightForTxn borderColorGrey"
        >
          <b>Total</b>
        </td>
        <td
          class="boldText borderBottomForTxn borderTopForTxn borderLeftForTxn borderRightForTxn borderColorGrey"
          align="right"
        ></td>
        <td
          class="boldText borderBottomForTxn borderTopForTxn borderLeftForTxn borderRightForTxn borderColorGrey"
          align="right"
        >
          <b>{{totalCount}}</b>
        </td>
        <td
          class="boldText borderBottomForTxn borderTopForTxn borderLeftForTxn borderRightForTxn borderColorGrey"
          align="right"
        ></td>
        <td
          class="boldText borderBottomForTxn borderTopForTxn borderLeftForTxn borderRightForTxn borderColorGrey"
          align="right"
        >
          <b>₹ {{totalTax.toFixed(2)}}</b>
        </td>
        <td
          class="boldText borderBottomForTxn borderTopForTxn borderLeftForTxn borderRightForTxn borderColorGrey"
          align="right"
        >
          <b>₹ {{(totalAmount+totalTax).toFixed(2)}}</b>
        </td>
      </tr>
    </table>
    <table width="100%">
      <tr>
        <td
          width="50%"
          valign="top"
          style="padding: 0px"
          class="borderBottomForTxn borderRightForTxn borderLeftForTxn borderColorGrey"
        >
          <table width="100%">
            <tr>
              <td width="100%">Invoice Amount In Words</td>
            </tr>
            <tr>
              <td width="100%" class="boldText">{{totalAmountInWords}}</td>
            </tr>
          </table>
        </td>
        <td
          width="50%"
          valign="top"
          style=" padding: 0px;"
          class="borderBottomForTxn borderRightForTxn borderColorGrey"
        >
          <table width="100%">
            <tr>
              <th align="left" width="50%">Amounts:</th>
              <th width="50%"></th>
            </tr>
            <tr>
              <td class="borderColorGrey">Total</td>
              <td align="right" class="borderColorGrey boldText">₹ {{(totalAmount+totalTax).toFixed(2)}}</td>
            </tr>
            <tr>
              <td class="borderTopForTxn">Received</td>
              <td
                align="right"
                class="borderTopForTxn"
              >₹ {{((+invoice.cashAmount)+(+invoice.cardAmount)+(+invoice.upiAmount)).toFixed(2)}}</td>
            </tr>
            <tr v-if="invoice.unpaidAmount">
              <td class="borderColorGrey">Balance</td>
              <td align="right" class="borderColorGrey">₹ {{(+invoice.unpaidAmount).toFixed(2)}}</td>
            </tr>
            <tr v-else>
              <td class="borderColorGrey">Balance</td>
              <td align="right" class="borderColorGrey">Nil</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table width="100%">
      <tr>
        <th
          rowspan="2"
          width="24.390243902439025%"
          class="borderBottomForTxn borderRightForTxn borderLeftForTxn borderColorGrey"
          align="center"
        >HSN/ SAC</th>
        <th
          rowspan="2"
          width="17.073170731707318%"
          class="borderBottomForTxn borderRightForTxn borderColorGrey"
          align="center"
        >Taxable amount</th>
        <th
          colspan="2"
          width="19.512195121951223%"
          class="borderBottomForTxn borderRightForTxn borderColorGrey"
          align="center"
        >CGST</th>
        <th
          colspan="2"
          width="19.512195121951223%"
          class="borderBottomForTxn borderRightForTxn borderColorGrey"
          align="center"
        >SGST</th>
        <th
          rowspan="2"
          width="19.512195121951223%"
          class="borderBottomForTxn borderRightForTxn borderColorGrey"
          align="center"
        >Total Tax Amount</th>
      </tr>
      <tr>
        <th
          width="0%"
          class="borderBottomForTxn borderRightForTxn borderColorGrey"
          align="center"
        >Rate</th>
        <th
          width="0%"
          class="borderBottomForTxn borderRightForTxn borderColorGrey"
          align="center"
        >Amount</th>
        <th
          width="0%"
          class="borderBottomForTxn borderRightForTxn borderColorGrey"
          align="center"
        >Rate</th>
        <th
          width="0%"
          class="borderBottomForTxn borderRightForTxn borderColorGrey"
          align="center"
        >Amount</th>
      </tr>
      <tr v-for="product in productHscArray" :key="product.productHscNumber">
        <td class="borderBottomForTxn borderRightForTxn borderLeftForTxn borderColorGrey">{{product.productHscNumber}}</td>
        <td class="borderBottomForTxn borderRightForTxn borderColorGrey" align="right">₹ {{product.productAmount.toFixed(2)}}</td>
        <td class="borderBottomForTxn borderRightForTxn borderColorGrey" align="right">{{product.productTaxPercentage/2}}%</td>
        <td class="borderBottomForTxn borderRightForTxn borderColorGrey" align="right">₹ {{((product.productAmount)*(product.productTaxPercentage/200)).toFixed(2)}}</td>
        <td class="borderBottomForTxn borderRightForTxn borderColorGrey" align="right">{{product.productTaxPercentage/2}}%</td>
        <td class="borderBottomForTxn borderRightForTxn borderColorGrey" align="right">₹ {{((product.productAmount)*(product.productTaxPercentage/200)).toFixed(2)}}</td>
        <td class="borderBottomForTxn borderRightForTxn borderColorGrey" align="right">₹ {{((product.productAmount)*(product.productTaxPercentage/100)).toFixed(2)}}</td>
      </tr>
      <tr class="boldText">
        <td
          class="borderBottomForTxn borderRightForTxn borderLeftForTxn borderColorGrey"
          align="right"
        >Total</td>
        <td class="borderBottomForTxn borderRightForTxn borderColorGrey" align="right">₹ {{(totalAmount).toFixed(2)}}</td>
        <td class="borderBottomForTxn borderRightForTxn borderColorGrey" align="right"></td>
        <td class="borderBottomForTxn borderRightForTxn borderColorGrey" align="right">₹ {{(totalTax/2).toFixed(2)}}</td>
        <td class="borderBottomForTxn borderRightForTxn borderColorGrey" align="right"></td>
        <td class="borderBottomForTxn borderRightForTxn borderColorGrey" align="right">₹ {{(totalTax/2).toFixed(2)}}</td>
        <td class="borderBottomForTxn borderRightForTxn borderColorGrey" align="right">₹ {{(totalTax).toFixed(2)}}</td>
      </tr>
    </table>
    <table width="100%">
      <tr>
        <td
          width="50%"
          class="borderBottomForTxn borderLeftForTxn borderColorGrey vAlignBottom noPadding"
        >
          <table width="100%">
            <tr>
              <th align="left" width="100%">Terms and conditions:</th>
            </tr>
            <tr>
              <td
                width="100%"
              >We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</td>
            </tr>
             <tr>
              <td
                width="100%"
              >Goods once sold cannot be taken back or exchanged.</td>
            </tr>
            <tr height="50px"></tr>

          </table>
        </td>
        <td
          width="50%"
          class="borderBottomForTxn borderRightForTxn borderColorGrey vAlignBottom noPadding"
        >
          <table width="100%">
            <tr>
              <td width="100%" class="borderTopForTxn borderLeftForTxn borderColorGrey noPadding">
                <table width="100%">
                  <tr>
                    <td
                      width="100%"
                      style="text-align:center;"
                      align="center"
                    >For, {{company.companyName}}</td>
                  </tr>
                  <tr>
                      <!-- sign -->
                  </tr>
                  <tr>
                    <td align="center" style="text-align:center;">Authorized Signatory</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table width="100%">
      <tr>
        <td
          width="100%"
          align="center"
        >This is a Computer Generated Invoice (Powered by Store 360 App)</td>
      </tr>
    </table>
  </div>
</template>

<script>
const numWords = require('num-words')
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
        totalAmount += (product.productSellingPrice.rupee + "." +  product.productSellingPrice.paisa) * product.productCount
      });
      return totalAmount;
    },
    totalAmountInWords(){
      var arr = (this.totalAmount+this.totalTax).toFixed(2).split(".");
      var inwords = numWords(arr[0]);
      if(arr[1]){
        inwords += " rupees and " + numWords(arr[1]) + " paisa" ;
      }
      return (inwords + " only.").toUpperCase();
    },
    productHscArray() {
      const arr = this.invoice.productList;
      var helper = {};

      const result = arr.reduce(function (r, o) {
        var key = o.productHscNumber;

        if (!helper[key]) {
          helper[key] = Object.assign({}, {
              productHscNumber: o.productHscNumber,
              productTaxPercentage: o.productTaxPercentage,
              productAmount: ((o.productSellingPrice.rupee + "." +  o.productSellingPrice.paisa) * o.productCount),
          }); 
          r.push(helper[key]);
        } else {
          helper[key].productAmount += ((o.productSellingPrice.rupee + "." +  o.productSellingPrice.paisa) * o.productCount);
        }

        return r;
      }, []);

      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.pdfTransactionHTMLView {
  display: block;
  padding: 20px 30px;
}
@media print {
  body {
    -webkit-print-color-adjust: exact;
  }
}
.txnItemTableForPrint table {
  page-break-after: auto;
}
.txnItemTableForPrint tr {
  page-break-inside: avoid;
  page-break-after: auto;
}
.txnItemTableForPrint td {
  page-break-inside: avoid;
  page-break-after: auto;
}
.txnItemTableForPrint thead {
  display: table-header-group;
}
.pdfTransactionHTMLView table {
  border-collapse: collapse;
}
.pdfTransactionHTMLView td,
.pdfTransactionHTMLView th {
  padding: 3.2000000000000006px;
  font-size: 10.240000000000002px;
}
.pdfTransactionHTMLView .borderBottomForTxn {
  border-bottom: 1px solid;
  border-color: gray;
}
.pdfTransactionHTMLView .borderTopForTxn {
  border-top: 1px solid;
  border-color: gray;
}
.pdfTransactionHTMLView .borderLeftForTxn {
  border-left: 1px solid;
  border-color: gray;
}
.pdfTransactionHTMLView .borderRightForTxn {
  border-right: 1px solid;
  border-color: gray;
}
.pdfTransactionHTMLView .borderColorGrey {
  border-color: gray;
}
.pdfTransactionHTMLView p {
  margin: 0;
  padding: 1.2800000000000002px;
  font-size: 10.240000000000002px;
}
.pdfTransactionHTMLView .paddingLeft {
  padding-left: 3.2000000000000006px;
}
.pdfTransactionHTMLView .paddingRight {
  padding-right: 3.2000000000000006px;
}
.pdfTransactionHTMLView .discountTaxTable {
  border-bottom: 0px;
  border-color: white;
}
.pdfTransactionHTMLView .boldText {
  font-weight: bold;
}
.pdfTransactionHTMLView .copyPrintNumberClass {
  padding: 1.6000000000000003px;
  padding-right: 0px;
  font-size: 6.400000000000001px;
}
.pdfTransactionHTMLView .copyPrintNumberCheckBoxClass {
  padding: 0px;
  font-size: 9.600000000000001px;
}
.pdfTransactionHTMLView .normalTextSize {
  font-size: 8.320000000000002px;
}
.pdfTransactionHTMLView .bigTextSize {
  font-size: 9.600000000000001px;
}
.pdfTransactionHTMLView .largerTextSize {
  font-size: 11.520000000000003px;
}
.pdfTransactionHTMLView .biggerTextSize {
  font-size: 13.440000000000003px;
}
.pdfTransactionHTMLView .extraLargeTextSize {
  font-size: 15.360000000000003px;
}
.pdfTransactionHTMLView .noTopPadding {
  padding-top: 0px;
}
.pdfTransactionHTMLView .noBottomPadding {
  padding-bottom: 0px;
}
.pdfTransactionHTMLView .noPadding {
  padding: 0px;
}
.pdfTransactionHTMLView .topPadding {
  padding-top: 3.2000000000000006px;
}
.pdfTransactionHTMLView .partyAddressPadding {
  margin: 0;
  padding: 1.9200000000000004px 32.00000000000001px;
}
.pdfTransactionHTMLView .vAlignTop {
  vertical-align: top;
}
.pdfTransactionHTMLView .vAlignBottom {
  vertical-align: bottom;
}
.pdfTransactionHTMLView {
  font-family: Segoe, "Segoe UI", Calibri, Candara, Optima, Arial, sans-serif;
}
.page-break {
  page-break-after: always;
}
.pay-online-upi {
  cursor: default;
  clear: both;
  float: left;
  background-color: #28db89;
  padding: 1px;
}
.pay-online-upi .upi-image {
  display: inline-block;
  padding: 2px;
  background-color: white;
}
.pay-online-upi .pay-now-text {
  border-radius: 0 2px 2px 0;
  display: inline-block;
  padding: 3px 2px 3px 2px;
  color: white;
}
</style>