<template>
  <div class="datepicker">
    <div class="box"  @click="toggleDropdown" style="max-width:90px">
        <svg-icon icon="calendar-icon" size="20" :color="date !== null ? 'blue' : 'gray3' "></svg-icon>
        <p>{{date ? date.toLocaleString('en-GB', { timeZone: 'IST' , year: 'numeric' , month: 'numeric' , day: 'numeric'}) : (label ? label : 'Date Filter  ')}}</p>
    </div>
    <v-date-picker v-model="date" color="blue" class="dropdown" v-if="flag" />
  </div>
</template>

<script>
export default {
  props: ["label"],
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
  background:var(--gray1);
  position: relative;
  box-shadow:inset 0px 0px 15px rgb(0,0,0,0.05);
  border-radius: 5px;
  height: 36px;
  padding: 0px 10px;

  .dropdown {
    position: absolute;
    top: 40px;
    right: 0px;
  }

}
 
 .box{
    overflow:hidden;
    align-items: center;
    color: var(--gray6);
    font-family: var(--font-medium);
    font-size: 12px;
    display: flex;
    justify-content:center;
    height: 100%;
    width: 100%;
    svg{
      margin-right:8px;
    }
    p{
      white-space: nowrap;
      text-overflow: ellipsis;
    }
 }

</style>