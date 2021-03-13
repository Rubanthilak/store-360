<template>
  <button>{{label}}</button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
      validator: function (value) {
        return value;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: var(--blue);
  color: var(--gray0);
  outline: none;
  cursor: pointer;
  box-shadow: 0px 3px 15px rgb(0, 0, 0, 0.05);
  font-family: var(--font-medium);
  margin-left: 5px;
}
</style>