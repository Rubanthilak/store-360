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
        :fill="'var(--'+color+')'"
        d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z"
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