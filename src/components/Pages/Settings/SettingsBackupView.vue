<template>
  <div>
    <div v-if="googleSignIn" class="wrapper">
      <h1>Backup & Restore</h1>
      <the-button
        label="Backup Now"
        style="display: inline-flex"
        @click="initiateBackup"
      ></the-button>
      <the-button
        label="Log out"
        style="display: inline-flex"
        color="red"
      ></the-button>
    </div>
    <div v-else class="wrapper">
         <the-button
        label="Google Sign In"
        style="display: inline-flex"
        @click="initiateBackup"
      ></the-button>
    </div>
  </div>
</template>

<script>
const ipcRenderer = require("electron").ipcRenderer;
export default {
  methods: {
    initiateBackup() {
      ipcRenderer.send("initiateBackup");
      ipcRenderer.once("initiateBackup", (event, data) => {
        this.$moshaToast(data.result ? "Backup Successful" : "Backup Failed !", {
          type: data.result ? "success" : "danger",
          hideProgressBar: "true",
          position: "bottom-right",
          transition: "bounce",
        });
      });
    },
  },
  computed: {
    googleSignIn() {
      return this.$store.getters["checkGoogleSignIn"];
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 25px;
}
</style>