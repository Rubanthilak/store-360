<template>
  <div :style="'background-color: var(--'+ backgroundColor +');'">
      <svg-icon size="20" color="gray0" :icon="icon"></svg-icon>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: false,
      validator: function (value) {
        return value;
      },
    },
    backgroundColor: {
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
  height: 35px;
  width: 40px;
  border: none;
  border-radius: 4px;
  background-color: var(--blue);
  outline: none;
  cursor: pointer;
  box-shadow: 0px 3px 15px rgb(0, 0, 0, 0.05);
}
svg{
  margin: 7.5px 10px;
}
</style>