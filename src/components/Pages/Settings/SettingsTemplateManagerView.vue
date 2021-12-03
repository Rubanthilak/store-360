<template>
  <div>
    <h1>Template Manager</h1>
    <list-box
      @option-selected="updateCurrentInvoiceTemplate"
      value-to-display="Select Invoice Template"
      :options="templateOptionsToDisplay"
      :active="currentPrinterSettings.defaultTemplate"
      style="width: 180px"
    ></list-box>
     <list-box
      @option-selected="updateCurrentPrinter"
      value-to-display="Select Invoice Template"
      :options="printerOptionsToDisplay"
      :active="currentPrinterSettings.defaultPrinter"
      style="width: 180px"
    ></list-box>
    <div style="width:720px; background: white; height: 820px">
        <invoice-preview :invoice="invoiceDetails"></invoice-preview>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      templateOptionsToDisplay: ["Default GST Template", "Modern GST Template"],
      printerOptionsToDisplay: ["A4 Invoice Printer", "Thermal Printer"],
      active: null,
      invoiceDetails: {
        billingAddress: null,
        createdAt: new Date(),
        customerId: 2,
        dcDate: null,
        dcNumber: null,
        drDate: "Invalid date",
        drNumber: null,
        id: 7,
        payments: [
          {
            amountPaid: 1,
            createdAt: new Date(),
            customerId: 3,
            dateOfTransaction: "2021-10-30",
            id: 18,
            paymentMethod: "Cash",
            saleId: 19,
            transactionNumber: null,
            updatedAt: new Date(),
          },
        ],
        placeOfSupply: null,
        poDate: null,
        poNumber: null,
        productList: [
          {
            id: 1,
            productBarcode: null,
            productBaseUnit: null,
            productCount: 1,
            productHscNumber: null,
            productMrpPrice: { rupee: 12, paisa: "00" },
            productName: "Maggi",
            productSecondaryUnit: null,
            productSellingPrice: { rupee: 12, paisa: "00" },
            productStock: 100,
            productTaxPercentage: 0,
          },
        ],
        shippingAddress: null,
        totalAmountPaid: 138,
        totalPrice: 138,
        updatedAt: new Date(),
      },
    };
  },
  computed: {
    currentPrinterSettings() {
      return this.$store.getters["setting/getUserSettings"];
    },
  },
  methods: {
    async updateCurrentInvoiceTemplate(columnIndex) {
      this.$store.dispatch(
        "setting/updateCurrentInvoiceTemplate",
        columnIndex
      );
    },
    async updateCurrentPrinter(columnIndex) {
      this.$store.dispatch(
        "setting/updateCurrentPrinter",
        columnIndex
      );
    },
  },
};
</script>

<style lang="scss" scoped>

</style>