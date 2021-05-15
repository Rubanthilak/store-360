<template>
  <section>
    <transition name="overlay">
      <div v-if="open" class="overlay" @click="$emit('close')"></div>
    </transition>
    <transition name="popup">
      <dialog open v-if="open" class="popup">
        <header>
          <slot name="header"></slot>
        </header>
        <section>
          <slot name="content"></slot>
        </section>
        <section>
          <slot name="actions"></slot>
        </section>
      </dialog>
    </transition>
  </section>
</template>

<script>
export default {
  props: ["title", "open"],
  emits: ["close"],
};
</script>

<style scoped>
.overlay {
  position: fixed;
  background: #00000083;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 9999;
}

h1 {
  font-family: var(--font-regular);
  margin: 0px;
}

dialog {
  z-index: 99999;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto auto;
  border: none;
  font-family: var(--font-regular);
  min-width: 250px;
  padding: 20px 25px;
  border-radius: 4px;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.2s ease-in;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.popup-enter-active,
.popup-leave-active {
  transition: all 0.2s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateY(-50px) scale(0.9);
}
</style>