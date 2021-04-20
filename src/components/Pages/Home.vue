<template>
  <section>
    <the-tabs @tab-switched="test" @tab-removed="test2"></the-tabs>
    <div class="tab-content">
      
    </div>
  </section>
</template>

<script>
export default {
  methods : {
    test(key){
      console.log(key);
    },
    test2(key){
      console.log("Removed" + key);
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  padding-top: 0px !important;
  max-width: 100vw;
}

.tab-content {
  background: var(--gray0);
  height: 100vh;
  width: 100vw;
}
</style>