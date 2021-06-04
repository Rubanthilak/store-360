<template>
  <section class="container" v-if="sale">
    <div class="flex">
      <div class="flex header">
        <router-link to="/sales">
          <div class="back-button">
            <svg-icon color="gray8" size="34" icon="back-icon"></svg-icon>
          </div>
        </router-link>
        <div>
          <h1>Invoice #{{sale.id}}</h1>
        </div>
      </div>
      <div class="flex button-container"></div>
    </div>
    <hr />
    <div v-if="customer">
      <div class="title">
        <p>CUSTOMER</p>
      </div>
      <customer-card :customer="customer"></customer-card>
      <div class="title">
        <p>BILL SUMMARY</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      sale: null,
      customer: null,
    };
  },
  async mounted() {
    this.sale = await this.$store.dispatch(
      "sale/getSalesById",
      this.$route.params.id
    );
    this.customer = await this.$store.dispatch(
      "customer/getCustomerById",
      this.sale.customerId
    );
  },
};
</script>

<style lang="scss" scoped>
.flex {
  justify-content: space-between;
  align-items: center;
}

.button-container {
  div {
    margin-left: 10px;
  }
}

.header {
  h1 {
    font-family: var(--font-semibold);
    margin: 0px 10px;
    font-size: 22px;
  }

  p {
    margin: 0px 10px;
    color: var(--gray4);
    font-family: var(--font-light);
  }
}

.back-button {
  justify-content: center;
  align-items: center;
  display: flex;
}

.title {
  display: flex;
  justify-content: space-between;
  margin:20px 0px;
  p {
    font-family: var(--font-semibold);
    color: var(--gray3);
    margin: 0px;
  }
}
</style>