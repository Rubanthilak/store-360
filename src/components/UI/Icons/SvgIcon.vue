<template>
    <component v-bind:is="icon" :color="checkColor" :hoverColor="checkHoverColor" :size="size"/>
</template>

<script>
export default {
 props: {
    size: {
      type: String,
      required: true,
      validator: function (value) {
        if (value) {
          return value;
        }
        return "24";
      },
    },
    color: {
      type: String,
      required: false,
      validator: function (value) {
        if (value) {
          return value;
        }
        return "gray8";
      },
    },
    hoverColor: {
      type: String,
      required: false,
      validator: function (value) {
        if (value) {
          return value;
        }
        return this.color;
      },
    },
    icon: {
      type: String,
      required: true,
    },
  },
  computed: {
      checkColor(){
          if(this.color){
              return this.color;
          }
          return "gray8"
      },
      checkHoverColor(){
          if(this.hoverColor){
              return this.hoverColor;
          }
          return this.checkColor;
      }
  }
};
</script>

