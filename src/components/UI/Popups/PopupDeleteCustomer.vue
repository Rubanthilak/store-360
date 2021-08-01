<template>
  <the-popup :open="open" @close="close">
    <template #header>
      <h1>Archive Customer</h1>
    </template>
    <template #content>
      <div class="para-container">
        <p>Are you sure to archive this customer ? All the related records will be hidden.</p>
      </div>
    </template>
    <template #actions>
      <div class="flex button-container">
        <the-button label="Go, Back" @click="close"></the-button>
        <the-button label="Archive" color="red" @click="deleteCustomer"></the-button>
      </div>
    </template>
  </the-popup>
</template>

<script>
export default {
  props: ["open"],
  emits: ["close"],
  methods: {
    close() {
      this.$emit("close");
    },
    async deleteCustomer() {
      var res = await this.$store.dispatch(
        "customer/deleteCustomer",
        this.$store.getters["customer/getCustomerIdToDelete"]
      );
      if(res){
        this.$router.replace("/customers")
      }
      else {
        this.$store.commit("showSnackBar", "Unable to delete the customer record");
      }
      this.$store.commit("customer/setCustomerIdToDelete", null);
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 18px;
  font-family: var(--font-semibold);
}

p {
  color: var(--gray3);
  font-size: 14px;
}

.para-container {
  width: 350px;
  margin: 20px 0px;
}

.button-container {
  width: 100%;
  margin-top: 5px;

  div {
    width: 100%;

    &:last-child {
      margin-left: 15px;
    }
  }
}
</style>