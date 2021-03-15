<template>
  <div :style="color ? 'background-color:var(--'+ color +')' : ''">
    <p>{{label}}</p>
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
    icon: {
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
  margin-left: 10px;
}

p{
  font-family: var(--font-semibold);
  font-size: 14px;
  line-height: 40px;
  color: var(--gray0);
}
</style>