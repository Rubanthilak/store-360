<template>
    <popup-new-item :open="this.$store.state.activePopup==='popup-new-item'" @close="closePopup"></popup-new-item>
</template>
<script>
import PopupNewItem from './PopupNewItem.vue'
export default {
  components :{
    PopupNewItem 
  },
  methods: {
      closePopup(){
          this.$store.commit("setActivePopup","")
      }
  }
}
</script>