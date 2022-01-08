<template>
  <section>
    <the-tabs></the-tabs>
  </section>
</template>

<style lang="scss" scoped>

section {
  padding-top: 0px !important;
  min-width: 1200px;
  width: 100%;
}

th {
  &:nth-of-type(1),
  &:nth-of-type(2) {
    text-align: left !important;
  }

  &:nth-of-type(3) {
    text-align: center !important;
  }
}

td {
  &:nth-of-type(1),
  &:nth-of-type(2) {
    text-align: left !important;
  }

  &:nth-of-type(3) {
    text-align: center !important;
  }
}


.A4{
  height: 85vh;
  overflow: auto;
  width: 700px;
  background: white;
  margin: 0px auto;
  border-radius: 5px;
}

.eighty-mm {
  width: 302px;
  max-width: 302px;
  overflow: auto;
  max-height: 85vh;
  background: white;
  margin: 0px auto;
  border-radius: 3px;
}

.count-box{
display:flex;
  gap:1rem;
  width:100%;
  justify-content:center;
  align-items:center;

  input{
    width:50%;
    text-align: center;
    font-family: var(--font-regular);
    border-radius:5px;
    border: 2px solid var(--gray2);

    &:focus{
      border: 2px solid var(--blue);
    }
  }

  .min-btn{
    background: var(--gray1);
    max-height: 20px;
    max-width: 20px;
    min-height: 20px;
    min-width: 20px;
    border-radius: 25px;
    text-align:center;
    transition: all 0.3s;
    box-shadow:inset 0px 0px 25px rgb(0,0,0,0.05);

    &.blue:hover{
      background: var(--blue);
      color: var(--gray0)
    }

    &.red:hover{
      background: var(--red);
      color: var(--gray0)
    }
  }

}

.tab-body {
  background: var(--gray1);
  margin: 20px auto;
  display: grid;
  grid-template-columns: auto 350px;
  gap: 20px;
  min-width: 1180px;
  width: 95%;
  height: calc(100vh - 100px);
  overflow: auto;
}

.remove-icon {
  &:hover {
    background: var(--red);
  }
  background: var(--gray2);
  cursor: pointer;
  border-radius: 360px;
  padding: 2px;
}

.tab-lhs,
.tab-rhs {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: var(--gray1);
}

.menu-bar {
  max-width: 100%;
}

.bill-card {
  background: var(--gray0);
  width: calc(100% - 40px);
  // height: calc(100% - 40px);
  border-radius: 6px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.01);
  display: flex;
  flex-direction: column;
  padding: 20px;
  // margin-top: 68px;
  margin-bottom:25px;
  .header {
    P {
      background: var(--gray1);
      font-family: var(--font-bold);
      padding: 8px 10px;
      font-size: 14px;
      border-radius: 4px;
    }
  }

  .content {
    p {
      font-size: 14px;
      font-family: var(--font-medium);
    }
    .summ-wrapper {
      margin: 10px 10px;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .flex {
        justify-content: space-between;
        align-items: center;

        &:last-child {
          // border-top: 2px dashed #dbdbdb;
          padding-top: 10px;
        }
      }

      .total {
        font-size: 36px;
        line-height: 36px;
        font-family: var(--font-semibold);
      }
    }
  }

  .content {
    .cust-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-top: 20px;
      .cust {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .avatar {
        height: 50px;
        width: 50px;
        background: var(--blue);
        color: var(--gray0);
        border-radius: 360px;
        font-size: 32px;
        font-family: var(--font-semibold);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .details {
        .name {
          font-family: var(--font-semibold);
        }
        .phone {
          color: var(--gray3);
        }
      }
    }
  }

  .content {
    .paym-wrapper {
      margin-top: 20px;
      transition: all 0.3s;
      .split-wrapper {
        margin-top: 20px;
        display: flex;
        gap: 1rem;
        input {
          border: 2px solid var(--gray2);
          width: 100%;
          padding: 8px 5px;
          border-radius: 4px;
          font-family: var(--font-regular);
          font-size: 12px;
        }
      }
    }
  }
}

.print-preview {
  margin: 0px auto;
  width: 95%;
  justify-content: space-between;
  gap: 2rem;

  .side-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    margin: 25px 0px;

    .price-card {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 25px;
      background: var(--gray0);
      border-radius: 4px;
      box-shadow: 0px 3px 15px #0000000e;

      input {
        padding: 8px 10px;
        border-radius: 4px;
        border: 2px solid var(--gray2);
        font-family: var(--font-regular);
        width: 100%;

        &:focus {
          border: 2px solid var(--blue);
          outline: none;
        }
      }
      .apart {
        justify-content: space-between;
        gap: 1rem;
      }
    }
  }
}
</style>