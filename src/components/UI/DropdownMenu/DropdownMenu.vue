<template>
  <div class="menu-icon">
    <img src="../../../assets/icons/menu.svg" alt="menu.svg" @click="toggleMenu"/>
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
  height: 40px;
  width: 40px;
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
    height: 24px !important;
    width: 24px !important;
    padding: 8px;
  }
}

.drop-down {
  max-height: 200px;
  min-width: 150px;
  position: absolute;
  top: 120%;
  right: 0px;
  background: white;
  z-index: 1;
  box-shadow: 0px 3px 10px #00000028;
  border-radius: 4px;
  overflow: hidden;
  padding: 10px 0px;
  font-family: var(--font-regular);
  cursor: default;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease-out;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0px;
}
</style>