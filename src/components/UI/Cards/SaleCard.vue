<template>
  <div class="sale-card">
    <div class="card-header">
      <h1>Invoice {{sale.id}}</h1>
      <div></div>
    </div>
    <div class="card-body">
      <div class="attribute">
        <p class="key">Customer</p>
        <p class="value name">{{sale.customerId}}</p>
      </div>
      <div class="attribute">
        <p class="key">Date</p>
        <p class="value">{{sale.createdAt.toDateString()}}</p>
      </div>
      <div class="attribute">
        <p class="key">Amount</p>
        <p
          class="value"
        >₹ {{((+sale.cashAmount)+(+sale.cardAmount)+(sale.upiAmount)+(+sale.unpaidAmount)).toFixed(2)}}</p>
      </div>
      <div class="attribute">
        <p class="key">Payment Method</p>
        <p class="value">{{sale.paymentMethod}}</p>
      </div>
    </div>
    <div class="card-footer">
      <router-link :to="'/sales/'+sale.id">
        <the-button label="View Invoice" ></the-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
    props: ["sale"]
}
</script>

<style lang="scss" scoped>
.sale-card {
  background: white;
  padding: 25px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 250px;
  box-shadow: 0px 3px 15px #ececec;
}

.card-header {
  padding-bottom: 1rem;
  border-bottom: 1px solid #e4e4e479;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  .attribute {
    display: flex;
    justify-content: space-between;
    p {
      font-size: 14px;
    }
    .key {
      color: var(--gray3);
    }
    .value {
      color: var(--gray6);
      font-family: var(--font-semibold);

      &.name {
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 155px;
        overflow: hidden;
        text-align: right;
      }
    }
  }
}
</style>