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
        d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"
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