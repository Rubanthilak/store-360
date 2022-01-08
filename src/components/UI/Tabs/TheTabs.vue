<template>
  <div class="flex tab-wrapper">
    <div
      v-for="(cart,index) in cartList"
      :class="['tab',{'is-active':(index === isActive)}]"
      :key="index"
      @click="setTab(index)"
    >
      <p>{{cart.customer === null ? "New Tab" : cart.customer.customerName}}</p>
      <svg-icon class="close-button" @click="removeTab(index)" icon="cross-icon" color="gray8" hover-color="gray0" size="18"></svg-icon>
    </div>
    <div class="add-tab" @click="addTab">
      <p>+</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cartList"],
  data() {
    return {
      isActive: null,
    };
  },
  methods: {
   setTab(key) {
      this.cartList.forEach((cart,index) => {
        if (index === key) {
          this.isActive = key;
        }
      });
    },
    addTab() {
      if (this.cartList.length < 10) {
        this.$emit("addTab")
        this.setTab(this.cartList.length - 1);
      } else {
        // this.$store.commit("showSnackBar", "Maximum 10 tabs only.");
        this.$moshaToast("Maximum 10 tabs only.", {
          type: "danger",
          hideProgressBar: "true",
          position: "bottom-right",
          transition: "bounce",
        });
      }
    },
    removeTab(key) {
      if (this.cartList.length > 1) {
        if(key === this.cartList.length - 1){
          this.setTab(key-1);
        }
        this.$emit("tabRemoved",key);
      } else {
        // this.$store.commit("showSnackBar", "Atleast 1 tab should be open.");
        this.$moshaToast("Atleast 1 tab should be open.", {
          type: "danger",
          hideProgressBar: "true",
          position: "bottom-right",
          transition: "bounce",
        });
      }
    },
  },
  mounted() {
    this.isActive = 0;
  },
  updated(){
    this.$emit("tabSwitched",this.isActive)
  }
};
</script>

<style lang="scss" scoped>

.close-button{
  margin-right: 8px;
  border-radius:5px;   
  padding:1px; 
  display:none;

  &:hover{
    background: var(--red);
  }
}

.tab-wrapper {
  background: #cecece;
  .add-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: var(--blue);
      p {
        color: var(--gray0);
      }
    }
    p {
      margin: 0px 10px;
      font-size: 26px;
      font-family: var(--font-medium);
      color: var(--gray8);
    }
  }

  .tab {
    height: 40px;
    width: 100%;
    min-width: 50px;
    max-width: 200px;
    display: flex;
    background: var(--gray2);
    align-items: center;
    justify-content: space-between;
    margin-right: 3px;
    transition: all 0.2s;

    &:hover{
      .close-button{
        display:block;
      }
    }

    &.is-active {
      background: var(--gray1);
      .close-button{
        display:block;
      }
    }

    p {
      font-size: 14px;
      margin: 0px 10px;
      font-family: var(--font-medium);

      &:first-child {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}

</style>