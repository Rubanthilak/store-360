<template>
    <input :placeholder=inputFieldPlaceHolder v-model=inputFieldValue />
</template>

<script>

export default {
   data(){
       return {
           inputFieldPlaceHolder: "Search Items...",
           inputFieldValue : ""
       }
   },
}
</script>

<style scoped lang="scss">
   input
   {
       display: flex;
       min-width: calc(85% - 30px);
       padding: 0px 15px;
       height:40px;
       border: none;
       outline: none;
       box-shadow: 0px 3px 15px rgb(0, 0, 0, 0.05);
       border-radius: 4px;
   }
</style>