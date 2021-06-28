<template>
      <div class="flex hero-button">
        <slot></slot>
        <p>{{label}}</p>
      </div>
</template>

<script>
export default {
    props: ["label"]
}
</script>


<style lang="scss" scoped>
.hero-button {
  gap: 0.25rem;
  padding: 5px 6px 5px 10px;
  border-radius: 6px;
  transition: all 0.3s;
  overflow: hidden;
  align-items:center;
  cursor: pointer;

  p {
    max-width: 0px;
    white-space: nowrap;
    overflow: hidden;
    color: transparent;
    transition: color 0.3s 0.25s, max-width 0.25s 0.1s, padding-right 0.1s;
    font-size:14px;
    font-family:var(--font-semibold);
    transition-property:  max-width, color, padding-right;
    transition-duration: 0.25s, 0.3s, 0.1s;
    transition-delay: 0s, 0.25s, 0.3s;
    transition-timing-function:linear;
  }

  &:hover {
    background-color: var(--gray1);
    
    p {
      max-width: 100px;
      color: black;
      display:block;
      padding-right:10px;
    }
  }
}
</style>