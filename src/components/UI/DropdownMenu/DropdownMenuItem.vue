<template>
  <dropdown-menu>
    <template #options>
      <div class="dropdown-subs">
        <p>COLUMNS</p>
      </div>
      <div class="dropdown-option">
        <div class="checkbox" @click="columnSelected('hsc_code')"></div>
        <p>HSC Code</p>
      </div>
      <div class="dropdown-option">
        <div class="checkbox"  @click="columnSelected('tax_type')"></div>
        <p>Tax Type</p>
      </div>
      <div class="dropdown-option">
        <div class="checkbox"  @click="columnSelected('tax_percent')"></div>
        <p>Tax %</p>
      </div>
      <div class="dropdown-option">
        <div class="checkbox"  @click="columnSelected('mrp_price')"></div>
        <p>MRP Price</p>
      </div>
       <div class="dropdown-option">
        <div class="checkbox"  @click="columnSelected('bar_code')"></div>
        <p>Barcode</p>
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
  emits: ["columnSelected"],
  methods: {
    columnSelected(columnName){
      this.$emit("columnSelected",columnName);
    }
  },
};
</script>

<style lang="scss" scoped>
.dropdown-subs {
  padding: 2px 0px;
  margin: 0px 20px 5px 20px;
  border-bottom: 1px solid var(--gray2);
  P {
    font-size: 15px;
    font-family: var(--font-bold);
    color: var(--gray4);
  }
}

.dropdown-option {
  padding: 5px 20px;
  display: flex;
  gap:10px;
  align-items: center;

  p {
    font-size: 14px;
    font-family: var(--font-medium);
    color: var(--gray6);
  }
}

.checkbox{
  height:14px;
  width:14px;
  border: 1px solid var(--blue);
  background: var(--aqua);
  border-radius: 3px;
}
</style>