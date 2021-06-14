<template>
  <div class="datepicker">
    <div class="box"  @click="toggleDropdown" style="width: 110px">
      <div class="icon-wrapper">
        <svg-icon icon="calendar-icon" size="20" color="gray0"></svg-icon>
      </div>
      <div class="date-wrapper">
        {{date ? date.toLocaleString('en-GB', { timeZone: 'IST' , year: 'numeric' , month: 'numeric' , day: 'numeric'}) : 'Date Filter'}}
      </div>
    </div>
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
  background:var(--gray0);
  position: relative;
  .dropdown {
    position: absolute;
    top: 40px;
    right: 0px;
  }
}
 .icon-wrapper{
   background:var(--blue);
   height:100%;
   align-items: center;
   justify-content: center;
   display: flex
 }

 .date-wrapper{
    text-align: center;
 }

 .box{
    border: 2px solid var(--gray2);
    border-radius: 5px;
    height: 32px;
    overflow:hidden;
    align-items: center;
    color: var(--gray4);
    font-family: var(--font-regular);
    font-size: 12px;
    display: grid;
    grid-template-columns: 35px 75px;
 }
</style>