<template>
  <section class="container">
    <div class="flex">
      <search-bar :placeHolder="'Search Sale by Customer Phone, Invoice Number, ...'"></search-bar>
    </div>
    <hr />
    <div class="sales-list">
      <div class="sale-card">
        <div class="card-header">
          <h1>Invoice {{sale.id}}</h1>
          <div></div>
        </div>
        <div class="card-body">
          <div class="attribute">
            <p class="key">Customer</p>
            <p class="value name">{{sale.customerName}}</p>
          </div>
          <div class="attribute">
            <p class="key">Date</p>
            <p class="value">{{sale.createdAt}}</p>
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
          <the-button label="View Invoice"></the-button>
        </div>
      </div>
    </div>
    <div class="paginator">
      <div class="page-link">&lt;</div>
      <div class="page-link">1</div>
      <div class="page-link">2</div>
      <div class="page-link">3</div>...
      <div class="page-link">6</div>
      <div class="page-link">&gt;</div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      sale: {
        id: 123456,
        customerName: "Sree Sakthi Enterprise",
        paymentMethod: "Cash",
        cashAmount: 1000,
        cardAmount: null,
        upiAmount: null,
        unpaidAmount: null,
        createdAt: "12/03/2021",
      },
    };
  },
};
</script>

<style scoped lang="scss">
.sales-list {
  margin-top: 15px;
  height: calc(100vh - 180px);
  overflow: auto;

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
        }
      }
    }
  }
}

.paginator {
  display: flex;
  margin: 0px auto;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  .page-link {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 60px;
    border-radius: 4px;
    background: var(--gray0);
    font-family: var(--font-semibold);
    cursor: pointer;
    font-size: 12px;
    transition: all 0.3s smooth;

    &:hover {
      background: var(--blue);
      color: var(--gray0);
    }
  }
}
</style>