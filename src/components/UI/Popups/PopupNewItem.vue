<template>
    <the-popup :open="open" @close="close">
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
                <p class="error-text" v-if="errorFlag">Please fill all the fields*</p>
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
            },
            errorFlag: false
        }
    },
    methods: {
        close(){
            this.errorFlag = false;
            this.$emit('close');
        },
        validateNewItem(){
            if( 
            this.product.productName === "" ||
            this.product.productQuantity === null ||
            this.product.productMrpPrice === null ||
            this.product.productSellingPrice === null ||
            this.product.productBarcode === null
            ){
                this.errorFlag = true;
            }
            else{
                this.errorFlag = false;
                this.createNewItem()
            }
        },
        async createNewItem(){
            await this.$store.dispatch("product/postProduct",this.product);
            this.product.productName= "";
            this.product.productQuantity= null;
            this.product.productMrpPrice= null;
            this.product.productSellingPrice= null;
            this.product.productBarcode= null;
            this.close();
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

.error-text{
    color: var(--red);
    font-family: var(--font-medium);
    font-size: 12px;
    margin-bottom: 15px;
}

.input-container{
    flex-direction: column;
    margin-top: 15px;

    input{
        margin-bottom: 20px;
        padding: 8px 10px;
        border-radius: 4px;
        border: 2px solid var(--gray2);
        font-family: var(--font-regular);
        width: 320px;

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
            margin-left: 15px;
        }
    }
}
</style>