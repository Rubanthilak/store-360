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
  props :["sortOrder"],
  methods: {
      sort(columnIndex){
          this.active = columnIndex;
          this.$emit("selected",{index:this.active,value:this.sortOptions[columnIndex] })
      }
  },
  data() {
    return {
      sortOptions: ["ASC", "DESC"],
      sortOptionsToDisplay: ["Oldest", "Newest"],
      active: null,
    };
  },
  mounted(){
    this.active= this.sortOrder.index
  }
};
</script>