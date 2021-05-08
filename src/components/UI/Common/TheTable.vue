<template>
  <div class="wrapper" :style="'height:'+tableHeight">
    <table>
      <colgroup>
        <slot name="colgroup"></slot>
      </colgroup>
      <thead class="header">
        <slot name="thead"></slot>
      </thead>
      <tbody class="content">
        <slot name="tbody"></slot>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["tableHeight"]
};
</script>

<style lang="scss" scoped>
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
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--gray3);
}

.wrapper {
  // height: calc(100vh - 180px);
  width: 100%;
  margin: 0px auto;
  overflow-x: hidden;
  overflow-y: auto;
  background: var(--gray0);
  border-radius: 6px;
  box-shadow: 0px 5px 50px #0000001c;
}

table {
  width: 100%;
  border-collapse: collapse;
  position: relative;
}

.header::v-deep {
  margin-bottom: 50px;
}

.header::v-deep th {
  text-align: right;
  padding: 15px 10px;
  font-size: 16px;
  color: var(--gray3);
  font-family: var(--font-semibold);
  background: var(--gray0);
  position: sticky;
  top: 0;

  &::before {
    content: " ";
    width: 100%;
    height: 2px;
    background: var(--blue);
    position: absolute;
    bottom: 5px;
    z-index: 2;
    left: 0px;
  }  

  
  &::after {
    content: " ";
    width: 100%;
    height: 5px;
    background: var(--gray1);
    position: absolute;
    bottom: 0px;
    z-index: 1;
    left: 0px;
  }  
}

.header::v-deep th{
  padding-left: 0px;
  padding-right: 0px;
}

.header::v-deep th:first-child {
  padding-left: 20px;
  padding-right: 0;
}

.header::v-deep th:last-child {
  padding-left: 0px;
  padding-right: 20px;
}

.header::v-deep th:nth-of-type(1),
.header::v-deep th:nth-of-type(2) {
  text-align: left;
}
// Inorder to apply sccs to the slot, We include v-deep
.content::v-deep {


  tr {
    background: var(--gray0);
    padding: 0px 10px;
  }

  // tr:hover {
  //   background: var(--blue);
  //   color: var(--gray0);
  // }

  td {
    text-align: right;
    font-size: 14px;
    font-family: var(--font-regular);
    border-bottom: 2px solid var(--gray1);
    padding: 10px 0px;
  }

  td:first-child {
    padding-left: 20px;
    padding-right: 0;
  }

  td:last-child {
    padding-left: 0px;
    padding-right: 20px;
  }

  td:nth-of-type(1),
  td:nth-of-type(2) {
    text-align: left;
  }
}
</style>