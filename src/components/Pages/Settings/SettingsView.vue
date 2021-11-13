<template>
  <section>
    <div class="side-menu">
      <div class="header">
        <h1>Settings</h1>
      </div>
      <router-link to="/settings">
        <div class="tile">
          <p>Backup & Restore</p>
        </div>
      </router-link>
      <router-link to="/settings/template">
        <div class="tile">
          <p>Printer Settings</p>
        </div>
      </router-link>
      <router-link to="/settings/template">
        <div class="tile">
          <p>About</p>
        </div>
      </router-link>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section {
  padding: 0px !important;
  display: flex;
}

.side-menu {
  background: var(--gray0);
  width: 250px;
  height: 100vh;

  .header {
    padding: 8px;
    border-bottom: 1px solid var(--gray1);

    h1 {
      margin-left: 8px;
    }
  }

  .tile {
    padding: 8px;
    border-bottom: 1px solid var(--gray1);
    cursor: pointer;
    transition: all 0.2s;

    p {
      font-size: 14px;
      margin-left: 10px;
      transition: all 0.2s;
    }

    &:hover {
      background: var(--blue);
      p {
        color: var(--gray0);
      }
    }
  }
}
</style>