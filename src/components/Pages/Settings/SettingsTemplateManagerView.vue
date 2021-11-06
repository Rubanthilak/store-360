<template>
    <div>
        <h1>Template Manager</h1>
        <the-button @click="test"></the-button>
    </div>
</template>

<script>
export default {
    methods: {
        test(){
            this.$store.commit("setCurrentPrinterTemplate",2)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>