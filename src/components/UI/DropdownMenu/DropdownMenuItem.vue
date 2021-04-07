<template>
  <dropdown-menu>
    <template #options="slotProps">
      <div class="dropdown-subs">
        <p>SORT BY</p>
      </div>
      <div @click="sortColumn('id',slotProps.closeTrigger)" class="dropdown-option">
        <p>ID</p>
      </div>
      <div @click="sortColumn('productName',slotProps.closeTrigger)" class="dropdown-option">
        <p>Name</p>
      </div>
      <div @click="sortColumn('productQuantity',slotProps.closeTrigger)" class="dropdown-option">
        <p>Stock</p>
      </div>
      <div @click="sortColumn('productMrpPrice',slotProps.closeTrigger)" class="dropdown-option">
        <p>MRP Price</p>
      </div>
      <div class="dropdown-subs">
        <p>TOOLS</p>
      </div>
      <router-link to="/items/add">
        <div class="dropdown-option">
          <p>Add Items</p>
        </div>
      </router-link>
    </template>
  </dropdown-menu>
</template>

<script>
export default {
  methods: {
    async sortColumn(columnToSort,closeDropdownMenu) {
      closeDropdownMenu();
      await this.$store.dispatch("product/getProductList", columnToSort);
    },
  },
};
</script>

<style lang="scss" scoped>

.dropdown-subs{
  padding : 2px 0px;
  margin: 0px 20px 5px 20px;
  font-family: var(--font-semibold);
  color: var(--gray3);
  border-bottom: 1px solid var(--gray2);
  font-size: 15px;
}

.dropdown-option{
  padding : 5px 20px;
  font-size: 14px;
  cursor: pointer;
  font-family: var(--font-medium);
  color: var(--gray3);



  &:hover{
    background: var(--blue);
    color: var(--gray0);
  }
}
</style>