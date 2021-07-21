<template>
  <div class="flex cust-card">
    <div class="lhs-container">
      <div class="avatar" :style="getBackgroundColor">{{customer.customerName.charAt(0)}}</div>
    </div>
    <div class="flex rhs-container">
      <div class="details-1">
        <div class="name">{{customer.customerName}}</div>
        <p class="phone">{{customer.customerPhoneNumber}}</p>
      </div>
      <div class="flex details-2">
        <div class="flex credit">
          <svg-icon size="18" color="green" icon="badge-icon"></svg-icon>
          <p>{{customer.customerCreditPoint}}</p>
        </div>
        <div class="flex unpaid" v-if="customer.customerUnpaidBalance > 0">
          <svg-icon size="16" color="red"></svg-icon>
          <!-- <p>₹ {{customer.customerUnpaidBalance}}</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["customer"],
  computed: {
    getBackgroundColor() {
      const color = ["957DAD", "FFC618" , "C74BA3" , "3E45AA" ,];
      const index = Math.floor(Math.random() * 10) % color.length;
      return "background:#" + color[index];
    },
  },
};
</script>

<style lang="scss" scoped>
.cust-card {
  max-height: 80px;
  max-width: 240px;
  min-height: 80px;
  min-width: 240px;
  background: var(--gray0);
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0px 5px 15px #7070700c;
}

.cust-card:hover {
  transform: translateY(-3px);
}

.lhs-container {
  margin: auto 0px;
  .avatar {
    color: var(--gray0);
    font-family: var(--font-medium);
    font-size: 46px;
    text-align: center;
    height: 70px;
    width: 70px;
    border-radius: 100%;
    position: relative;
  }
}

.rhs-container {
  margin: auto 0px auto 20px;
  flex-direction: column;

  .details-1 {
    .name {
      font-size: 16px;
      font-family: var(--font-semibold);
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 150px;
      overflow: hidden;
    }

    .phone {
      font-size: 12px;
      font-family: var(--font-light);
      color: var(--gray5);
    }
  }

  .details-2 {
    font-family: var(--font-medium);
    margin-top: 10px;

    .credit {
      p {
        font-size: 12px;
        color: var(--green);
        margin-left: 5px;
      }
    }

    .unpaid {
      margin-left: 20px;
      p {
        font-size: 12px;
        color: var(--red);
        margin-left: 5px;
      }
    }
  }
}
</style>