<template>
  <div class="card">
    <p class="header">{{ customer.customerName }}</p>
    <div class="action-tags">
      <div class="tag credit">
          <svg-icon
            icon="badge-icon"
            color="green"
            size="16"
          ></svg-icon>
        {{ customer.customerCreditPoint }}
      </div>
      <div class="tag unpaid">
        <p>₹</p> 
        {{ customer.customerUnpaidBalance.toFixed(2) }}
      </div>
    </div>
    <hr/>
    <div class="flex details-wrapper">
      <div>
        <p class="title">Date Joined</p>
        <p class="value">{{ customer.createdAt.toDateString() }}</p>
      </div>
      <div>
        <p class="title">Phone</p>
        <p class="value">{{ customer.customerPhoneNumber }}</p>
      </div>
      <div>
        <p class="title">Billing Address</p>
        <p class="value" style="width: 75%">{{ customer.customerDoorNumber ? fullAddress : 'Not Available'}}</p>
      </div>
      <div>
        <p class="title">Shipping Address</p>
        <p class="value" style="width: 75%">{{ customer.customerDoorNumber ? fullAddress : 'Not Available'}}</p>
      </div>
      <div>
        <p class="title">GSTIN Number</p>
        <p class="value">{{ customer.customerGstinNumber ? customer.customerGstinNumber : 'Not Available'}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["customer"],
  computed: {
    fullAddress() {
      return (
        `` +
        this.customer.customerDoorNumber + `, ` +
        this.customer.customerStreetName + `, ` +
        this.customer.customerCityName + `, ` +
        this.customer.customerStateName + `, Pincode - ` +
        this.customer.customerPincode
      );
    },
  },
};
</script>

<style lang="scss" scoped>

.card{
    width: 300px;
    background: var(--gray0);
    padding:25px;
    border-radius: 5px;
    box-shadow: 0px 0px 15px rbg(0,0,0,0.26);
}

.header{
  font-size: 32px;
  margin-bottom: 10px;
  font-family: var(--font-semibold);
}

.action-tags{
  display:flex;
  justify-content: left;
  gap: 1rem;
  margin-bottom: 25px;

  .tag{
    border-radius: 25px;
    font-family: var(--font-semibold);
    width: 100px;
    text-align:center;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }

  .credit{
    background: rgba(9, 195, 114, 0.2);
    color: var(--green);
  }
  .unpaid{
    background: rgba(239, 72, 72, 0.2);
    color: var(--red);
    p{
      color: var(--red);
      font-family: var(--font-semibold);
    }
  }
}

.details-wrapper{
    flex-direction: column;
    gap:1rem;

    .title{
        font-family: var(--font-semibold);
        margin-bottom: 0.125rem;
    }

    .value{
        font-family: var(--font-regular);
    }
}
</style>