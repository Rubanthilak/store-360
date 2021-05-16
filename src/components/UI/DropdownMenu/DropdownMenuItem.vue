<template>
  <dropdown-menu>
    <template #options>
      <div class="dropdown-subs">
        <p>COLUMNS</p>
      </div>
      <div class="dropdown-option">
        <div class="checkbox" @click="columnSelected('hsc_code')">
           <div class="checkmark" v-if="columnData.hsc_code.visible">
            <svg-icon icon="search-icon" color="gray0" size="12"></svg-icon>
          </div>
        </div>
        <p>HSC Code</p>
      </div>
      <div class="dropdown-option">
        <div class="checkbox"  @click="columnSelected('tax_type')">
           <div class="checkmark" v-if="columnData.tax_type.visible">
            <svg-icon icon="search-icon" color="gray0" size="12"></svg-icon>
          </div>
        </div>
        <p>Tax Type</p>
      </div>
      <div class="dropdown-option">
        <div class="checkbox"  @click="columnSelected('tax_percent')">
           <div class="checkmark" v-if="columnData.tax_percent.visible">
            <svg-icon icon="search-icon" color="gray0" size="12"></svg-icon>
          </div>
        </div>
        <p>Tax %</p>
      </div>
      <div class="dropdown-option">
        <div class="checkbox"  @click="columnSelected('mrp_price')">
           <div class="checkmark" v-if="columnData.mrp_price.visible">
            <svg-icon icon="search-icon" color="gray0" size="12"></svg-icon>
          </div>
        </div>
        <p>MRP Price</p>
      </div>
       <div class="dropdown-option">
        <div class="checkbox"  @click="columnSelected('bar_code')">
          <div class="checkmark" v-if="columnData.bar_code.visible">
            <svg-icon icon="search-icon" color="gray0" size="12"></svg-icon>
          </div>
        </div>
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
  props: ["columnData"],
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
  position: relative;

  .checkmark{
    position: absolute;
    border-radius: 3px;
    background: var(--blue);
    top:0;
    left:0;
    height:14px;
    width:14px;
    display: flex;
    align-items: center;
  }

}
</style>