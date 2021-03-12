<template>
    <input :placeholder=value />
</template>

<script>

export default {
   data(){
       return {
           value: "Search Items..."
       }
   }
}
</script>

<style scoped lang="scss">
   input
   {
       display: block;
       width: calc(100% - 30px);
       padding: 15px 15px;
       border: none;
       outline: none;
       box-shadow: 0px 5px 10px rgb(0, 0, 0, 0.05);
       border-radius: 4px;
   }
</style>