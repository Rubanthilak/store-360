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
      d="M7.5,6A1.5,1.5,0,1,0,9,7.5,1.5,1.5,0,0,0,7.5,6Zm13.62,4.71L12.71,2.29A1,1,0,0,0,12,2H3A1,1,0,0,0,2,3v9a1,1,0,0,0,.29.71l8.42,8.41a3,3,0,0,0,4.24,0L21.12,15a3,3,0,0,0,0-4.24Zm-1.41,2.82h0l-6.18,6.17a1,1,0,0,1-1.41,0L4,11.59V4h7.59l8.12,8.12a1,1,0,0,1,.29.71A1,1,0,0,1,19.71,13.53Z"
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
.router-link-active {
  svg {
    path {
      fill: var(--blue);
      transition: all 0.2s;
    }
  }
}
</style>