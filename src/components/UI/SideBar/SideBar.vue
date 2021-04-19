<template>
  <teleport to="body">
    <div class="side-bar flex">
      <div class="wrapper flex">
        <div class="links">
          <router-link to="/">
            <home-icon></home-icon>
          </router-link>
          <router-link to="/items">
            <box-icon></box-icon>
          </router-link>
          <router-link to="/customers">
            <users-icon></users-icon>
          </router-link>
          <router-link to="/sales">
            <tag-icon></tag-icon>
          </router-link>
        </div>
        <img src="../../../assets/icons/settings.svg" alt="settings_icon" />
      </div>
    </div>
  </teleport>
</template>

<script>
import UsersIcon from "../Icons/UsersIcon";
import BoxIcon from "../Icons/BoxIcon";
import TagIcon from "../Icons/TagIcon";
import HomeIcon from "../Icons/HomeIcon";

export default {
  components: {
    UsersIcon,
    BoxIcon,
    TagIcon,
    HomeIcon,
  },
};
</script>

<style scoped lang="scss">
.side-bar {
  position: absolute;
  left: 0px;
  top: 50px;
  height: calc(100% - 50px);
  box-shadow: 3px 10px 10px rgba(0, 0, 0, 0.05);
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