<template>
  <section>
    <popup-listener></popup-listener>
    <snack-bar></snack-bar>
    <navigation-bar></navigation-bar>
    <side-bar></side-bar>
    <main>
      <router-view></router-view>
    </main>
  </section>
</template>

<script>
export default {
  name: "App",
  async mounted() {
    await this.$store.dispatch("product/getProductList");
    await this.$store.dispatch("customer/getCustomerList",{ offset:0 });
  },
};
</script>

<style lang='scss'>
body {
  margin: 0px 0px 0px 60px;
  padding: 0px;
  background: var(--gray1);
  overflow: hidden;
}

main {
  overflow: auto;
  height: 100vh;
  position:relative;
  section {
    padding-top: 20px !important;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0px;
  font-family: var(--font-semibold);
  color: var(--gray8)
}

p {
  margin: 0px;
  font-family: var(--font-regular);
  color: var(--gray8)
}

a {
  text-decoration: none;
  color: var(--gray8);
}

hr {
  border: none;
  border-bottom: var(--h-border);
  margin-top: 15px;
  margin-bottom: 15px;
}

:not(input):not(textarea),
:not(input):not(textarea)::after,
:not(input):not(textarea)::before {
  -webkit-user-select: none;
  user-select: none;
  // cursor: default;
}

input,
button,
textarea,
:focus {
  outline: none; // You should add some other style for :focus to help UX/a11y
}

#app {
  overflow: auto;
  min-height: calc(100vh - 25px);
  margin-top: 25px;
}

.container {
  min-width: 1200px;
  max-width: 90%;
  margin: 0px auto;

  @media (max-width: 1280px) {
    max-width: 1200px;
  }
}

.flex {
  display: flex;
}

.bold {
  font-family: var(--font-semibold);
}

/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--gray2);
  border-radius: 10px;
  cursor: pointer;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--gray3);
}
</style>
