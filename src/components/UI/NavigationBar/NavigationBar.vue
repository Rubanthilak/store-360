<template>
  <teleport to="body">
    <div class="top-bar flex">
      <div class="wrapper flex">
        <the-logo></the-logo>
        <div class="button-container flex">
          <div @click="min">
            <svg-icon icon="minus-icon" color="gray8" size="20"></svg-icon>
          </div>
          <div @click="max">
            <svg-icon icon="browser-icon" color="gray8" size="16"></svg-icon>
          </div>
          <div @click="close" class="close-button">
            <svg-icon icon="cross-icon" color="gray8" hover-color="gray0" size="20"></svg-icon>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import NavigationBarLogo from "./NavigationBarLogo.vue";
const remote = require("electron").remote;
export default {
  components: {
    "the-logo": NavigationBarLogo,
  },
  data() {
    return {
      window: remote.getCurrentWindow(),
    };
  },
  computed: {
    isMaximized () {
      return this.window.isMaximized();
    }
  },
  methods: {
    min() {
      this.window.minimize();
    },
    max() {
      if (!this.window.isMaximized()) {
        this.window.maximize();
      } else {
        this.window.unmaximize();
      }
    },
    close() {
      this.window.close();
    },
  },
};
</script>

<style scoped lang="scss">
.top-bar {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 25px;
  background: #ececec;
  align-items: center;
  z-index: 100;
  overflow: hidden;
  // The following three lines are added inorder to provide draggable sidebar
  user-select: none;
  -webkit-user-select: none;
  -webkit-app-region: drag;

  .wrapper {
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 10px);
    margin-left: 10px;

    .button-container {
      align-items: center;
      div {
        -webkit-app-region: none;
        min-height: 28px;
        min-width: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background: var(--gray2);
        }
        &:last-child {
          &:hover {
            background: var(--red);
          }
        }
        svg {
          margin: 0px 10px;
        }
      }
    }
  }
}
</style>