<template>
  <teleport to="body">
    <popup-new-item :open="this.$store.state.activePopup==='popup-new-item'" @close="closePopup"></popup-new-item>
    <popup-delete-item  :open="this.$store.state.activePopup==='popup-delete-item'" @close="closePopup"></popup-delete-item>
  </teleport>
</template>
<script>
import PopupNewItem from "./PopupNewItem";
import PopupDeleteItem from "./PopupDeleteItem";
export default {
  components: {
    PopupNewItem,
    PopupDeleteItem,
  },
  async updated() {
    await this.$store.dispatch("getProductList");
  },
  methods: {
    closePopup() {
      this.$store.commit("setActivePopup", "");
    },
  },
};
</script>