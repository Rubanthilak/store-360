<template>
  <the-popup :open="open" @close="close">
    <template #header>
      <div>
        <h2>New Payment</h2>
      </div>
    </template>
    <template #content>
      <list-box
        @option-selected="setPaymentMethod"
        value-to-display="Select Payment"
        :options="paymentOptions"
        :active="activePaymentMethod"
      ></list-box>
      <div class="flex row">
        <input
          type="number"
          placeholder="Enter Amount"
          v-model="amountEntered"
          :min="1"
        />
        <date-picker @pick="dateFilter" label="Pick Date"></date-picker>
      </div>
      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
    </template>
    <template #actions>
      <div class="flex button-container">
        <the-button label="Add Payment" @click="validateInput"></the-button>
      </div>
    </template>
  </the-popup>
</template>

<script>
export default {
  emits: ["close"],
  props: ["open", "id"],
  data() {
    return {
      paymentOptions: ["Card Payment", "Cash Payment", "UPI Payment"],
      activePaymentMethod: null,
      dateSelected: null,
      amountEntered: null,
      errorMessage: null,
    };
  },
  methods: {
    close() {
      this.activePaymentMethod = null;
      this.dateSelected = null;
      this.amountEntered = null;
      this.errorMessage = null;
      this.$emit("close");
    },
    setPaymentMethod(option) {
      this.activePaymentMethod = option;
    },
    dateFilter(date) {
      this.dateSelected = date;
    },
    async validateInput() {
      if (this.amountEntered < 0) {
        this.errorMessage = "Please enter amount greater than zero";
        return;
      }
      if (
        this.activePaymentMethod !== null &&
        this.dateSelected !== null &&
        this.amountEntered !== null &&
        this.amountEntered !== ""
      ) {
        await this.$store.dispatch("sale/addPayment", {
          saleId: this.id,
          paymentMethod: ["Card", "Cash", "UPI"][this.activePaymentMethod],
          amountPaid: this.amountEntered,
          dateOfTransaction: this.dateSelected,
        });
        this.$emit("close");
        this.activePaymentMethod = null;
        this.dateSelected = null;
        this.amountEntered = null;
        this.errorMessage = null;
      } else {
        this.errorMessage = "Please fill all the fields";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  gap: 0.5rem;
  margin-top: 20px;
  align-items: center;
}

input {
  border-radius: 4px;
  border: 2px solid var(--gray2);
  font-family: var(--font-regular);
  font-size: 12px;
  width: 180px;
  padding: 7px 0px;
  padding-left: 10px;
}

.button-container {
  width: 100%;
  gap: 1rem;

  div {
    width: 100%;
  }
}

.error-text {
  font-family: var(--font-medium);
  color: var(--red);
  font-size: 12px;
  margin-top: 15px;
}

</style>