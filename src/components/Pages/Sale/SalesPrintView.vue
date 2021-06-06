<template>
  <section class="container" v-if="invoiceDetails">
    <div class="flex print-preview">
      <div>
        <webview style="height:0px;width:0px;" ref="printwebview" src="./print.html" nodeintegration></webview>
        <invoice-preview :invoice="invoiceDetails" ref="invoice"></invoice-preview>
      </div>
      <div>
        <div class="side-card">
          <div class="price-card">
            <h1>Additional Details</h1>
            <div class="flex apart">
              <input type="text" placeholder="PO Number" v-model="invoiceDetails.poNumber" />
              <input type="text" placeholder="DD/MM/YYYY" v-model="invoiceDetails.poDate" />
            </div>
            <div class="flex apart">
              <input type="text" placeholder="DC Number" v-model="invoiceDetails.dcNumber" />
              <input type="text" placeholder="DD/MM/YYYY" v-model="invoiceDetails.dcDate" />
            </div>
            <div class="flex apart">
              <input type="text" placeholder="DR Number" v-model="invoiceDetails.drNumber" />
              <input type="text" placeholder="DD/MM/YYYY" v-model="invoiceDetails.drDate" />
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
  </section>
</template>

<script>
export default {
  data() {
    return {
      invoiceDetails: null,
    };
  },
  computed: {
    totalPrice() {
      let temp = 0;
      this.invoiceDetails.productList.forEach((item) => {
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
  },
  methods: {
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
  },
  async created() {
    this.invoiceDetails = await this.$store.dispatch(
      "sale/getSalesById",
      this.$route.params.id
    );
  },
  updated() {
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