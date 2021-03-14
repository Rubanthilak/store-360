<template>
  <div>
      <img src="../../../assets/icons/menu.svg" alt="search.svg">
  </div>
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
div {
  height: 40px;
  width: 40px;
  padding: 0px 5px;
  border: none;
  border-radius: 4px;
  background-color: var(--blue);
  color: var(--gray0);
  outline: none;
  cursor: pointer;
  box-shadow: 0px 3px 15px rgb(0, 0, 0, 0.05);
  font-family: var(--font-semibold);
  font-size: 16px;
  margin-left: 10px;
}
img {
  height: 24px !important;
  width: 24px !important;
  padding: 8px;
}
</style>