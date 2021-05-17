<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :fill="'var(--'+color+')'"
      :style="'--hoverColor:var(--'+ hoverColor+')'"
      d="M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z"
    />
  </svg>
</template>


<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      validator: function (value) {
        if (value) {
          return value;
        }
        return "white";
      },
    },
    hoverColor: {
      type: String,
      required: false,
      validator: function (value) {
        if (value) {
          return value;
        }
      },
    },
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
  },
};
</script>


<style lang="scss" scoped>
svg:hover {
  path {
    fill: var(--hoverColor);
  }
}
</style>