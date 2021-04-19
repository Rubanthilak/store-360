<template>
  <teleport to="body">
    <div class="top-bar flex">
      <div class="wrapper flex">
        <the-logo></the-logo>
        <div class="button-container flex">
          <the-button label="Min" style="display: inline-block" @click="min"></the-button>
          <the-button label="Max" color="green" style="display: inline-block" @click="max"></the-button>
          <the-button label="Close" color="red" style="display: inline-block" @click="close"></the-button>
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
  min-width: 1260px;
  width: 100%;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  height: 50px;
  background: var(--gray0);
  align-items: center;
  z-index: 100;
  // The following three lines are added inorder to provide draggable sidebar
  user-select: none;
  -webkit-user-select: none;
  -webkit-app-region: drag;

  .wrapper {
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 20px);
    margin: 0px 20px;

    .button-container {
      div {
          margin-left: 10px;
        -webkit-app-region: none;
      }
    }
  }
}
</style>