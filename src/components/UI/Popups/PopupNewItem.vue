<template>
  <the-popup :open="open" @close="close">
    <template #header>
      <div>
        <h2>Add New Product</h2>
      </div>
    </template>
    <template #content>
      <div class="flex" style="gap:1rem;flex-direction:column;margin-top:15px">
        <div class="flex input-container">
          <input type="text" placeholder="Name" v-model="product.productName" />
          <input type="number" placeholder="Opening Stock" v-model="product.productStock" />
        </div>
        <div class="flex input-container">
          <input type="number" placeholder="HSC Number" v-model="product.productHscNumber" />
          <input type="number" placeholder="Barcode" v-model="product.productBarcode" />
        </div>
        <!-- <div class="flex input-container">
          <input type="text" placeholder="Base Unit" v-model="product.productBaseUnit" />
          <input type="text" placeholder="Secondary Unit" v-model="product.productSecondaryUnit" />
        </div> -->
        <div class="flex input-container" v-if="product.productSecondaryUnit">
          <input type="text" :placeholder="'1 ' + product.productBaseUnit + ' = How many ' + product.productSecondaryUnit + ' ?'" v-model="product.productUnitRatio" />
        </div>
        <h1>Price & Tax</h1>
        <div class="flex input-container">
          <input type="number" placeholder="MRP Price" v-model="product.productMrpPrice" />
          <input type="number" placeholder="Selling Price" v-model="product.productSellingPrice" />
        </div>
        <div class="flex input-container">
          <list-box valueToDisplay="Tax Type" :options="taxTypeOptions" :active="taxTypeOptions.indexOf(product.productTaxType)" box-length="320px" @option-selected="setTaxType"></list-box>
          <input type="number" placeholder="Tax Percentage" v-model="product.productTaxPercentage" />
        </div>
        <div class="flex input-container">
          <p class="error-text" v-if="errorFlag">Please fill all the fields*</p>
        </div>
      </div>
    </template>
    <template #actions>
      <div class="flex button-container">
        <the-button label="Cancel" color="red" @click="close"></the-button>
        <the-button label="Create" @click="validateNewItem"></the-button>
      </div>
    </template>
  </the-popup>
</template>

<script>
export default {
  props: ["open"],
  emits: ["close"],
  data() {
    return {
      product: {
        productName: null,
        productBaseUnit: null,
        productSecondaryUnit: null,
        productUnitRatio: null,
        productMrpPrice: null,
        productSellingPrice: null,
        productBarcode: null,
        productHscNumber: null,
        productTaxPercentage: null,
        productTaxType: null,
        productStock: null,
      },
      errorFlag: false,
      taxTypeOptions: ["GST","IGST"]
    };
  },
  methods: {
    close() {
      this.errorFlag = false;
      this.product.productName = "";
      this.product.productBaseUnit = null;
      this.product.productSecondaryUnit= null;
      this.product.productUnitRatio= null;
      this.product.productMrpPrice = null;
      this.product.productSellingPrice = null;
      this.product.productBarcode = null;
      this.product.productHscNumber = null;
      this.product.productTaxPercentage = null;
      this.product.productTaxType = null;
      this.product.productStock = null;
      this.$emit("close");
    },
    validateNewItem() {
      if (
        this.product.productName === "" ||
        this.product.productMrpPrice === null ||
        this.product.productSellingPrice === null 
      ) {
        this.errorFlag = true;
      } else {
        this.errorFlag = false;
        this.createNewItem();
      }
    },
    async createNewItem() {
      if( this.product.productTaxPercentage === null){
        this.product.productTaxPercentage = 0
      }
      await this.$store.dispatch("product/postProduct", this.product);
      this.close();
    },
    setTaxType(index){
      this.product.productTaxType = this.taxTypeOptions[index]
    }
  },
};
</script>

<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

h2 {
  font-family: var(--font-semibold);
    font-size: 26px;
}

.error-text {
  color: var(--red);
  font-family: var(--font-medium);
  font-size: 12px;
  margin-bottom: 15px;
}

.input-container {
  gap:1rem;

  input {
    padding: 8px 10px;
    border-radius: 5px;
    background: var(--gray1);
    font-family: var(--font-regular);
    border: 2px solid var(--gray0);
    width: 320px;
    box-shadow: inset 0px 0px 25px rgb(0,0,0,0.05);

    &:focus {
      border: 2px solid var(--blue);
      outline: none;
      background: var(--gray0);
    }
  }
}
.button-container {
  width: 49%;
  margin-top: 5px;
  float: right;
  div {
    width: 100%;

    &:last-child {
      margin-left: 15px;
    }
  }
}
</style>