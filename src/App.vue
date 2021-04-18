<template>
  <section>
    <popup-listener></popup-listener>
    <snack-bar></snack-bar>
    <side-bar></side-bar>
    <main class="container">
      <router-view></router-view>
    </main>
  </section>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang='scss'>

body{
  margin: 0px 0px 0px 60px;
  padding: 0px;
  background: var(--gray1);
}

main{
  padding-top: 25px !important;
}

h1,h2,h3,h4,h5,h6{
  margin: 0px;
}

p{
  margin: 0px;
}

a{
  text-decoration: none;
  color: var(--gray8);
}

hr {
  border: none;
  border-bottom: var(--h-border);
  margin-bottom: 15px;
}

.container{
  min-width: 1200px;
  max-width: 90%;
  margin: 0px auto;
}

.flex{
  display:flex;
}

</style>
