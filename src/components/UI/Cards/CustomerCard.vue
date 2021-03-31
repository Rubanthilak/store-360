<template>
  <div class="flex cust-card">
    <div class="lhs-container">
      <div class="avatar"></div>
    </div>
    <div class="flex rhs-container">
      <div class="details-1">
        <p class="name">Sathish Kumar</p>
        <p class="phone">9562154859</p>
      </div>
      <div class="flex details-2">
        <div class="flex credit">
          <p>748</p>
        </div>
        <div class="flex unpaid">
          <p>₹ 98.50</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.cust-card {
  max-height: 80px;
  max-width: 240px;
  min-height: 80px;
  min-width: 240px;
  background: var(--gray0);
  padding: 10px 20px;
  border-radius: 4px;
}

.lhs-container {
  margin: auto 0px;
  .avatar {
    height: 70px;
    width: 70px;
    border-radius: 100%;
    background: var(--blue);
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
      }
    }

    .unpaid {
      margin-left: 30px;
      p {
        font-size: 12px;
        color: var(--red);
      }
    }
  }
}
</style>