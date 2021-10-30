<template>
  <div>
    <invoice-template-2 :invoice="invoice"></invoice-template-2>
  </div>
</template>

<script>
import InvoiceTemplate2 from "./InvoiceTemplate2";
export default {
  props: ["invoice"],
  components: { InvoiceTemplate2 },
};
</script>

<style lang="scss" scoped></style>