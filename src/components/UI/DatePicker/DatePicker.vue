<template>
  <div class="datepicker" style="min-width: 90px">
    <div class="box" @click="toggleDropdown" style="min-width: 90px">
      <svg-icon
        v-if="isRange ? !range.end : !range"
        icon="calendar-icon"
        size="20"
        color='gray3'
      ></svg-icon>
       <p v-if="!isRange && range" style="padding-right: 25px">
        <strong>{{
          range.toLocaleString("en-GB", {
            timeZone: "IST",
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
        }}</strong>
      </p>
      <p v-else-if="showDate && isRange" style="padding-right: 25px">
        <strong>{{
          range.start.toLocaleString("en-GB", {
            timeZone: "IST",
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
        }}</strong>
      </p>
      <p v-else-if="isRange && range.end" style="padding-right: 25px">
        <strong>{{
          range.start.toLocaleString("en-GB", {
            timeZone: "IST",
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
        }}</strong>
        -
        <strong>{{
          range.end.toLocaleString("en-GB", {
            timeZone: "IST",
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
        }}</strong>
      </p>
      <p v-else>{{ label ? label : "Date Filter  " }}</p>
    </div>
    <svg-icon
      v-if="isRange ? range.end : range"
      icon="cross-icon"
      size="20"
      color="gray0"
      class="clear-btn"
      @click="clear"
    ></svg-icon>
    <v-date-picker
      v-model="range"
      color="blue"
      class="dropdown"
      v-if="flag"
      :is-range="isRange"
    />
  </div>
</template>

<script>
export default {
  props: ["label", "isRange", "date"],
  data() {
    return {
      flag: false,
      range: this.isRange
        ? {
            start: null,
            end: null,
          }
        : null,
    };
  },
  methods: {
    toggleDropdown() {
      this.flag = !this.flag;
    },
    clear() {
      this.flag = !this.flag;
      this.range = this.isRange
        ? {
            start: null,
            end: null,
          }
        : null;
    },
  },
  watch: {
    range(curVal, oldVal) {
      if (curVal != oldVal) {
        this.flag = false;
        this.$emit("pick", this.range);
      }
    },
  },
  computed: {
    showDate() {
      if (this.isRange && (this.range.start === null || this.range.end === null)) {
        return false;
      }
      return this.isRange && (
        this.range.start.toLocaleString("en-GB", {
          timeZone: "IST",
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }) ===
        this.range.end.toLocaleString("en-GB", {
          timeZone: "IST",
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })
      );
    },
  },
  beforeMount(){
    if(this.date !== null && this.date !== undefined){
      this.range = this.date
    }
  }
};
</script>

<style lang="scss" scoped>
.datepicker {
  background: var(--gray1);
  position: relative;
  box-shadow: inset 0px 0px 15px rgb(0, 0, 0, 0.05);
  border-radius: 5px;
  height: 36px;
  padding: 0px 10px;
  display: flex;

  .dropdown {
    position: absolute;
    top: 40px;
    right: 0px;
    z-index:2;
  }
}

.box {
  overflow: hidden;
  align-items: center;
  color: var(--gray6);
  font-family: var(--font-medium);
  font-size: 12px;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  gap: 8px;

  svg {
    z-index: 1;
  }

  p {
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.clear-btn {
  background: var(--red);
  height: 100%;
  position: absolute;
  border-radius: 0px 5px 5px 0px;
  padding: 0px 3px;
  right: 0;
  z-index: 3;
}
</style>