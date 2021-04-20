<template>
  <teleport to="body">
    <transition name="snackbar">
      <div id="snackbar" v-if="isActive">{{text}}</div>
    </transition>
  </teleport>
</template>

<script>
export default {
  computed: {
    isActive() {
      return this.$store.state.activeSnackBar.visible;
    },
    text() {
      return this.$store.state.activeSnackBar.text;
    },
  },
};
</script>

<style lang="scss" scoped>
#snackbar {
  min-width: 200px;
  max-width: 300px;
  margin-left: -125px;
  background-color: var(--red);
  color: var(--gray0);
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  right: 30px;
  bottom: 30px;
  border-radius: 4px;
  font-family: var(--font-regular);
  font-size: 14px;
}

.snackbar-enter-active,
.snackbar-leave-active {
  transition: all 0.3s ease;
}

.snackbar-enter-from {
  opacity: 0;
  transform: translateX(50px) scale(0.9);
}

.snackbar-leave-to {
  opacity: 0;
}
</style>