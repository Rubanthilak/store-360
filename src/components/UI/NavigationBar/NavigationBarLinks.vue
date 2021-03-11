<template>
  <div class="links-container">
    <router-link to="/">Home</router-link>
    <router-link to="/items">Items</router-link>
    <router-link to="/customers">Customers</router-link>
    <router-link to="/sales">Sales</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
a {
  margin: 0px 40px;
  font-family: var(--font-medium);
  font-size: 14px;

  &:first-of-type {
    margin-left: 0px;
  }

  &:last-of-type {
    margin-right: 0px;
  }
}

.links-container {
  margin-left: -75px;
}

.router-link-active {
  font-family: var(--font-bold);
  font-size: 16px;
  color: var(--blue);
  position: relative;

  &::after{
      content: "";
      height: 3px;
      width: 150%;
      background: var(--blue);
      position: absolute;
      left: -25%;
      bottom: -19px;
  }
}

</style>