<template>
  <div>
    <popup-listener></popup-listener>
    <snack-bar></snack-bar>
    <navigation-bar></navigation-bar>
    <main class="container">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang='scss'>
body{
  margin: 0px;
  padding: 0px;
  background: var(--gray1);
}

main{
  margin-top: 90px !important;
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
