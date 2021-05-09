<template>
  <svg 
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
      :fill="'var(--'+color+')'"
      :style="'--hoverColor:var(--'+ hoverColor+')'"
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
#cross {
  fill: var(--gray6);
}
.close-button:hover {
  svg {
    path {
      fill: var(--gray0);
    }
  }
}
</style>