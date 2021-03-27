<template>
  <div class="wrapper">
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
export default {};
</script>

<style lang="scss" scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
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
  background: var(--gray5);
}

.wrapper {
  height: calc(100vh - 170px);
  width: 1200px;
  margin: 0px auto;
  overflow-x: hidden;
  overflow-y: auto;
}

table {
  width: 1200px;
  border-collapse: collapse;
  position: relative;
}

.header::v-deep th {
  text-align: right;
  padding-bottom: 10px;
  font-size: 16px;
  color: var(--gray3);
  font-family: var(--font-semibold);
  background: var(--gray1);
  position: sticky;
  top: 0;
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
    cursor: pointer;
  }

  tr:hover {
    background: var(--blue);
    color: var(--gray0);
  }

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