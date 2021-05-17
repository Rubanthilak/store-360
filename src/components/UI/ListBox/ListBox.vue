<template>
  <div class="dropdown" @click="dropped=!dropped" :style=" boxLength ? 'width:'+ boxLength : ''">
    <div class="dropdown-active" v-if="active > -1 && active !== null">
      {{prefix ? prefix +" : ": ''}}
      <span>{{options[active]}}</span>
    </div>
    <div class="hint" v-else>{{valueToDisplay}}</div>
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
  props: ["valueToDisplay", "options", "active", "boxLength", "prefix"],
  data() {
    return {
      dropped: false,
    };
  },
  methods: {
    optionSelect(index) {
      this.$emit("optionSelected", index);
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
  padding: 7px 10px;
  position: relative;
  background: var(--gray0);
}

.hint {
  color: var(--gray3);
}

.dropdown-active {
  color: var(--gray3);
  span {
    font-family: var(--font-semibold);
    color: var(--gray8);
  }
}

.dropdown-container {
  background: var(--gray0);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 42px;
  left: 0px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  z-index: 1;

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