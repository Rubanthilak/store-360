<template>
  <div class="flex cust-card">
    <div class="lhs-container">
      <div class="avatar" :style="getBackgroundColor">S</div>
    </div>
    <div class="flex rhs-container">
      <div class="details-1">
        <p class="name">Sathish Kumar</p>
        <p class="phone">9562154859</p>
      </div>
      <div class="flex details-2">
        <div class="flex credit">
          <badge-icon size="18" color="green"></badge-icon>
          <p>748</p>
        </div>
        <div class="flex unpaid">
          <wallet-icon size="16" color="red"></wallet-icon>
          <p>₹ 98.50</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BadgeIcon from "../Icons/BadgeIcon";
import WalletIcon from "../Icons/WalletIcon";
export default {
  components: {
    BadgeIcon,
    WalletIcon
  },
  computed: {
    getBackgroundColor(){
     const color = ["red","green","orange","blue"];
     const index = Math.floor(Math.random() * 10)%4;
     return "background: var(--"+color[index]+")";
    }
  }
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
    }

    .phone {
      font-size: 12px;
      font-family: var(--font-light);
      color: var(--gray5);
    }
  }

  .details-2 {
    font-family: var(--font-medium);
    margin-top : 10px;

    .credit {
      p {
        font-size: 12px;
        color: var(--green);
        margin-left : 5px;
      }
    }

    .unpaid {
      margin-left: 20px;
      p {
        font-size: 12px;
        color: var(--red);
        margin-left : 5px;
      }
    }
  }
}
</style>