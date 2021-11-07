<template>
    <div>
        <h1>Template Manager</h1>
        <the-button :label="'1'" @click="test(1)"></the-button>
        <the-button :label="'2'" @click="test(2)"></the-button>
    </div>
</template>

<script>
export default {
    methods: {
        test(i){
            this.$store.dispatch("setting/updateCurrentInvoiceTemplate",i)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>