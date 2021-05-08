<template>
  <teleport to="body">
    <div class="side-bar flex">
      <div class="wrapper flex">
        <div class="links">
          <router-link to="/">
            <svg-icon icon="home-icon" color="gray2" hover-color="blue" size="24"></svg-icon>
          </router-link>
          <router-link to="/items">
            <svg-icon icon="box-icon" color="gray2" hover-color="blue" size="24"></svg-icon>
          </router-link>
          <router-link to="/customers">
            <svg-icon icon="users-icon" color="gray2" hover-color="blue" size="24"></svg-icon>
          </router-link>
          <router-link to="/sales">
            <svg-icon icon="tag-icon" color="gray2" hover-color="blue" size="24"></svg-icon>
          </router-link>
        </div>
        <img src="../../../assets/icons/settings.svg" alt="settings_icon" />
      </div>
    </div>
  </teleport>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.side-bar {
  position: absolute;
  left: 0px;
  top: 25px;
  height: calc(100% - 25px);
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.05);
  width: 60px;
  background: var(--gray0);
  align-items: center;
  flex-direction: column;
  z-index: 99;
  

  .wrapper {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 25px;
    margin-bottom: 25px;
    height: calc(100% - 50px);
  }

  .logo {
    height: 60px;
    width: 60px;
    background: var(--blue);
    margin-bottom: 25px;
    cursor: pointer;
  }

  .links {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    -webkit-app-region: none;

    a {
      margin-bottom: 35px;
      width: 60px;
      text-align: center;
      cursor: pointer;
    }
    svg {
      cursor: pointer;
    }
  }
}
</style>