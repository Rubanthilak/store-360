<template>
  <div class="flex">
    <input :placeholder="placeHolder" v-model="searchKeyword" />
    <div class="dropdown-body" v-if="filteredProductList">
      <div v-if="filteredProductList.length > 0 ">
        <div class="dropdown-header">
          <p>ID</p>
          <p>ITEM NAME</p>
          <p>BARCODE</p>
        </div>
        <div
          v-for="item in filteredProductList"
          :key="item.id"
          class="dropdown-item"
          @click="itemSelected(item)"
        >
          <p>{{item.id}}</p>
          <p>{{item.name}}</p>
          <p>{{item.barcode}}</p>
        </div>
      </div>
      <div v-else class="nf-text">
        <p>NO ITEMS FOUND</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["placeHolder"],
  emits: ["select"],
  methods: {
    itemSelected(obj) {
      this.searchKeyword = "";
      this.$emit("select", obj);
    },
  },
  data() {
    return {
      columnName: ["ID", "ITEM NAME", "BAR CODE"],
      searchKeyword: "",
    };
  },
  computed: {
    productList() {
      return this.$store.getters["product/getProducts"];
    },
    filteredProductList() {
      if (this.searchKeyword.trim() === "") {
        return null;
      }
      return this.productList.filter((product) => {
        return (
          product.name
            .toLowerCase()
            .includes(this.searchKeyword.toLowerCase()) ||
          product.id
            .toString()
            .toLowerCase()
            .includes(this.searchKeyword.toLowerCase()) ||
          product.barcode
            .toString()
            .toLowerCase()
            .includes(this.searchKeyword.toLowerCase())
        );
      });
    },
  },
};
</script>

<style scoped lang="scss">
input {
  display: flex;
  width: calc(100% - 30px);
  padding: 0px 15px;
  height: 35px;
  border: none;
  outline: none;
  box-shadow: 0px 3px 50px #0000000a;
  border-radius: 4px;
}

.nf-text {
  text-align: center;
  padding: 20px 0px;
  p {
    font-family: var(--font-semibold);
    font-size: 16px;
  }
}

.flex {
  width: 100%;
  flex-direction: column;
  font-family: var(--font-regular);
  font-size: 14px;
  position: relative;
}

.dropdown-body {
  position: absolute;
  top: 36px;
  z-index: 1;
  background: var(--gray0);
  box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  overflow-y: auto;
  border-radius: 0px 0px 8px 8px;
  max-height: 300px;
}

.dropdown-item {
  display: grid;
  grid-template-columns: 5% auto 20%;
  gap: 1rem;
  cursor: pointer;
  padding: 10px 15px;
  border-top: 1px solid var(--gray1);

  &:hover {
    background: var(--blue);
    color: var(--gray0);
  }

  p {
    &:last-child {
      text-align: right;
    }
  }
}

.dropdown-header {
  position: sticky;
  top: 0px;
  background: var(--gray0);
  display: grid;
  grid-template-columns: 5% auto 20%;
  gap: 1rem;
  cursor: pointer;
  padding: 10px 15px;
  border: none;

  p {
    font-family: var(--font-semibold);
    &:last-child {
      text-align: right;
    }
  }
}

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
</style>