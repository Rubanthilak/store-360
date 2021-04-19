<template>
  <div>
    <h1>Home</h1>
    <the-button label="Close" color="red" style="display: inline-block" @click="test"></the-button>
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");
export default {
  methods: {
    test() {
      ipcRenderer.sendSync("close-window");
    },
  },
};
</script>
