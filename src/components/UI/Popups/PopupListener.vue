<template>
  <teleport to="body">
    <popup-new-item :open="this.$store.state.activePopup==='popup-new-item'" @close="closePopup"></popup-new-item>
    <popup-delete-item  :open="this.$store.state.activePopup==='popup-delete-item'" @close="closePopup"></popup-delete-item>
    <popup-new-customer  :open="this.$store.state.activePopup==='popup-new-customer'" @close="closePopup"></popup-new-customer>
  </teleport>
</template>
<script>
import PopupNewItem from "./PopupNewItem";
import PopupDeleteItem from "./PopupDeleteItem";
import PopupNewCustomer from "./PopupNewCustomer";
export default {
  components: {
    PopupNewItem,
    PopupDeleteItem,
    PopupNewCustomer
  },
  async updated() {
    await this.$store.dispatch("product/getProductList");
  },
  methods: {
    closePopup() {
      this.$store.commit("setActivePopup", "");
    },
  },
};
</script>