<template>
  <div>
    <h1>Template Manager</h1>
    <list-box
      @option-selected="sort"
      value-to-display="Select Invoice Template"
      :options="sortOptionsToDisplay"
      :active="currentTemplate"
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
      sortOptionsToDisplay: ["Default GST Template", "Modern GST Template"],
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
    currentTemplate() {
      return this.$store.getters["setting/getCurrentInvoiceTemplate"] - 1;
    },
  },
  methods: {
    async sort(columnIndex) {
      this.$store.dispatch(
        "setting/updateCurrentInvoiceTemplate",
        columnIndex + 1
      );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>