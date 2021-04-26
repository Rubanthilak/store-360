<template>
  <div class="dropdown" @click="dropped=!dropped">
    <div class="dropdown-active" v-if="active != null">{{options[active]}}</div>
    <div v-else>{{valueToDisplay}}</div>
    <div class="dropdown-container" v-if="dropped">
      <div
        class="dropdown-item"
        v-for="(op, index) in options"
        :key="op"
        @click="optionSelect(index)"
      >{{op}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["valueToDisplay","options","active"],
  data() {
    return {
      dropped: false,
    };
  },
  methods: {
    optionSelect(index) {
      this.$emit("optionSelected",index) 
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  border: 2px solid var(--gray2);
  font-family: var(--font-regular);
  font-size: 12px;
  border-radius: 5px;
  padding: 8px;
  position: relative;
}

.dropdown-active {
  font-family: var(--font-semibold);
  color: var(--gray8);
}

.dropdown-container {
  background: var(--gray0);
  box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.068);
  position: absolute;
  top: 35px;
  left: 0px;
  width: 100%;
  border-radius: 0px 0px 8px 8px;
  overflow: hidden;

  .dropdown-item {
    padding: 8px 15px;
    font-family: var(--font-medium);
    color: var(--gray8);
    &:hover {
      background: var(--blue);
      color: var(--gray0);
      cursor: pointer;
    }
  }
}
</style>