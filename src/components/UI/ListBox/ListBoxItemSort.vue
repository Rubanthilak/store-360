<template>
  <list-box
    @option-selected="sortItems"
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
      async sortItems(columnIndex){
          this.active = columnIndex;
          await this.$store.dispatch("product/getProductList",this.sortOptions[columnIndex]);
      }
  },
  data() {
    return {
      sortOptions: ["id", "productName", "productSellingPrice", "productStock"],
      sortOptionsToDisplay: ["ID", "Name", "Price", "Stock"],
      active: null,
    };
  },
};
</script>