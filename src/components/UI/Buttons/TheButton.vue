<template>
  <div :style="color ? 'background-color:var(--'+ color +')' : ''">
    <slot>
      <p :style="textColor ? 'color:var(--'+ textColor +')' : ''">{{label}}</p>
    </slot>
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
  height: 35px;
  display:flex;
  align-items:center;
  justify-content:center;
  border: none;
  border-radius: 4px;
  background-color: var(--blue);
  outline: none;
  cursor: pointer;
  // box-shadow: 0px 0px 15px rgb(0, 0, 0, 0.1);
  gap:0.25rem;
  min-width: 100px;
}

p{
  font-family: var(--font-semibold);
  font-size: 14px;
  line-height: 35px;
  color: var(--gray0);
  text-align: center;
  white-space: nowrap;
  padding: 0px 15px ;
}

</style>