<template>
  <div>
    <div v-if="signedIn" class="wrapper">
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
        @click="googleLogout"
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
  data()  {
    return {signedIn: false}
  },
  methods: {
    googleLogout() {
      let res = this.$store.dispatch("googleLogout");
      if(res){
        this.$moshaToast(res ? "You are logged out" : "Logout failed due to some issue!", {
          type: res ? "info" : "danger",
          hideProgressBar: true,
          position: "bottom-right",
          transition: "bounce",
        });
      this.googleSignIn();
      }
    },
    initiateBackup(){
      ipcRenderer.send("initiateBackup");
      ipcRenderer.once("initiateBackup", (event, data) => {
        this.$moshaToast(data.result ? "Backup Successful" : "Backup Failed !", {
          type: data.result ? "success" : "danger",
          hideProgressBar: true,
          position: "bottom-right",
          transition: "bounce",
        });
        this.googleSignIn();
      });
    },
    googleSignIn() {
      this.signedIn = this.$store.getters["checkGoogleSignIn"];
    },
  },
  beforeMount(){
    this.googleSignIn();
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 25px;
}
</style>