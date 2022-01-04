<template>
  <div>
    <div v-if="currentPrinter === 0">
       <invoice-template-1 v-if="currentTemplate===0" :invoice="invoice"></invoice-template-1>
       <invoice-template-2 v-else-if="currentTemplate===1" :invoice="invoice"></invoice-template-2>
    </div>
    <div v-else>
       <invoice-template-thermal-1 :invoice="invoice"></invoice-template-thermal-1>
    </div>
  </div>
</template>

<script>
import InvoiceTemplate1 from "./InvoiceTemplate1";
import InvoiceTemplate2 from "./InvoiceTemplate2";
import InvoiceTemplateThermal1 from "./InvoiceTemplateThermal1";
export default {
  props: ["invoice"],
  components: { InvoiceTemplate1, InvoiceTemplate2, InvoiceTemplateThermal1 },
  computed: {
    currentTemplate(){
      return this.$store.getters["setting/getCurrentInvoiceTemplate"]
    },
    currentPrinter(){
      return this.$store.getters["setting/getUserSettings"].defaultPrinter
    }
  }
};
</script>

<style lang="scss" scoped></style>