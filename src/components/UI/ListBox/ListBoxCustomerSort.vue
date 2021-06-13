<template>
  <list-box
    @option-selected="sort"
    value-to-display="Sort By"
    :options="sortOptionsToDisplay"
    :active="active"
    style="width:80px;"
  >
  </list-box>
</template>

<script>
export default {
  methods: {
      async sort(columnIndex){
          this.active = columnIndex;
          await this.$store.dispatch("customer/getCustomerList",{columnToSort:this.sortOptions[columnIndex]});
      }
  },
  data() {
    return {
      sortOptions: ["customerName", "customerCreditPoint", "customerUnpaidBalance"],
      sortOptionsToDisplay: ["Name", "Credits", "Balance"],
      active: null,
    };
  },
};
</script>