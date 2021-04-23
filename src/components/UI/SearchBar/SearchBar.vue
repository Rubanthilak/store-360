<template>
  <input
    :placeholder="placeHolder"
    v-model="inputFieldValue"
    @input="validateInputField($event)"
  />
</template>

<script>
export default {
  props : ["placeHolder"],
  emits: ["enter", "typing"],
  data() {
    return {
      inputFieldValue: "",
    };
  },
  methods: {
    validateInputField(e) {
      if (e.keyCode === 13 && this.inputFieldValue !== "") {
        this.$emit("enter", this.inputFieldValue);
      } else {
        this.$emit("typing", this.inputFieldValue);
      }
    },
  },
};
</script>

<style scoped lang="scss">
input {
  display: flex;
  width: 100%;
  padding: 0px 15px;
  height: 35px;
  border: none;
  outline: none;
  box-shadow: 0px 5px 50px #0000001c;
  border-radius: 4px;
}
</style>