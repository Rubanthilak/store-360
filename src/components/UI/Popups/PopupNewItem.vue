<template>
    <the-popup :open="open" @close="$emit('close')">
        <template #header>
            <div>
                <h2>Add New Item</h2>
            </div>
        </template>
        <template #content>
            <div class="flex input-container">
                <input type="text" placeholder="Name" v-model="product.productName">
                <input type="number" placeholder="Quantity" v-model="product.productQuantity">
                <input type="number" placeholder="MRP Price" v-model="product.productMrpPrice">
                <input type="number" placeholder="Selling Price" v-model="product.productSellingPrice">
                <input type="number" placeholder="Barcode" v-model="product.productBarcode">
            </div>
        </template>
        <template #actions>
            <div class="flex button-container">
                <the-button label="Cancel" color="red" @click="$emit('close')"></the-button>
                <the-button label="Create"  @click="createNewItem"></the-button>
            </div>
        </template>
    </the-popup>
</template>

<script>
export default {
    props:["open"],
    emits: ["close"],
    data(){
        return {
            product : {
                productName: "",
                productQuantity: null,
                productMrpPrice: null,
                productSellingPrice: null,
                productBarcode: null,
            }
        }
    },
    methods: {
        async createNewItem(){
            const res = await this.$store.dispatch("postProduct",this.product);
            console.log(res);
            this.product.productName= "";
            this.product.productQuantity= null;
            this.product.productMrpPrice= null;
            this.product.productSellingPrice= null;
            this.product.productBarcode= null;
            this.$emit('close');
        }
    }
}
</script>

<style lang="scss" scoped>

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

h2{
    font-family: var(--font-semibold);
}

.input-container{
    flex-direction: column;
    margin-top: 15px;

    input{
        margin-bottom: 15px;
        padding: 8px 10px;
        border-radius: 4px;
        border: 2px solid var(--gray2);
        font-family: var(--font-regular);

        &:focus{
            border: 2px solid var(--blue);
            outline: none;
        }
    }
}
.button-container{
    width:100%;
    margin-top: 5px;

    div {
        width:100%;

        &:last-child{
            margin-left: 10px;
        }
    }
}
</style>