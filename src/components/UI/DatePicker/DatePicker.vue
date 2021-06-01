<template>
  <div class="datepicker">
    <the-button
      :label="date ? date.toDateString().substring(4,date.length) : 'Pick Date'"
      @click="toggleDropdown"
    ></the-button>
    <v-date-picker v-model="date" color="blue" class="dropdown" v-if="flag" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      date: null,
    };
  },
  methods: {
    toggleDropdown() {
      this.flag = !this.flag;
    },
  },
  watch: {
    date(curVal, oldVal) {
      if (curVal != oldVal) {
        this.flag = !this.flag;
        this.$emit("pick",this.date)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.datepicker {
  position: relative;
  .dropdown {
    position: absolute;
    top: 40px;
    right: 0px;
  }
}
</style>