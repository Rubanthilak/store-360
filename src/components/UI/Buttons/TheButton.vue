<template>
  <div :style="color ? 'background-color:var(--'+ color +')' : ''">
    <p :style="textColor ? 'color:var(--'+ textColor +')' : ''">{{label}}</p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
      validator: function (value) {
        return value;
      },
    },
    textColor: {
      type: String,
      required: false,
      validator: function (value) {
        return value;
      },
    },
    color: {
      type: String,
      required: false,
      validator: function (value) {
        return value;
      },
    }
  },
};
</script>

<style lang="scss" scoped>
div {
  padding: 0px 25px;
  height: 40px;
  border: none;
  border-radius: 4px;
  background-color: var(--blue);
  outline: none;
  cursor: pointer;
  box-shadow: 0px 3px 15px rgb(0, 0, 0, 0.05);
}

p{
  font-family: var(--font-semibold);
  font-size: 14px;
  line-height: 40px;
  color: var(--gray0);
  text-align: center;
}
</style>