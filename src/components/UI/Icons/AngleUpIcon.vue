<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="icon">
      <path
       d="M17,13.41,12.71,9.17a1,1,0,0,0-1.42,0L7.05,13.41a1,1,0,0,0,0,1.42,1,1,0,0,0,1.41,0L12,11.29l3.54,3.54a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29A1,1,0,0,0,17,13.41Z"
       :fill="'var(--'+color+')'"
       :style="'--hoverColor:var(--'+ hoverColor+')'"
      />
    </g>
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