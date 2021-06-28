<template>
  <div>
    <input :placeholder="placeHolder" v-model="inputFieldValue" @keyup="validateInputField($event)" />
    <svg-icon v-if="typing" @click="clearInputField" class="clear" icon="cross-icon" color="red" size="22"></svg-icon>
    <svg-icon v-else class="search" icon="search-icon" color="gray2" size="22"></svg-icon>
  </div>
</template>

<script>
export default {
  props: ["placeHolder"],
  emits: ["entered", "typing"],
  data() {
    return {
      inputFieldValue: "",
    };
  },
  methods: {
    validateInputField(e) {
      if (e.keyCode === 13 && this.inputFieldValue !== "") {
        this.$emit("entered", this.inputFieldValue);
      } else {
        this.$emit("typing", this.inputFieldValue);
      }
    },
    clearInputField(){
      this.inputFieldValue = "";
      this.$emit("typing", this.inputFieldValue);
    }
  },
  computed: {
    typing(){
      if(this.inputFieldValue === "" || this.inputFieldValue === null){
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped lang="scss">

div{
  position: relative;
  width: 100%;
  display: flex;
}

input {
  display: flex;
  width: 100%;
  padding: 0px 15px;
  height: 35px;
  border: none;
  outline: none;
  box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  background: var(--gray1);
}

.search,.clear{
  position: absolute;
  margin: auto 0px;
  right: 10px;
  top: 0;
  bottom: 0;
}

.clear{
  cursor: pointer;
}

</style>