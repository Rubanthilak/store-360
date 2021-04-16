<template>
  <div class="menu-icon">
    <img src="../../../assets/icons/menu.svg" alt="menu.svg" @click="toggleMenu" />
    <transition name="dropdown">
      <div class="drop-down" v-if="menuMode">
        <slot name="options" :closeTrigger="toggleMenu"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuMode: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuMode = !this.menuMode;
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-icon {
  height: 35px;
  width: 35px;
  padding: 0px 5px;
  border: none;
  border-radius: 4px;
  background-color: var(--blue);
  outline: none;
  cursor: pointer;
  box-shadow: 0px 3px 15px rgb(0, 0, 0, 0.05);
  margin-left: 10px;
  position: relative;

  img {
    height: 20px !important;
    width: 20px !important;
    padding: 8px;
  }
}

.drop-down {
  max-height: 500px;
  min-width: 170px;
  position: absolute;
  top: 125%;
  right: 0px;
  background: white;
  z-index: 1;
  box-shadow: 0px 3px 10px #00000028;
  border-radius: 4px;
  padding: 10px 0px;
  font-family: var(--font-regular);
  cursor: default;

  &::before {
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid transparent;
    border-bottom: 8px solid var(--gray0);
    content: " ";
    position: absolute;
    top: -16px;
    right: 15px;
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease-out;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
  max-height: 0px;
}
</style>