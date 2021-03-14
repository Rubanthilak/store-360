<template>
  <div>
    <div class="flex">
      <search-bar></search-bar>
      <div class="flex">
        <the-button label="New"></the-button>
        <the-button label="Edit"></the-button>
        <icon-button></icon-button>
      </div>
    </div>
    <hr />
  </div>
</template>


<script>
export default {};
</script>

<style lang="scss" scoped>
.flex {
  justify-content: space-between;
}
hr:first-of-type{
  margin-top: 20px;
}
</style>