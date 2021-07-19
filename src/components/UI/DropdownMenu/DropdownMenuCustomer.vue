<template>
  <dropdown-menu>
    <template #options>
      <div class="dropdown-option" @click="editCustomer">
        <p>Edit Customer</p>
      </div>
      <div class="dropdown-option" @click="deleteCustomer">
        <p>Delete Customer</p>
      </div>
    </template>
  </dropdown-menu>
</template>

<script>
export default {
  props: ["customerId"],
  methods: {
    deleteCustomer() {
      this.$store.commit("customer/setCustomerIdToDelete", this.customerId);
      this.$store.commit("setActivePopup", "popup-delete-customer");
    },
    editCustomer() {
      this.$router.replace('/customers/'+ this.customerId +'/edit')
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown-subs {
  padding: 2px 0px;
  margin: 0px 20px 5px 20px;
  border-bottom: 1px solid var(--gray2);
  P {
    font-size: 15px;
    font-family: var(--font-bold);
    color: var(--gray4);
  }
}

.dropdown-option {
  padding: 5px 20px;
  display: flex;
  gap: 10px;
  align-items: center;

  p {
    font-size: 14px;
    font-family: var(--font-medium);
    color: var(--gray6);
  }
}

.checkbox {
  height: 14px;
  width: 14px;
  border: 1px solid var(--blue);
  background: var(--aqua);
  border-radius: 3px;
  position: relative;

  .checkmark {
    position: absolute;
    background: var(--blue);
    top: 0;
    left: 0;
    height: 14px;
    width: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>