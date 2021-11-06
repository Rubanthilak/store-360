<template>
  <div>
    <invoice-template-1 v-if="currentTemplate===1" :invoice="invoice"></invoice-template-1>
    <invoice-template-2 v-else-if="currentTemplate===2" :invoice="invoice"></invoice-template-2>
  </div>
</template>

<script>
import InvoiceTemplate1 from "./InvoiceTemplate1";
import InvoiceTemplate2 from "./InvoiceTemplate2";
export default {
  props: ["invoice"],
  components: { InvoiceTemplate1, InvoiceTemplate2 },
  computed: {
    currentTemplate(){
      return this.$store.getters["getCurrentPrinterTemplate"]
    }
  }
};
</script>

<style lang="scss" scoped></style>