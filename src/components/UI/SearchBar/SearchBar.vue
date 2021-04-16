<template>
    <input :placeholder=inputFieldPlaceHolder v-model=inputFieldValue @input="validateInputField($event)"/>
</template>

<script>

export default {
    emits: ["enter","typing"],
   data(){
       return {
           inputFieldPlaceHolder: "Search Items...",
           inputFieldValue : ""
       }
   },
   methods : {
       validateInputField(e){
           if(e.keyCode === 13 && (this.inputFieldValue !== "")){
               this.$emit("enter",this.inputFieldValue);
           }
           else {
               this.$emit("typing",this.inputFieldValue);
           }
       }
   }
}
</script>

<style scoped lang="scss">
   input
   {
       display: flex;
       width: 100%;
       padding: 0px 15px;
       height: 36px;
       border: none;
       outline: none;
       box-shadow: 0px 3px 15px rgb(0, 0, 0, 0.05);
       border-radius: 4px;  
   }
</style>